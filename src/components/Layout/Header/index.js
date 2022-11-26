import { useState, memo, useEffect } from 'react'
import Login from '../../pages/Login'
import ForgotPassword from '../../pages/ForgotPassword';
import { Link } from 'react-router-dom'
import { FaRegHandshake, FaRegBell } from "react-icons/fa";
import { BiTrip, BiHistory } from 'react-icons/bi'
import VietNamFlag from '../../images/vietnam.png'
import EnglishFlag from '../../images/english.png'
import { AiOutlineCaretDown, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { MdOutlineForum } from "react-icons/md";
import 'react-dropdown/style.css';
import './Header.css';
import { vietnamese, english } from '../../Languages/Header'
import LoadingDialog from '../LoadingDialog';
import { toast } from 'react-toastify';

function Header({ languageSelected, setLanguageSelected, setProgress, style }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [language, setLanguage] = useState(languageSelected);

    const [firstName, setFirstName] = useState(sessionStorage.getItem('firstName'))
    const [lastName, setLastName] = useState(sessionStorage.getItem('lastName'))
    const [role, setRole] = useState(sessionStorage.getItem('role'))
    const [email, setEmail] = useState(sessionStorage.getItem('email'))

    useEffect(() => {
        setFirstName(sessionStorage.getItem('firstName'))
        setLastName(sessionStorage.getItem('lastName'))
        setRole(sessionStorage.getItem('role'))
        setEmail(sessionStorage.getItem('email'))
    })

    let languageList = (languageSelected === 'EN' ? english : vietnamese)

    const handleSelectLanguage = () => {
        const text = document.getElementById('select-language-option').textContent;
        document.cookie = `languageSelected=${text}`;
        setLanguageSelected(text)
        setLanguage(text);
        const detail = document.getElementById('select-language');
        detail.removeAttribute("open");
        setProgress(100)
    };

    const handleCLickLogout = () => {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem('firstName')
        sessionStorage.removeItem('lastName')
        sessionStorage.removeItem('address')
        sessionStorage.removeItem('city')
        sessionStorage.removeItem('gender')
        sessionStorage.removeItem('birthdate')
        sessionStorage.removeItem('phone')
        sessionStorage.removeItem('rankPoint')
        sessionStorage.removeItem('partnerEmail')
        sessionStorage.removeItem('detail-service')
        sessionStorage.removeItem('role')
        sessionStorage.removeItem('index-service-selected')
        setFirstName('')
        setEmail('')
        setRole(0)
        setProgress(100)
    }

    return (<div style={style} className='container header-container'><header className='header-main'>
        <Link className='inner' to={sessionStorage.getItem('role') == 1 ? '/admin/dashboard' : '/'}>
            <img src='https://lambanner.com/wp-content/uploads/2020/04/MNT-DESIGN-10-MEO-THIET-KE-LOGO-1130x570.jpg' className='logo' />
            <div className='text-logo'>WeTravel</div>
        </Link>
        <nav className='nav-link'>
            {(role > 1 || role === null) &&
                <>
                    <Link to='/tours' className='link' ><BiTrip className='icon-image' />Tours</Link>
                    <Link to='/' className='link' ><MdOutlineForum className='icon-image' />{languageList.txtForum}</Link>
                    <Link to={sessionStorage.getItem('role') == 2 ? '/partner' : '/select-service'} className='link'><FaRegHandshake className='icon-image' /> {languageList.txtPartner}</Link>
                </>
            }
            <details id='select-language'>
                <summary className='select-language'><img src={language === 'EN' ? EnglishFlag : VietNamFlag} className='icon-image' />{language} <AiOutlineCaretDown className='icon-image' /></summary>
                <label className='label-select-language' onClick={handleSelectLanguage}>
                    <img src={language === 'EN' ? VietNamFlag : EnglishFlag} className='icon-image' />
                    <label id='select-language-option'>{language !== 'EN' ? 'EN' : 'VI'}</label>
                </label>
            </details>
            {role === null ? <>
                <label className='link login' onClick={() => setShowLogin(true)}>{languageList.txtLogin}</label>
                <Link to='/register' className='link register' >{languageList.txtRegister}</Link>
            </> :
                <details className='link'>
                    <summary className='d-flex'>{role > 1 ? `${firstName} ${lastName}` : `${email}`} <AiOutlineCaretDown className='icon-image icon-lower' /></summary>
                    <div className='dropdown-profile-item'>
                        <div>{languageList.txtMyAccount}</div>
                        <Link to='/change-password' className='item-dropdown-profile'><AiOutlineUser className='icon-image icon-dropdown-profile' /> {languageList.txtChangePassword}</Link>
                        {role > 1 &&
                            <>
                                <Link to='/profile' className='item-dropdown-profile'><AiOutlineUser className='icon-image icon-dropdown-profile' /> {languageList.txtEditProfile}</Link>
                            </>
                        }
                        <Link onClick={handleCLickLogout} to='/' className='item-dropdown-profile'><AiOutlineLogout className='icon-image icon-dropdown-profile' /> {languageList.txtLogout}</Link>
                    </div>
                </details>
            }

        </nav>
    </header>
        {(showLogin || showForgotPassword || showLoading) && <div className='popup'>
            <div className='bg-popup' onClick={() => {
                setShowForgotPassword(false)
                setShowLogin(false)
            }} />
            {showLoading ? <LoadingDialog /> :
                showForgotPassword ? <ForgotPassword setProgress={setProgress} toast={toast} setShowLoading={setShowLoading} languageSelected={languageSelected} /> :
                    <Login setProgress={setProgress} toast={toast} setShowLogin={setShowLogin} setShowLoading={setShowLoading} languageSelected={languageSelected} handleForgotPassword={setShowForgotPassword} />
            }
        </div>}
    </div>)
}

export default memo(Header)