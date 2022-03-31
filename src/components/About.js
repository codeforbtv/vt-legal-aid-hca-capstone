//----Necessary imports
import React from 'react'
import '../App.css'
import NavAbout from './NavAbout'
import NavVerticalAbout from './NavVerticalAbout'
import { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Debt2 from '../Debt2.svg'

//creating a material ui style for maroon text
const MaroonTextTypography = withStyles({
  root: {
    color: '#5a203c'
  }
})(Typography)

const GreenTextTypography = withStyles({
  root: {
    color: '#205A3E'
  }
})(Typography)

//Home function to render page structural elements

export default function About () {
  //creating use state variables
  const [
    // featuredDisplay,
    setFeaturedDisplay
  ] = useState(true)
  const [
    // countyStoryDisplay,
    setCountyStoryDisplay
  ] = useState(false)
  const [
    // selectedCounty,
    setSelectedCounty
  ] = useState('')
  const [navCountySelect, setNavCountySelect] = useState('')
  const [mobileView, setMobileView] = useState(false)
  const [
    // isSelected,
    setIsSelected
  ] = useState(false)

  //useEffect to set the mobile view for navigation based on the window width
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false)
    }

    setResponsiveness()
    window.addEventListener('resize', () => setResponsiveness())

    return () => {
      window.removeEventListener('resize', () => setResponsiveness())
    }
  }, [])

  return (
    //React fragment (instead of <div>)
    <>
      {/* ternary to display the correct nav based on the useEffect window width */}
      {mobileView ? (
        <NavVerticalAbout
          setSelectedCounty={setSelectedCounty}
          setCountyStoryDisplay={setCountyStoryDisplay}
          setFeaturedDisplay={setFeaturedDisplay}
          navCountySelect={navCountySelect}
          setNavCountySelect={setNavCountySelect}
          setIsSelected={setIsSelected}
        ></NavVerticalAbout>
      ) : (
        <NavAbout
          setSelectedCounty={setSelectedCounty}
          setCountyStoryDisplay={setCountyStoryDisplay}
          setFeaturedDisplay={setFeaturedDisplay}
          navCountySelect={navCountySelect}
          setNavCountySelect={setNavCountySelect}
          setIsSelected={setIsSelected}
        />
      )}

      <div className='subpage-wrapper'>
        <div className='left-article'>
          <MaroonTextTypography variant='h5'>
            <strong> About This Web Site </strong>
          </MaroonTextTypography>
          <div className='content'>
            <GreenTextTypography variant='h6'>
              <em>
                {' '}
                <strong>Why the Medical Debt Project? </strong>
              </em>
            </GreenTextTypography>
          </div>
          <div className='content'>
            The Office of the Health Care Advocate (HCA) is collecting
            Vermonters’ experiences with medical debt. We heard from hundreds of
            Vermonters from all parts of the state who have or continue to
            suffer from the impact of medical debt.
          </div>
          <div className='content'>
            <GreenTextTypography variant='h6'>
              <strong>
                <em>The Medical Debt Project's Three Goals</em>
              </strong>
            </GreenTextTypography>
          </div>
          <div className='content'>
            <ol>
              <li>
                Inform policy makers and the public about the issue of medical
                debt and its negative impact on getting the right care at the
                right time.
              </li>
              <li>
                Support the passage of meaningful policy changes to reduce
                medical debt and improve access to health care for Vermonters
                and Vermont children and families.
              </li>
              <li>Let the voices of Vermonters be heard.</li>
            </ol>
          </div>
          <div className='content'>
            <GreenTextTypography variant='h7'>
              <strong>
                <em>Participate!</em>
              </strong>
            </GreenTextTypography>
          </div>
          <div className='content'>
            The project is ongoing and we would love to hear about your
            experiences.{' '}
            <a
              href='https://docs.google.com/forms/d/e/1FAIpQLScRvw8T2MMNnG9up4qYqJ-oKS2WkUUPnOmkIip8QQP-RVxBeQ/viewform'
              target='_blank'
              rel="noreferrer"
            >
              Please share your story here.
            </a>
          </div>
          <div className='content'>
            <GreenTextTypography variant='h7'>
              <strong>
                <em>Acknowledgements</em>
              </strong>
            </GreenTextTypography>
          </div>
          <div className='content'>
            Terri Isidro, Paul Dodson, Matthew Crownover, and Michael Pendleton
            developed this website as a capstone project for the{' '}
            <a href='https://burlingtoncodeacademy.com/' target='_blank' rel="noreferrer">
              Burlington Code Academy (BCA)
            </a>
            .{' '}
            <a href='https://burlingtoncodeacademy.com/' target='_blank' rel="noreferrer">
              BCA
            </a>{' '}
            is an award-winning technology education center that helps adults of
            all backgrounds change careers through online software development
            and UX/UI design training programs.{' '}
            <a href='https://burlingtoncodeacademy.com/' target='_blank' rel="noreferrer">
              BCA's
            </a>{' '}
            array of part-time and full-time courses emphasize teamwork, career
            readiness, and the value of collaborative learning in the
            21st-century workplace.{' '}
            <a href='https://burlingtoncodeacademy.com/' target='_blank' rel="noreferrer">
              BCA
            </a>{' '}
            fuses education with practical career training to ensure students’
            long-term success.
          </div>
          <div className='content'>
            This site is also made possible by the past and ongoing support of{' '}
            <a href='https://codeforbtv.org/' target='_blank' rel="noreferrer">
              Code for BTV
            </a>
            .{' '}
            <a href='https://codeforbtv.org/' target='_blank' rel="noreferrer">
              Code for BTV
            </a>{' '}
            is an official local chapter (known as a Brigade) of the national
            program{' '}
            <a href='https://brigade.codeforamerica.org/' target='_blank' rel="noreferrer">
              Code for America
            </a>
            .{' '}
            <a href='https://codeforbtv.org/' target='_blank' rel="noreferrer">
              Code for BTV
            </a>{' '}
            facilitates sustainable collaborations on civic software and open
            data projects between coders, designers, and organizations (both
            governmental and non-governmental) in Vermont. Effectively,{' '}
            <a href='https://codeforbtv.org/' target='_blank' rel="noreferrer">
              Code for BTV
            </a>{' '}
            acts as a pro bono digital agency for our partners, covering all
            aspects of project design, development, and delivery.
          </div>
          <div className='content'>
            The HCA is deeply grateful for the support and contributions that
            these persons and organizations generously gave to us. This web site
            would not be possible but for their generosity.
          </div>
        </div>
        <div className='right-article'>
          <img src={Debt2} alt='legal debt' />
        </div>
      </div>
    </>
  )
}
