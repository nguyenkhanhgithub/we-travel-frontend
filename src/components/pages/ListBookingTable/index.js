import { memo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import './ListBookingTable.scss'
import { english, vietnamese } from '../../Languages/ListBookingTable'
import { StickyContainer, Sticky } from 'react-sticky'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

function ListBookingTable({ languageSelected }) {
    //id tour
    const id = useLocation().state.id
    //ngay bat dau muon kiem tra
    const startDate = useLocation().state.startDate

    const [searchName, setSearchName] = useState('')

    const languageList = languageSelected === 'EN' ? english : vietnamese

    //truyen du lieu vao day
    const [booking, setBooking] = useState([
        {
            emailAccount: 'abc@gmail.com',
            fullName: 'Nguyen Van A',
            numberOfAdult: 5,
            numberOfChildren: 10,
            emailContact: 'xyz@gmail.com',
            phoneContact: '0987654321',
            idCard: '34234234234',
            dateOfIssue: '2022-01-01',
            placeOfIssue: 'abcyxz',
            request: 'ahfasdkjf'
        },
        {
            emailAccount: 'abc@gmail.com',
            fullName: 'Nguyen Van B',
            numberOfAdult: 5,
            numberOfChildren: 10,
            emailContact: 'xyz@gmail.com',
            phoneContact: '0987654321',
            idCard: '34234234234',
            dateOfIssue: '2022-01-01',
            placeOfIssue: 'abcyxz',
            request: 'ahfasdkjf'
        },
        {
            emailAccount: 'abc@gmail.com',
            fullName: 'Nguyen Van C',
            numberOfAdult: 5,
            numberOfChildren: 10,
            emailContact: 'xyz@gmail.com',
            phoneContact: '0987654321',
            idCard: '34234234234',
            dateOfIssue: '2022-01-01',
            placeOfIssue: 'abcyxz',
            request: 'ahfasdkjf'
        },
        {
            emailAccount: 'abc@gmail.com',
            fullName: 'Nguyen Van D',
            numberOfAdult: 5,
            numberOfChildren: 10,
            emailContact: 'xyz@gmail.com',
            phoneContact: '0987654321',
            idCard: '34234234234',
            dateOfIssue: '2022-01-01',
            placeOfIssue: 'abcyxz',
            request: 'ahfasdkjf'
        }, {
            emailAccount: 'abc@gmail.com',
            fullName: 'Nguyen Van E',
            numberOfAdult: 5,
            numberOfChildren: 10,
            emailContact: 'xyz@gmail.com',
            phoneContact: '0987654321',
            idCard: '34234234234',
            dateOfIssue: '2022-01-01',
            placeOfIssue: 'abcyxz',
            request: 'ahfasdkjf'
        },
        {
            emailAccount: 'abc@gmail.com',
            fullName: 'Nguyen Van F',
            numberOfAdult: 5,
            numberOfChildren: 10,
            emailContact: 'xyz@gmail.com',
            phoneContact: '0987654321',
            idCard: '34234234234',
            dateOfIssue: '2022-01-01',
            placeOfIssue: 'abcyxz',
            request: 'ahfasdkjf'
        },
        {
            emailAccount: 'abc@gmail.com',
            fullName: 'Nguyen Van G',
            numberOfAdult: 5,
            numberOfChildren: 10,
            emailContact: 'xyz@gmail.com',
            phoneContact: '0987654321',
            idCard: '34234234234',
            dateOfIssue: '2022-01-01',
            placeOfIssue: 'abcyxz',
            request: 'ahfasdkjf'
        }, {
            emailAccount: 'abc@gmail.com',
            fullName: 'Nguyen Van H',
            numberOfAdult: 5,
            numberOfChildren: 10,
            emailContact: 'xyz@gmail.com',
            phoneContact: '0987654321',
            idCard: '34234234234',
            dateOfIssue: '2022-01-01',
            placeOfIssue: 'abcyxz',
            request: 'ahfasdkjf'
        },
        {
            emailAccount: 'abc@gmail.com',
            fullName: 'Nguyen Van I',
            numberOfAdult: 5,
            numberOfChildren: 10,
            emailContact: 'xyz@gmail.com',
            phoneContact: '0987654321',
            idCard: '34234234234',
            dateOfIssue: '2022-01-01',
            placeOfIssue: 'abcyxz',
            request: 'ahfasdkjf'
        },
        {
            emailAccount: 'abc@gmail.com',
            fullName: 'Nguyen Van IK',
            numberOfAdult: 5,
            numberOfChildren: 10,
            emailContact: 'xyz@gmail.com',
            phoneContact: '0987654321',
            idCard: '34234234234',
            dateOfIssue: '2022-01-01',
            placeOfIssue: 'abcyxz',
            request: 'ahfasdkjf'
        }
    ])

    useEffect(() => {
        //choc api
    }, [numberPage])

    //cái này để hiện detail, ko đc set vì code set sẵn r
    const [bookingDetail, setBookingDetail] = useState({
        fullName: '',
        applyFor: '',
        email: '',
        phone: '',
        idCard: '',
        dateOfIssue: '',
        placeOfIssue: '',
        request: ''
    })

    const [numberOfPages, setNumberOfPages] = useState([1, 2, 3])
    const [numberPage, setNumberPage] = useState(1)

    const handleClickViewDetail = (item) => {
        const bookingDetailRaw = {
            fullName: item.fullName,
            applyFor: `${item.numberOfAdult} ${languageList.txtAdult}, ${item.numberOfChildren} ${languageList.txtChildren}`,
            email: item.emailContact,
            phone: item.phoneContact,
            idCard: item.idCard,
            dateOfIssue: item.dateOfIssue,
            placeOfIssue: item.placeOfIssue,
            request: item.request
        }

        setBookingDetail({ ...bookingDetailRaw })

        document.getElementById('detail-booking').style.cssText = `
        width: 50%;
        opacity: 1;
        margin-left: 20px;
        `
    }

    const handleClickCloseDetail = () => {
        document.getElementById('detail-booking').style.cssText = `
        width: 0%;
        opacity: 0;
        margin-left: 0px;
        `
    }

    return (
        <div>
            <div className='d-flex tool-list-service-main m-0'>
                <div className='d-flex list-service-tool'>
                    <label htmlFor='search-name' className='search-input-text'>
                        <AiOutlineSearch className='icon-inner icon-search-list-service' />
                        <input value={searchName} onChange={(e) => setSearchName(e.target.value)} id='search-name' type='text' className='input-inline input-list-service search-name-service input-inline-list-service' />
                    </label>
                </div>
            </div>
            <StickyContainer>
                <div className='d-flex'>
                    <div className='w-100 '>
                        <table className='table table-hover table-list-service mt-30 table-striped'>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>{languageList.txtEmailAccount}</td>
                                    <td>{languageList.txtFullName}</td>
                                    <td>{languageList.txtNumberOfPeople}</td>
                                    <td className='text-center'>{languageList.txtAction}</td>
                                </tr>
                            </thead>
                            <tbody>
                                {booking.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.emailAccount}</td>
                                        <td>{item.fullName}</td>
                                        <td>{`${item.numberOfAdult} ${languageList.txtAdult}, ${item.numberOfChildren} ${languageList.txtChildren}`}</td>
                                        <td onClick={() => handleClickViewDetail(item)} className='text-center click-view-detail'>{languageList.txtViewDetail}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='d-flex float-end paging'>
                            {numberPage > 1 && <label onClick={() => setNumberPage(pre => pre - 1)} className='btn-paging unseleted'>
                                <AiOutlineLeft />
                            </label>}
                            {numberOfPages.map((item) => (
                                <label className={`btn-paging ${numberPage === item ? 'selected-paging' : 'unseleted'}`} onClick={() => setNumberPage(item)}>{item}</label>
                            ))}
                            {numberPage < numberOfPages.length && <label onClick={() => setNumberPage(pre => pre + 1)} className='btn-paging unseleted'>
                                <AiOutlineRight />
                            </label>}
                        </div>
                    </div>
                    <div className='w-0 mt-30 detail-booking' id='detail-booking'>
                        <Sticky>
                            {({ style }) => (
                                <div style={style} className='detail-booking-main'>
                                    <header className='d-flex space-between'>
                                        <label>{languageList.txtDetailBooking}</label>
                                        <label className='cancel-btn' onClick={handleClickCloseDetail}>X</label>
                                    </header>
                                    <div className='main-content-booking-detail'>
                                        <div className="d-flex line-input">
                                            <div className="mlr-50 input-alone">
                                                <label htmlFor="companyWebsite" className="d-block title m-0 font-14">{languageList.txtSightseeDay}</label>
                                                <input id='companyWebsite' value={startDate}
                                                    className="input-inline mb-10" type='date' disabled />
                                            </div>
                                        </div>
                                        <div className="d-flex line-input">
                                            <div className="mlr-50 input-alone">
                                                <label htmlFor="companyWebsite" className="d-block title m-0 font-14">{languageList.txtApplyFor}</label>
                                                <input id='companyWebsite' value={bookingDetail.applyFor}
                                                    className="input-inline mb-10" disabled />
                                            </div>
                                        </div>
                                        <div className="d-flex line-input">
                                            <div className="mlr-50 input-alone">
                                                <label htmlFor="companyWebsite" className="d-block title m-0 font-14">{languageList.txtFullName}</label>
                                                <input id='companyWebsite' value={bookingDetail.fullName}
                                                    className="input-inline mb-10" disabled />
                                            </div>
                                        </div>
                                        <div className="d-flex line-input">
                                            <div className='mlr-50'>
                                                <label className="d-block title m-0 font-14">{languageList.txtEmail}</label>
                                                <input value={bookingDetail.email} disabled
                                                    className="input-inline mb-10" type='text' />
                                            </div>
                                            <div className='mlr-50'>
                                                <label className="d-block title m-0 font-14">{languageList.txtPhone}</label>
                                                <input value={bookingDetail.phone} disabled
                                                    className="input-inline mb-10" type='text' />
                                            </div>
                                        </div>
                                        <div className="d-flex line-input">
                                            <div className="mlr-50 input-alone">
                                                <label htmlFor="companyWebsite" className="d-block title m-0 font-14">{languageList.txtIdCard}</label>
                                                <input id='companyWebsite' value={bookingDetail.idCard}
                                                    className="input-inline mb-10" disabled />
                                            </div>
                                        </div>
                                        <div className="d-flex line-input">
                                            <div className='mlr-50'>
                                                <label className="d-block title m-0 font-14">{languageList.txtDateOfIssue}</label>
                                                <input value={bookingDetail.dateOfIssue} disabled
                                                    className="input-inline mb-10" type='date' />
                                            </div>
                                            <div className='mlr-50'>
                                                <label className="d-block title m-0 font-14">{languageList.txtPlaceOfIssue}</label>
                                                <input value={bookingDetail.placeOfIssue} disabled
                                                    className="input-inline mb-10" type='text' />
                                            </div>
                                        </div>
                                        <div className="d-flex line-input">
                                            <div className="input-alone mlr-50">
                                                <label htmlFor='description' className='d-block title m-0 font-14'>{languageList.txtRequest}</label>
                                                <textarea rows="4" id='description' className='input-inline mb-10'
                                                    disabled value={bookingDetail.request} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Sticky>
                    </div>
                </div>
            </StickyContainer>
        </div>
    )
}

export default memo(ListBookingTable)