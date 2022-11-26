import { memo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import EditProfileIcon from '../../images/editUser.png'
import HistoryBookingIcon from '../../images/bookingHistory.png'
import EditProfile from '../EditProfile'
import { StickyContainer, Sticky } from 'react-sticky';
import HistoryBookingCustomer from '../HistoryBookingCustomer'
import { english, vietnamese } from '../../Languages/ProfileLayout'
import axios from 'axios'
import { API_LIST_BOOKING_BY_ACCOUNTID, API_GET_DETAIL_CUSTOMER } from '../../API';

function ViewProfileCustomer({ languageSelected }) {
    const languageList = languageSelected === 'EN' ? english : vietnamese
    const [option, setOption] = useState(0)

    //id customer
    const id = useLocation().state.id

    const [customer, setCustomer] = useState({})

    const [listBooking, setListBooking] = useState([])

    useEffect(() => {
        axios.get(API_GET_DETAIL_CUSTOMER + id, {
        }).then((response) => {
            let customerDetailData = {
                firstName: response.data.data.firstName,
                lastName: response.data.data.lastName,
                birthDate: response.data.data.birthDate,
                gender: response.data.data.gender,
                address: response.data.data.address,
                city: response.data.data.city,
                phone: response.data.data.phone,
                email: response.data.data.email
            }
            setCustomer(customerDetailData)
            axios.get(API_LIST_BOOKING_BY_ACCOUNTID, {
                params: {
                    accountId: id
                }
            }).then((response) => {
                let listBookingRaw = []
                response.data.data.map((bookingItem) => {
                    const bookingItemRaw = {
                        bookingId: bookingItem.userBookingId,
                        tourId: bookingItem.tourId,
                        tourName: bookingItem.tourName,
                        startDate: bookingItem.startDate,
                        numberOfAdult: bookingItem.numberOfAdult,
                        numberOfChildren: bookingItem.numberOfChildren,
                        tourType: bookingItem.tourType,
                        status: bookingItem.status,
                        deposit: bookingItem.deposit,
                        price: bookingItem.totalPrice,
                        statusDeposit: bookingItem.statusDeposit
                    }
                    listBookingRaw.push(bookingItemRaw)
                    setListBooking(listBookingRaw)
                })
            }).catch((e) => {
            })
        }).catch((e) => {
        })
    }, [])

    const menu = languageSelected === 'EN' ? english : vietnamese

    return (
        <div className='container'>
            <StickyContainer>
                <div className='d-flex mt-20 mb-20'>
                    <div className='w-20'>
                        <Sticky>
                            {({ style }) => (
                                <div style={style} className='menu-profile'>
                                    <div onClick={() => setOption(0)} className={`w-100 option-menu-profile mb-20 ${option === 0 && 'option-menu-profile-selected'}`}>
                                        <img src={EditProfileIcon} className='icon-image-profile' />
                                        <label>{menu.txtEditProfile}</label>
                                    </div>
                                    <div onClick={() => setOption(1)} className={`w-100 option-menu-profile mb-20 ${option === 1 && 'option-menu-profile-selected'}`}>
                                        <img src={HistoryBookingIcon} className='icon-image-profile' />
                                        <label>{menu.txtHistoryBooking}</label>
                                    </div>
                                </div>
                            )}
                        </Sticky>
                    </div>
                    <div className='w-80 main-content-profile'>
                        {option === 0 ?
                            <EditProfile isDisabled languageSelected={languageSelected} customer={customer} setCustomer={setCustomer} />
                            :
                            <HistoryBookingCustomer isDisabled listBooking={listBooking} languageSelected={languageSelected} />}
                    </div>
                </div>
            </StickyContainer>
        </div>
    )
}

export default memo(ViewProfileCustomer)