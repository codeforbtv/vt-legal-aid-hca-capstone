require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const csvtojson = require('csvtojson')
const multer = require('multer')
const fs = require('fs')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session') //do an npm install express-session
const methodOverride = require('method-override') //do anconst  npm install method-override. This here is requiring this library

const port = process.env.PORT || 5001
const app = express()
const initializePassport = require('./passport-config')
//finding user based on email

const staticDir = process.env.DEV ? './client/public' : './client/build'

app.use(express.urlencoded({ extended: true })) //SHOULDN'T THIS BE FALSE??
app.use(express.json())
app.use(flash()) //using flash
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
) //first param is secret key stored .env,second var in session means don't resave if nothing changed in session, don't save empty value (save uninitialized false)

app.use(passport.initialize())
app.use(passport.session())
//Benefit of session() with passport: req.user is always going to be sent to the user that is authenticated at that moment
app.use(methodOverride('_method'))

//------------------------------MONGOOSE SETUP------------------------------
//creating mongoose Schema for stories
const StorySchema = new mongoose.Schema({
  RespID: Number,
  County: String,
  Insured: String,
  Age: String,
  QuoteTag_ImpactOnLife: Number,
  HowHasMedicalDebtImpactedYourLife: String,
  QuoteTag_Access: Number,
  HowHasMedicalDebtImpactedYourAccessToCare: String,
  QuoteTag_Cost: Number,
  WhatDoYouThinkOfTheCostOfMedicalCare: String,
  QuoteTag_SurpriseBill: Number,
  HaveYouBeenSurprisedByAMedicalBill: String,
  QuoteTag_Collections: Number,
  WhatIsYourExperienceWithMedicalDebtCollectors: String
})

