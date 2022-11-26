import { memo, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import City from '../../Data/city.json'
import axios from "axios";
import LoadingDialog from "../../Layout/LoadingDialog";
import Bg from '../../images/bgHome.jpg'
import { useLocation } from "react-router-dom";
import { english, vietnamese } from "../../Languages/RegisterProfilePartner";
import { english as englishDetailPartner, vietnamese as vietnameseDetailPartner, englishService, vietnameseService } from "../../Languages/ViewInformationDetailPartner"
import './ViewInformationDetailPartner.scss'
import { API_GET_DETAIL_PARTNER, API_GET_SERVICE_BY_CONDITION } from '../../API';

function ViewInformationDetailPartner({ languageSelected }) {
    const navigate = useNavigate()

    const languageList = languageSelected === 'EN' ? english : vietnamese
    const languageMore = languageSelected === 'EN' ? englishDetailPartner : vietnameseDetailPartner
    const languageService = languageSelected === 'EN' ? englishService : vietnameseService

    //id cua account
    const id = useLocation().state.id

    const [optionSelected, setOptionSelected] = useState(0)

    const [getDataComplete, setGetDataComplete] = useState(false)
    const [partner, setPartner] = useState(
        {
        }
    )

    //nếu có 2 api riêng thì tách 2 biến như này
    const [listService, setListService] = useState([

    ])

    useEffect(() => {
        axios.get(API_GET_DETAIL_PARTNER + id, {
        }).then((res) => {
            let partnerDetailData = {
                emailAccount: res.data.data.email,

                firstName: res.data.data.firstName,
                lastName: res.data.data.lastName,
                birthDate: res.data.data.birthDate,
                gender: res.data.data.gender,
                phone: res.data.data.phone,
                city: res.data.data.cityContact,
                address: res.data.data.addressContact,
                emailPartner: res.data.data.emailContact,
                position: res.data.data.position,
                department: res.data.data.department,
                numberIdCard: res.data.data.numberIdCard,
                placeIssue: res.data.data.placeIssue,
                dateIssue: res.data.data.dateIssue,

                companyName: res.data.data.companyName,
                shortNameCompany: res.data.data.shortName,
                addressCompany: res.data.data.addressCompany,
                cityCompany: res.data.data.cityCompany,
                emailCompany: res.data.data.emailContactCompany,
                fax: res.data.data.fax,
                phoneCompany: res.data.data.phoneCompany,
                website: res.data.data.website,
                businessCode: res.data.data.businessLicenseCode,
                taxCode: res.data.data.taxCode,
                registrationDate: res.data.data.registrationDate,
                incorporationDate: res.data.data.incorporationDate,
            }

            axios.get(API_GET_SERVICE_BY_CONDITION, {
                params: {
                    emailPartner: partnerDetailData.emailAccount
                }
            }).then((res) => {
                const data = res.data.data
                let servicesRaw = []
                data.map((service) => {
                    const serviceItem = {
                        id: service.serviceId,
                        name: service.serviceName,
                        category: parseInt(service.serviceCategory),
                        type: "1"
                    }
                    servicesRaw.push(serviceItem)
                })
                setListService([...servicesRaw])
                setPartner({ ...partnerDetailData })
                setGetDataComplete(true)
            }).catch((e) => {
                setPartner({ ...partnerDetailData })
                setGetDataComplete(true)
            })
        }).catch((e) => {

        })
    }, [])


    console.log(partner)
    console.log("ID parmne",id)

    //Loading
    // if (!getDataComplete) {
    //     return <LoadingDialog />
    // }

    return (<div className='main-content-view-service-admin right-content-create-tour'>
        <nav className='d-flex nav-view-service-admin'>
            <div onClick={() => setOptionSelected(0)}
                className={`item-nav-view-service-admin 
                ${optionSelected == 0 ? 'item-nav-view-service-admin-selected' : 'item-nav-view-service-admin-unselected'}
                br-left-top`}>
                {languageMore.txtDetails}
            </div>

            <div onClick={() => setOptionSelected(1)}
                className={`item-nav-view-service-admin 
                ${optionSelected == 1 ? 'item-nav-view-service-admin-selected' : 'item-nav-view-service-admin-unselected'}
                br-right-top`}>
                {languageMore.txtListService}
            </div>
        </nav>

        {optionSelected === 0 ?
            <div className="form-input-all-profile-partner p-0">
                <div>
                    <div className="input-profile-company-form m-0 w-100 bd-top-none">
                        <label className="ml-20 title-form-input">{languageList.txtCompany}</label>
                        <div className="d-flex line-input">
                            <div className="mlr-50 ">
                                <label htmlFor="companyName" className="d-block">{languageList.txtName}<span className="requird-star">*</span></label>
                                <input disabled value={partner.companyName}
                                    id='companyName' className="input-inline" type='text' />
                            </div>
                            <div className="mlr-50">
                                <label className="d-block">{languageList.txtAbbreviation}</label>
                                <input disabled value={partner.shortNameCompany}
                                    className="input-inline" type='text' />
                            </div>
                        </div>
                        <div className="d-flex line-input">
                            <div className="mlr-50 ">
                                <label htmlFor="companyEmail" className="d-block">{languageList.txtEmail}<span className="requird-star">*</span></label>
                                <input disabled value={partner.emailCompany}
                                    id='companyEmail'
                                    className="input-inline" type='text' />
                            </div>
                            <div className="mlr-50">
                                <label htmlFor="companyPhone" className="d-block">{languageList.txtPhone}<span className="requird-star">*</span></label>
                                <input disabled value={partner.phoneCompany}
                                    id='companyPhone'
                                    className="input-inline" type='text' />
                            </div>
                        </div>
                        <div className="d-flex line-input">
                            <div className="mlr-50 ">
                                <label htmlFor="companyCity" className="d-block">{languageList.txtCity}<span className="requird-star">*</span></label>
                                <select disabled
                                    id='companyCity'
                                    className="input-inline">
                                    <option value={partner.cityCompany}>{partner.cityCompany}</option>
                                </select>
                            </div>
                            <div className="mlr-50">
                                <label htmlFor="companyAddress" className="d-block">{languageList.txtAddress}<span className="requird-star">*</span></label>
                                <input disabled value={partner.addressCompany}
                                    id='companyAddress'
                                    className="input-inline" type='text' />
                            </div>
                        </div>
                        <div className="d-flex line-input">
                            <div className="mlr-50 input-alone">
                                <label htmlFor="companyWebsite" className="d-block">{languageList.txtWebsite}</label>
                                <input disabled value={partner.website}
                                    id='companyWebsite'
                                    className="input-inline" type='text' />
                            </div>
                        </div>
                        <div className="d-flex line-input">
                            <div className="mlr-50 ">
                                <label htmlFor="companyFax" className="d-block">{languageList.txtFax}</label>
                                <input disabled value={partner.fax}
                                    id='companyFax'
                                    className="input-inline" type='text' />
                            </div>
                            <div className="mlr-50">
                                <label htmlFor="companyTaxCode" className="d-block">{languageList.txtTaxCode}<span className="requird-star">*</span></label>
                                <input disabled value={partner.taxCode}
                                    id='companyTaxCode'
                                    className="input-inline" type='text' />
                            </div>
                        </div>
                        <div className="d-flex line-input">
                            <div className="mlr-50 input-alone">
                                <label htmlFor="companyBusinessRegistration" className="d-block">{languageList.txtBusinessRegistration}<span className="requird-star">*</span></label>
                                <input disabled value={partner.businessCode}
                                    id='companyBusinessRegistration'
                                    className="input-inline" type='text' />
                            </div>
                        </div>
                        <div className="d-flex line-input">
                            <div className="mlr-50 ">
                                <label htmlFor="companyRegistrationDate" className="d-block">{languageList.txtRegistrationDate}<span className="requird-star">*</span></label>
                                <input disabled value={partner.registrationDate}
                                    id='companyRegistrationDate'
                                    className="input-inline" />
                            </div>
                            <div className="mlr-50">
                                <label htmlFor="companyFoundingDate" className="d-block">{languageList.txtFoundingDate}<span className="requird-star">*</span></label>
                                <input disabled value={partner.incorporationDate}
                                    id='companyFoundingDate' className="input-inline" />
                            </div>
                        </div>
                    </div>

                    <div className="input-profile-company-form mt-20 w-100">
                        <label className="ml-20 title-form-input">{languageList.txtContact}</label>
                        <div className="d-flex line-input">
                            <div className="mlr-50 ">
                                <label htmlFor="contactFirstName" className="d-block">{languageList.txtFirstName}<span className="requird-star">*</span></label>
                                <input disabled value={partner.firstName}
                                    id='contactFirstName' className="input-inline" type='text' />
                            </div>
                            <div className="mlr-50">
                                <label htmlFor="contactLastName" className="d-block">{languageList.txtLastName}<span className="requird-star">*</span></label>
                                <input disabled value={partner.lastName}
                                    id='contactLastName' className="input-inline" type='text' />
                            </div>
                        </div>
                        <div className="d-flex line-input">
                            <div className="mlr-50 ">
                                <label htmlFor="contactGender" className="d-block">{languageList.txtGender}</label>
                                <select disabled id='contactGender' className="input-inline input-4-item">
                                    <option selected={partner.gender == '1'} value='1'>Male</option>
                                    <option selected={partner.gender == '2'} value='2'>Female</option>
                                    <option selected={partner.gender == '3'} value='3'>Other</option>
                                </select>
                            </div>
                            <div className="mlr-50 ">
                                <label htmlFor="contactBirthdate" className="d-block">{languageList.txtBirthdate}</label>
                                <input disabled value={partner.birthDate}
                                    id='contactBirthdate' className="input-inline input-4-item" />
                            </div>
                        </div>
                        <div className="d-flex line-input">
                            <div className="mlr-50">
                                <label htmlFor="contactEmail" className="d-block">{languageList.txtEmail}<span className="requird-star">*</span></label>
                                <input disabled value={partner.emailPartner}
                                    id='contactEmail' className="input-inline" type='text' />
                            </div>
                            <div className="mlr-50">
                                <label htmlFor="contactPhone" className="d-block">{languageList.txtPhone}<span className="requird-star">*</span></label>
                                <input disabled value={partner.phone}
                                    id='contactPhone'
                                    className="input-inline" type='text' />
                            </div>
                        </div>
                        <div className="d-flex line-input">
                            <div className="mlr-50 ">
                                <label htmlFor="contactCity" className="d-block">{languageList.txtCity}</label>
                                <select disabled
                                    id='contactCity'
                                    className="input-inline">
                                    <option value={partner.city}>{partner.city}</option>
                                </select>
                            </div>
                            <div className="mlr-50">
                                <label htmlFor="contactAddress" className="d-block">{languageList.txtAddress}</label>
                                <input disabled value={partner.address}
                                    id='contactAddress'
                                    className="input-inline" type='text' />
                            </div>
                        </div>
                        <div className="d-flex line-input">
                            <div className="mlr-50 ">
                                <label htmlFor="contactPosition" className="d-block">{languageList.txtPositions}</label>
                                <input disabled value={partner.position}
                                    id='contactPosition'
                                    className="input-inline" type='text' />
                            </div>
                            <div className="mlr-50">
                                <label htmlFor="contactDepartment" className="d-block">{languageList.txtDepartment}</label>
                                <input disabled value={partner.department}
                                    id='contactEmail' className="input-inline" type='text' />
                            </div>
                        </div>
                        <div className="d-flex line-input line-4-item">
                            <div className="mlr-50 form-2-on-4-left">
                                <label htmlFor="contactIDCardNumber" className="d-block">{languageList.txtIdCardNumber}</label>
                                <input disabled value={partner.numberIdCard}
                                    className="input-inline" type='text' />
                            </div>
                            <div className="mlr-50 d-flex form-2-on-4-right">
                                <div className="mlr-25">
                                    <label htmlFor="contactDateOfIssue" className="d-block">{languageList.txtDateOfIssue}</label>
                                    <input disabled value={partner.dateIssue}
                                        id='contactDateOfIssue' className="input-inline input-4-item" />
                                </div>
                                <div className="mlr-25">
                                    <label htmlFor="contactPlaceOfIssue" className="d-block">{languageList.txtPlaceOfIssue}</label>
                                    <input disabled value={partner.placeIssue}
                                        id='contactPlaceOfIssue' className="input-inline input-4-item" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="form-input-all-profile-partner p-0">
                <div className="m-0 w-100 bd-top-none p-0">
                    {listService.map((service) => (
                        <div className="mb-20 item-service br-bottom-5">
                            <div className="item-service-partner d-flex space-between">
                                <label className='short-information-detail txt-14 m-auto short-information-service-partner'>
                                    <div>{service.name}</div>
                                    <div>{languageService[service.category - 1].txtCategory}</div>
                                    <div>{languageService[service.category - 1].txtType[service.type - 1]}</div>
                                </label>
                                <div className='w-75 image-hide-animation'>
                                    <img src={Bg} className='image-side-hide' />
                                    <div className='liner-white' />
                                </div>
                            </div>
                            <div className=" item-service font-14 br-bottom-5 text-center text-link"
                                onClick={() => navigate(`/admin/view-service?serviceId=${service.id}`)}>{languageMore.txtSeeDetail}</div>
                        </div>
                    ))}
                </div>
            </div>}
    </div>)
}

export default memo(ViewInformationDetailPartner)