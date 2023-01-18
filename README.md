This project was created for the Office of the Health Care Advocate at Vermont Legal Aid by students at Burlington Code Academy.

The project is open source under the MIT License.

The primary goal of this project is to highlight the impact of medical debt on Vermonters utilizing web mapping.

# Setup
Before setting up the project, please ensure that NodeJS has been installed with any version v16.x

1. Clone the repository with `git clone https://github.com/codeforbtv/vt-legal-aid-hca-capstone.git`
2. To install dependencies, run `npm install`
3. Create a `.env` file and set the environment variables with the following values
```
DEV=** Whether or not to run the project in development mode. To set false, it must be a falsy string such as "0" **
PORT=5001
SESSION_SECRET=** Secret to be used to authenticate sessions with the front-end. Generate and fill in with a tool such as https://randomkeygen.com/ **
PASSWORDMONGO=** Production password needed to connect to the Mongo database located at "medicaldebt.lmsqy.mongodb.net" Contact the project manager Katrina Meyers for more information **
```
4. Run the server with `npm start`
5. In a separate terminal, run the front-end with `npm run startReact`