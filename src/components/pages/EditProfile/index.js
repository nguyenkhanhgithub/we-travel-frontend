import { memo, useState, useEffect } from 'react'
import { english, vietnamese } from '../../Languages/EditProfile'
import axios from 'axios'
import City from '../../Data/city.json'
import './EditProfile.scss'

function EditProfile({ languageSelected, isDisabled, customer, setCustomer }) {
    const languageList = languageSelected === 'EN' ? english : vietnamese

    return (
        <div className='container pd-edit-profile'>
            <div className="d-flex line-input">
                <div className="mlr-50 ">
                    <label htmlFor="firstName" className="d-block title-bold">{languageList.txtFirstName}<span className="requird-star">*</span></label>
                    <input value={customer.firstName} onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })} disabled={isDisabled} id='firstName' className="input-inline" type='text' />
                </div>
                <div className="mlr-50">
                    <label htmlFor="lastName" className="d-block title-bold">{languageList.txtLastName}<span className="requird-star">*</span></label>
                    <input value={customer.lastName} onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })} disabled={isDisabled} id='lastName' className="input-inline" type='text' />
                </div>
            </div>
            <div className="d-flex line-input">
                <div className="mlr-50 ">
                    <label htmlFor="firstName" className="d-block title-bold">{languageList.txtBirthdate}</label>
                    <input value={customer.birthDate} onChange={(e) => setCustomer({ ...customer, birthDate: e.target.value })} disabled={isDisabled} id='firstName' className="input-inline" />
                </div>
                <div className="mlr-50">
                    <label htmlFor="lastName" className="d-block title-bold">{languageList.txtGender}</label>
                    <select onChange={(e) => setCustomer({ ...customer, gender: e.target.value })} disabled={isDisabled}
                        id='lastName' className="input-inline" type='text' >
                        {/* <option value='' selected={customer.gender === ''}>{languageSelected === 'EN' ? 'Gender' : 'Giới tính'}</option> */}
                        <option selected={customer.gender == '1'} value='1'>Male</option>
                                    <option selected={customer.gender == '2'} value='2'>Female</option>
                                    <option selected={customer.gender == '3'} value='3'>Other</option>
                        
                    </select>
                </div>
            </div>
            <div className="d-flex line-input">
                <div className="mlr-50 ">
                    <label htmlFor="firstName" className="d-block title-bold">{languageList.txtAddress}</label>
                    <input onChange={(e) => setCustomer({ ...customer, address: e.target.value })} value={customer.address} disabled={isDisabled} id='firstName' className="input-inline" type='text' />
                </div>
                <div className="mlr-50">
                    <label htmlFor="lastName" className="d-block title-bold">{languageList.txtCity}</label>
                    <select onChange={(e) => setCustomer({ ...customer, city: e.target.value })} disabled={isDisabled} id='lastName' className="input-inline">
                        {City.map((city) => (<option selected={customer.city === city.name} value={city.name}>{city.name}</option>))}
                    </select>
                </div>
            </div>
            <div className="d-flex line-input">
                <div className="mlr-50 ">
                    <label htmlFor="firstName" className="d-block title-bold">{languageList.txtPhone}</label>
                    <input onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} value={customer.phone} disabled={isDisabled} id='firstName' className="input-inline" type='text' />
                </div>
                <div className="mlr-50">
                    <label htmlFor="lastName" className="d-block title-bold">{languageList.txtEmail}</label>
                    <input onChange={(e) => setCustomer({ ...customer, email: e.target.value })} value={customer.email} disabled={isDisabled} id='lastName' className="input-inline" type='text' />
                </div>
            </div>
            <div className="d-flex line-input line-btn-right">
                {window.location.pathname === '/profile' ?
                    <button className='btn btn-primary mr-50 btn-save-profile'>{languageSelected === 'EN' ? 'Save' : 'Lưu'}</button>
                    :
                    <button className='btn btn-danger mr-50 btn-save-profile'>{languageSelected === 'EN' ? 'Block' : 'Khoá'}</button>
                }
            </div>
        </div>
    )
}

export default memo(EditProfile)