const UserSchema = new mongoose.Schema({
  UserName: String,
  Email: String,
  Password: String
})
//creating the initial connection to the database using url for mongoAtlas and .env secured password
// mongoose.connect("mongodb://localhost:27017/VT-Legal", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(
  `mongodb+srv://VTLegalAdmin:${process.env.PASSWORDMONGO}@medicaldebt.lmsqy.mongodb.net/VT-Legal?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

//initializing database using connection and storing in variable database
const database = mongoose.connection

//setting up Stories model using the StorySchema and the collection
const Stories = mongoose.model('all-stories', StorySchema)
const Users = mongoose.model('admins', UserSchema)

//binds error message to the connection variable to print if an error occurs with database connection
database.on('error', console.error.bind(console, 'connection error'))

//Connect users to database
const users = initializePassport(
  passport,

  async email => {
    const user = await Users.findOne({ Email: email }).exec()

    return user
  },
  id => users?.find(user => user.id === id)
)

//-------------------------------MULTER-----------------------------------------
//setting up multer to point at the destination "uploads/"
const upload = multer({ dest: 'uploads/' })

//-------------------------------ROUTES----------------------------------------

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'src/index.html'), function (err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

//---------CREATE-------------
app.post('/createnew', async (req, res) => {
  //creation of a new story from admin portal
  const newStory = new Stories({
    RespID: req.body.id,
    County: req.body.county,
    Insured: req.body.insured,
    Age: req.body.age,
    HowHasMedicalDebtImpactedYourLife: req.body.impactLife,
    HowHasMedicalDebtImpactedYourAccessToCare: req.body.impactCare,
    WhatDoYouThinkOfTheCostOfMedicalCare: req.body.costCare,
    HaveYouBeenSurprisedByAMedicalBill: req.body.surpriseBill,
    WhatIsYourExperienceWithMedicalDebtCollectors: req.body.collections
  })

  //saving the new story
  await newStory.save()

  res.redirect('back')
})

//API endpoint for bulk uploading of data via csv file using multer middleware
app.post('/bulkupload', upload.single('csv'), async (req, res) => {
  //setting up the file path needed for the csvtojson using string concatenation
  let csvFilePath = __dirname + '/uploads/' + req.file.filename
  //setting up an empty array to accept the csvtojson file change
  let csvDataImport = []
  // console.log(req.file);
  //using csvtojson aimed at the file path declared above
  csvtojson()
    .fromFile(csvFilePath)
    .then(csvData => {
      console.log(csvData)
      //setting the resulting json data to our pre-setup variable array
      csvDataImport = csvData
      //using the insertMany Mongodb method to import all the csv values
      Stories.insertMany(csvDataImport)
      //unlinking from the pipe watching the csv file path
      fs.unlinkSync(csvFilePath)
    })
  //forcing page reload
  res.redirect('back')
})

//---------READ---------------
//API endpoint for receiving all stories
app.get('/allstories', async (req, res) => {
  //setting up intermediate variable to store find result
  let allStories = await Stories.find({})
  //responding with a json of the find
  res.json(allStories)
})

//API endpoint to get the stories from a specific county
app.get('/allstories/:county', async (req, res) => {
  if (req.params.county.includes('+')) {
    //splitting the params based on the + added when a filter is applied
    let splitParams = req.params.county.split('+')

    //setting up a intermediate variable for the county from the split params
    let instanceCounty = splitParams[0]
    //setting up a intermediate variable for the question filter from the split params
    let instanceFilter = splitParams[1]
    //setting up variable to store res of .find with the instanceCounty and instanceFilter being used as a filter
    let countyStories = await Stories.find({
      County: instanceCounty,
      [instanceFilter]: { $ne: '' }
    })
    //sending messages for the specific county as json
    res.json(countyStories)
  } else {
    //setting up a intermediate variable for the county from the params
    let instanceCounty = req.params.county
    //setting up variable to store res of .find with the instanceCounty being used as a filter
    let countyStories = await Stories.find({ County: instanceCounty })
    //sending messages for the specific county as json
    res.json(countyStories)
  }
})

//-----------UPDATE-----------
//API endpoint to update a story
app.post('/update/:id', async (req, res) => {
  //grabbing the document id (mongo) received in params
  let storyId = req.params.id

  //creating an empty object to hold any updated values
  let updatedStory = {}

  //series of if statements checking if values were received in the body of the request; assigning them to our updated object if they do exist
  if (req.body.id) {
    updatedStory.RespID = req.body.id
  }
  if (req.body.county) {
    updatedStory.County = req.body.county
  }
  if (req.body.insured) {
    updatedStory.Insured = req.body.insured
  }
  if (req.body.age) {
    updatedStory.Age = req.body.age
  }
  if (req.body.impactLife) {
    updatedStory.HowHasMedicalDebtImpactedYourLife = req.body.impactLife
  }
  if (req.body.impactCare) {
    updatedStory.HowHasMedicalDebtImpactedYourAccessToCare = req.body.impactCare
  }
  if (req.body.costCare) {
    updatedStory.WhatDoYouThinkOfTheCostOfMedicalCare = req.body.costCare
  }
  if (req.body.surpriseBill) {
    updatedStory.HaveYouBeenSurprisedByAMedicalBill = req.body.surpriseBill
  }
  if (req.body.collections) {
    updatedStory.WhatIsYourExperienceWithMedicalDebtCollectors =
      req.body.collections
  }

  //finding a document by its ID and then updating its key:value pairs dependant on whether or not they exist in the updated object
  await Stories.updateOne({ _id: storyId }, { $set: updatedStory })

  res.redirect('back')
})

//-----------DELETE-----------
//API endpoint to delete a story
app.post('/delete/:id', async (req, res) => {
  //grabbing story id (mongo) from params
  let storyId = req.params.id

  //deleting the story using its mongo ID as a filter
  await Stories.deleteOne({ _id: storyId })

  res.redirect('back')
})

//------------------------------ADMIN-AUTHENTICATION---------------
//using passport authentication middleware... local means the *local strategy*, first param where we go if success, second if failure, flash failure means
app.post(
  '/api/login',
  passport.authenticate('local', {
    failureMessage: true,
  }),
  async (req, res) => {
    res.json({
      email: req.user.Email,
      username: req.user.UserName,
    });
  }
)

app.get(
  '/api/currentuser',
  async (req, res) => {
    if (req.user) {
      res.json({
        email: req.user.Email,
        username: req.user.UserName,
      });
    }
    else {
      res.json(null);
    }
  }
);

//to log out (an express method)
app.get('/api/logout', (req, res) => {
  req.logOut();
  res.json({});
});


app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    console.log(req.body)

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    await Users.create({
      UserName: req.body.name,
      Email: req.body.email,
      Password: hashedPassword
    })
    res.redirect('login') //if registration was successful, go to login
  } catch {
    res.redirect('/register')
  }
})

//protecting our routes with middleware function that checks if authenticated
function checkAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    //if true
    return next()
  }
  res.redirect('/login')
}

//so user can't type "/login" and go back to blank login if they are already logged in
function checkNotAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    //if true send them back to homepage
    return res.redirect('/')
  }
  next() //if NOT authenticated, send to the route they typed in (/login)
}

app.use(express.static('build')) //looks @ build directory as static site to serve up

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

//listening on port 5000 and console logging a message to ensure it is listening
app.listen(port, () =>
  console.log(`VT Legal Medical Debt app listening port ${port}!`)
)
