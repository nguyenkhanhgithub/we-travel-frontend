import { memo } from 'react'
import VerifyImage from '../../images/verifyEmail.png'
import Hiring from '../../images/hiring2.png'
import './VerifyEmail.scss'
import { HiOutlineMail } from 'react-icons/hi'
import { vietnamese, english } from '../../Languages/VerifyEmail'
import BackgroundAnimater from '../../Layout/BackgroundAnimater'

function VerifyEmail({ languageSelected }) {
    let languageList = (languageSelected === 'EN' ? english : vietnamese)

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email')
    const role = urlParams.get('role')

    return (<div className='container d-flex container-verify'>
        <div className='content-description'>
        <div className='background-animater-checkmail'><BackgroundAnimater /></div>
            <div className='title-verify'>{languageList[0]}</div>
            <div className='description-verify'>{languageList[1]}</div>
            <HiOutlineMail className='icon-email-verify' />
            <div className='email-preview'>
                <label>{email}</label>
            </div>
        </div>
        <img src={role == 3 ? VerifyImage : Hiring} className='image-verify' />
    </div>)
}

export default memo(VerifyEmail)