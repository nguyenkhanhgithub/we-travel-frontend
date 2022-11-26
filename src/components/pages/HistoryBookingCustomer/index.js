import { memo, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './HistoryBookingCustomer.scss'
import { english, vietnamese } from '../../Languages/HistoryBookingCustomer'
import Question from '../../images/question.png'
import Momo from '../Momo'

function HistoryBookingCustomer({ languageSelected, listBooking, isDisabled }) {
    const [statusBooking, setStatusBooking] = useState(-1)
    const [listBookingShow, setListBookingShow] = useState([])


    const navigate = useNavigate()

    const handleClickLinkTour = (idTour) => {
        if (isDisabled) {
            navigate('/admin/preview', { state: { id: idTour } })
        }
        else {
            navigate('/tour-detail', { state: { id: idTour } })
        }
    }

    const handleClickPay = (rawOrderInfo, rawAmount, tourId, bookingId) => {
        const request = Date.now()
        Momo(request, rawOrderInfo, rawAmount, tourId, false, bookingId, true)
    }

    const handleClickDeposit = (rawOrderInfo, rawAmount, tourId, bookingId) => {
        const request = Date.now()
        Momo(request, rawOrderInfo, rawAmount, tourId, true, bookingId, true)
    }


    useEffect(() => {
        let listBookingShowRaw = []
        if (statusBooking == -1) {
            setListBookingShow([...listBooking])
        }
        else {
            if (statusBooking == 0) {
                listBooking.forEach((item) => {
                    if ((item.tourType == 0 && item.status == 0 && item.status == 0 && today < item.startDate) ||
                        (item.tourType == 2 && item.status == 0 && !item.statusDeposit && today < item.startDate) ||
                        (item.tourType == 2 && item.status == 0 && item.statusDeposit && today >= item.startDate)) {
                        listBookingShowRaw.push(item)
                    }
                })
            }
            else if (statusBooking == 1) {
                listBooking.forEach((item) => {
                    if ((item.tourType == 0 && item.status == 1 && today >= item.startDate) ||
                        (item.tourType == 2 && item.status == 1 && item.statusDeposit && today >= item.startDate) ||
                        (item.tourType == 1 && item.status == 1 && today >= item.startDate) ||
                        (item.tourType == 0 && item.status == 1 && today < item.startDate) ||
                        (item.tourType == 1 && item.status == 1 && today < item.startDate)) {
                        listBookingShowRaw.push(item)
                    }
                })
            }
            else if (statusBooking == 2) {
                listBooking.forEach((item) => {
                    if ((item.tourType == 0 && item.status == 2 && today >= item.startDate) ||
                        (item.tourType == 1 && item.status == 2 && today >= item.startDate) ||
                        (item.tourType == 2 && item.status == 0 && !item.statusDeposit && today >= item.startDate) ||
                        (item.tourType == 2 && item.status == 2)) {
                        listBookingShowRaw.push(item)
                    }
                })
            }
            setListBookingShow(listBookingShowRaw)
        }
    }, [statusBooking])

    const today = new Date().toISOString().split("T")[0]
    const languageList = languageSelected === 'EN' ? english : vietnamese

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND'
    });

    console.log(isDisabled)

    return (
        <div className='container'>
            {[...listBooking].length > 0 ?
                <>
                    <nav className='d-flex br-all'>
                        <div onClick={() => setStatusBooking(-1)} className={`w-25 text-center tab-history-booking bold ${statusBooking === -1 && 'tab-history-booking-selected'}`}>{languageList.txtAllBooking}</div>
                        <div onClick={() => setStatusBooking(0)} className={`w-25 text-center tab-history-booking bold ${statusBooking === 0 && 'tab-history-booking-selected'}`}>{languageList.txtWaitPay}</div>
                        <div onClick={() => setStatusBooking(1)} className={`w-25 text-center tab-history-booking bold ${statusBooking === 1 && 'tab-history-booking-selected'}`}>{languageList.txtPaid}</div>
                        <div onClick={() => setStatusBooking(2)} className={`w-25 text-center tab-history-booking bold ${statusBooking === 2 && 'tab-history-booking-selected'}`}>{languageList.txtCanceled}</div>
                    </nav>
                    <div className='mt-20'>
                        {listBookingShow.map((item, index) => (
                            <div key={index} className='mb-20 item-list-history-booking d-flex'>
                                <div>
                                    <div className='tour-name-history-booking mt-10'>{item.tourName}</div>
                                    <div className='start-date-history-booking mt-10'>{item.startDate}</div>
                                    <div className='start-date-history-booking mt-10'>{`${languageList.txtAdult} ${item.numberOfAdult}, ${languageList.txtChildren} ${item.numberOfChildren}`}</div>
                                    <div className='mt-10'>
                                        {(item.tourType == 0 && item.status == 0 && today < item.startDate && (isDisabled ? <label className='waiting-pay-history-booking'>{languageList.txtWaitPay}</label> : <button onClick={() => handleClickPay(`${item.tourName} ${item.numberOfAdult} Adult, ${item.numberOfChildren} Children`, item.price, item.tourId, item.bookingId)} className='btn-pay-history-booking'>{languageList.txtPayNow}</button>)) ||
                                            (item.tourType == 0 && item.status == 1 && today < item.startDate && (isDisabled ? <label className='waiting-history-booking'>{languageList.txtWaiting}</label> : <button className='btn-cancel-history-booking'>{languageList.txtCancel}</button>)) ||
                                            (item.tourType == 0 && item.status == 1 && today >= item.startDate && <div className='price-payed-history-booking'>{languageList.txtPaid} {formatter.format(item.price)}{!isDisabled && <button className='btn-feedback-history-booking'>{languageList.txtFeedback}</button>}</div>) ||
                                            (item.tourType == 0 && item.status == 2 && today >= item.startDate && <label className='canceled-history-booking'>{languageList.txtCanceled}</label>) ||
                                            (item.tourType == 1 && item.status == 1 && today < item.startDate && (isDisabled ? <label className='waiting-history-booking'>{languageList.txtWaiting}</label> : <button className='btn-cancel-history-booking'>{languageList.txtCancel}</button>)) ||
                                            (item.tourType == 1 && item.status == 1 && today >= item.startDate && <div className='price-payed-history-booking'>{languageList.txtPaid} {formatter.format(item.price)}{!isDisabled && <button className='btn-feedback-history-booking'>{languageList.txtFeedback}</button>}</div>) ||
                                            (item.tourType == 1 && item.status == 2 && today >= item.startDate && <label className='canceled-history-booking'>{languageList.txtCanceled}</label>) ||
                                            (item.tourType == 2 && item.status == 0 && !item.statusDeposit && today < item.startDate && (isDisabled ? <label className='waiting-pay-history-booking'>{languageList.txtWaitPayDeposit}</label> : <button onClick={() => handleClickDeposit(`${item.tourName} ${item.numberOfAdult} Adult, ${item.numberOfChildren} Children`, item.deposit, item.tourId, item.bookingId)} className='btn-pay-history-booking'>{languageList.txtPayDeposit}</button>)) ||
                                            (item.tourType == 2 && item.status == 0 && !item.statusDeposit && today >= item.startDate && <label className='canceled-history-booking'>{languageList.txtCanceled}</label>) ||
                                            (item.tourType == 2 && item.status == 0 && item.statusDeposit && today >= item.startDate && (isDisabled ? <label className='waiting-pay-history-booking'>{languageList.txtWaitPay}</label> : <button onClick={() => handleClickPay(`${item.tourName} ${item.numberOfAdult} Adult, ${item.numberOfChildren} Children`, item.price, item.tourId, item.bookingId)} className='btn-pay-history-booking'>{languageList.txtPayNow}</button>)) ||
                                            (item.tourType == 2 && item.status == 0 && item.statusDeposit && today < item.startDate && <label className='waiting-history-booking'>{languageList.txtWaiting}</label>) ||
                                            (item.tourType == 2 && item.status == 1 && item.statusDeposit && today >= item.startDate && <div className='price-payed-history-booking'>{languageList.txtPaid} {formatter.format(item.price)}{!isDisabled && <button className='btn-feedback-history-booking'>{languageList.txtFeedback}</button>}</div>) ||
                                            (item.tourType == 2 && item.status == 2 && <label className='canceled-history-booking'>{languageList.txtCanceled}</label>)}
                                    </div>
                                </div>
                                <div onClick={() => handleClickLinkTour(item.tourId)} className='link-detail-tour'>{languageList.txtDetailTour}</div>
                            </div>
                        ))}
                    </div>
                </>
                :
                <div className='image-no-booking'>
                    <img src={Question} className='image-question' />
                    <div className='text-no-booking'>{languageList.txtNoBooking} {!isDisabled && <Link to='/tours' className='link-no-booking'>{languageList.txtBookNow}</Link>}</div>
                </div>
            }
        </div>
    )
}

export default memo(HistoryBookingCustomer)