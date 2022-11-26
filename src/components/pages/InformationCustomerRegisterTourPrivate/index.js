import { memo, useState, useEffect, useRef } from 'react'
import Select from 'react-select';
import { english, vietnamese } from '../../Languages/InformationCustomerRegisterTourPrivate'
import { API_POST_CREATE_TOUR, API_ADD_BOOKING } from '../../API';
import { useNavigate } from 'react-router-dom'
import 'react-quill/dist/quill.bubble.css'
import axios from 'axios'
import LoadingDialog from '../../Layout/LoadingDialog'
import { toast } from 'react-toastify'
import { UploadImage } from '../../../firebase/UploadImage'

function InformationCustomerRegisterTourPrivate({ languageSelected, customerRegisted, setCustomerRegisted, tour, setTour, isDisabled, userList,
    tourSchedule }) {
    const navigate = useNavigate()
    const [showLoading, setShowLoading] = useState(false)

    const languageList = languageSelected === 'EN' ? english : vietnamese
    let index = -1;

    userList.forEach((element, i) => {
        if (element.value === tour.accountId) {
            index = i
        }
    });

    const count = useRef(-1)
    const [leng, setLeng] = useState(0)
    useEffect(() => {
        if (leng === count.current) {


            count.current = -1;
            setLeng(0)
            setShowLoading(false)
            toast.success(languageList.txtAddSuccess)
            navigate('/admin/services/tour-product')
        }
    }, [leng])

    const checkTourSchedule = () => {
        if (tour.mode == 1 && tourSchedule.length != tour.numberOfDay) {
            return false
        } else {
            tourSchedule.forEach(element => {
                if (element.name === '' || element.content === '' || element.content === '<p><br></p>' || element.toPlace === '' || element.serviceTour.length === 0) {
                    return false
                }
            });
        }
        return true
    }

    const handleClickCreateTour = () => {

        if (tour.code === '' || tour.name === '' || (tour.mode == 0 && (tour.startTime === '' || tour.endTime === '')) || tour.introduce === '' ||
            (tour.type == 1 && (tour.adultPrice < 1000 || tour.childrenPrice < 1000)) || (tour.type != 1 && parseInt(tour.totalPrice) < 1000)
            || tour.addressStart === '' || !checkTourSchedule) {

            setShowLoading(false)
            toast.warning('chet')
        }
        else {
            const tourData = {
                "accountId": tour.accountId,
                "tourName": tour.name,
                "tourCode": tour.code,
                "startPlace": tour.startPlace,
                "endPlace": tour.endPlace,
                "status": tour.status,
                "tourType": tour.type,
                "startDate": tour.type != 1 ? tour.startDate : '',
                "tourMode": tour.mode,
                "numberOfDay": tour.numberOfDay,
                "numberOfNight": tour.numberOfNight,
                "minAdult": tour.minAdult,
                "maxAdult": tour.maxAdult,
                "minChildren": tour.minChildren,
                "maxChildren": tour.maxChildren,
                "minToStart": tour.minToActive,
                "maxToStart": tour.maxToActive,
                "priceAdult": tour.adultPrice,
                "priceChildren": tour.childrenPrice,
                "totalPrice": tour.totalPrice,
                "deposit": tour.deposit,
                "note": "note",
                "tourCategoryId": tour.category,
                "tourDetailDTO":
                {
                    "tourIntroduce": tour.introduce,
                    "tourInclude": tour.include,
                    "tourNonInclude": tour.nonInclude,
                    "generalTerms": tour.generalTerms,
                    "addressStart": tour.addressStart,
                    "description": tour.description,
                    "moreDescription": tour.moreDescription,
                    "priceAdult": tour.adultPrice,
                    "priceChildren": tour.childrenPrice,
                    "longitude": tour.longitude,
                    "latitude": tour.latitude,
                    "tagOfTourDTOList":
                        [...tour.tag].map((tagItem) => (
                            {
                                "tagId": tagItem
                            }
                        )
                        )
                },
                "tourScheduleDTOList": tour.mode == 1 ?
                    [...tourSchedule].map((tourScheduleItem) => (
                        {
                            "tourScheduleName": tourScheduleItem.name,
                            "content": tourScheduleItem.content,
                            "toPlace": tourScheduleItem.toPlace,
                            "tourServiceOfScheduleDTOList":

                                [...tourScheduleItem.serviceTour].map((serviceTourItem) => (
                                    {
                                        "serviceId": serviceTourItem.value
                                    }
                                )
                                )
                        }
                    )
                    ) : [{
                        "tourScheduleName": [...tourSchedule][0].name,
                        "content": [...tourSchedule][0].content,
                        "toPlace": [...tourSchedule][0].toPlace,
                        "tourServiceOfScheduleDTOList":
                            [...[...tourSchedule][0].serviceTour].map((serviceTourItem) => (
                                {
                                    "serviceId": serviceTourItem.value
                                }
                            )
                            )
                    }]
            }
            setShowLoading(true)
            count.current = tour.images.length
            axios.post(API_POST_CREATE_TOUR, tourData)
                .then((res) => {
                    const booking = {
                        "accountId": tour.accountId,
                        "tourId": res.data.data.tourId,
                        "fullName": customerRegisted.fullName,
                        "phone": customerRegisted.phone,
                        "email": customerRegisted.emailContact,
                        "bookingDate": new Date().toISOString().split("T")[0],
                        "startDate": tour.startDate,
                        "promoCode": "",
                        "request": "",
                        "dateBook": new Date().toISOString().split("T")[0],
                        "adultPrice": 0,
                        "childrenPrice": 0,
                        "numberOfAdult": customerRegisted.numberOfAdult,
                        "numberOfChildren": customerRegisted.numberOfChildren,
                        "totalPrice": tour.deposit,
                        "orderId": Date.now(),
                        "orderTitle": `${tour.name} ${customerRegisted.numberOfAdult} Adult, ${customerRegisted.numberOfChildren} Children`,
                        "payType": "",
                        "status": 0,
                        'statusDeposit': 0
                    }
                    axios.post(API_ADD_BOOKING, booking).then(() => {
                        UploadImage(tour.images, 'tour', count, setLeng, res.data.data.tourId, 'information', 0, 'images')
                    })
                })
        }
    }

    return (
        <div>
            {showLoading && <LoadingDialog />}
            <div className='form-general-tour'>
                <div className="d-flex line-input">
                    <div className="mlr-20 input-alone">
                        <label htmlFor="numberOfRoom" className="d-block title-create-tour">{languageList.txtEmail}<span className="requird-star">*</span></label>
                        <Select className='input-inline basic-multi-select'
                            onChange={(value) => setTour({ ...tour, accountId: value.value })}
                            options={userList}
                            defaultValue={index != -1 && userList[index]}
                            hideSelectedOptions={false}
                            closeMenuOnSelect={false}
                            classNamePrefix="select"
                            placeholder={languageList.txtEmail}
                        />
                    </div>
                </div>

                <div className="d-flex line-input">
                    <div className='w-45 mlr-20'>
                        <label htmlFor="numberOfRoom" className="d-block title-create-tour">{languageList.txtNumberOfAdult}<span className="requird-star">*</span></label>
                        <input value={customerRegisted.numberOfAdult} type='number' min={1}
                            onChange={(e) => setCustomerRegisted({ ...customerRegisted, numberOfAdult: e.target.value })}
                            placeholder={languageList.txtNumberOfAdult} className="input-inline" />
                    </div>
                    <div className='w-45 mlr-20'>
                        <label htmlFor="bedType" className="d-block title-create-tour">{languageList.txtNumberOfChildren}<span className="requird-star">*</span></label>
                        <input value={customerRegisted.numberOfChildren} type="number" min={0}
                            onChange={(e) => setCustomerRegisted({ ...customerRegisted, numberOfChildren: e.target.value })}
                            placeholder={languageList.txtNumberOfChildren} className='input-inline' />
                    </div>
                </div>

                <div className="line-input">
                    <div className="input-alone">
                        <div className="d-flex line-input mt-20">
                            <div className="mlr-20 input-alone">
                                <label className="d-block title-create-tour">{languageList.txtFullName}<span className="requird-star">*</span></label>
                                <input value={customerRegisted.fullName}
                                    onChange={(e) => setCustomerRegisted({ ...customerRegisted, fullName: e.target.value })}
                                    className="input-inline" placeholder={languageList.txtFullName} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className='w-45 mlr-20'>
                        <label htmlFor="numberOfRoom" className="d-block title-create-tour">{languageList.txtPhone}<span className="requird-star">*</span></label>
                        <input value={customerRegisted.phone}
                            onChange={(e) => setCustomerRegisted({ ...customerRegisted, phone: e.target.value })}
                            placeholder={languageList.txtPhone} className="input-inline" />
                    </div>
                    <div className='w-45 mlr-20'>
                        <label htmlFor="bedType" className="d-block title-create-tour">{languageList.txtEmailContact}<span className="requird-star">*</span></label>
                        <input value={customerRegisted.emailContact}
                            onChange={(e) => setCustomerRegisted({ ...customerRegisted, emailContact: e.target.value })}
                            placeholder={languageList.txtEnterContact} className='input-inline' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <div className="d-flex line-input">
                            <div className="mlr-20 input-alone">
                                <label className="d-block title-create-tour">{languageList.txtIdCard}<span className="requird-star">*</span></label>
                                <input type='number' value={customerRegisted.idCard}
                                    onChange={(e) => setCustomerRegisted({ ...customerRegisted, idCard: e.target.value })}
                                    className="input-inline" placeholder={languageList.txtIdCard} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className='w-45 mlr-20'>
                        <label htmlFor="numberOfRoom" className="d-block title-create-tour">{languageList.txtDateOfIssue}<span className="requird-star">*</span></label>
                        <input type='date' value={customerRegisted.dateOfIssue}
                            onChange={(e) => setCustomerRegisted({ ...customerRegisted, dateOfIssue: e.target.value })}
                            className="input-inline" />
                    </div>
                    <div className='w-45 mlr-20'>
                        <label htmlFor="bedType" className="d-block title-create-tour">{languageList.txtPlaceOfIssue}<span className="requird-star">*</span></label>
                        <input value={customerRegisted.placeOfIssue}
                            onChange={(e) => setCustomerRegisted({ ...customerRegisted, placeOfIssue: e.target.value })}
                            placeholder={languageList.txtPlaceOfIssue} className='input-inline' />
                    </div>
                </div>
            </div>
            <div className="d-flex line-input">
                <div className="input-alone">
                    <div onClick={handleClickCreateTour} className='input-inline btn-create-tour'>{languageList.txtCreateTour}</div>
                </div>
            </div>
        </div>
    )
}

export default memo(InformationCustomerRegisterTourPrivate)