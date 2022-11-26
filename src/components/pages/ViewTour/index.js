import { memo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { english, vietnamese } from '../../Languages/MenuCreateTour'
import GeneralInformationTour from '../GeneralInformationTour'
import TourSchedule from '../TourSchedule'
import MoreInformationTour from '../MoreInformationTour'
import axios from 'axios';
import { API_GET_SERVICE_BY_CONDITION, API_GET_DETAIL_TOUR } from "../../API"
import LoadingDialog from '../../Layout/LoadingDialog'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from "../../../firebase/Upload";
import InformationCustomerRegisterTourPrivate from '../InformationCustomerRegisterTourPrivate'

function ViewTour({ languageSelected }) {
    const [getServiceComplete, setGetServiceComplete] = useState(false)
    const [getDataComplete, setGetDataComplete] = useState(false)
    const [optionSelected, setOptionSelected] = useState(0)

    const menuCreateTour = (languageSelected === 'EN' ? english : vietnamese)
    const titleLanguage = (languageSelected === 'EN' ? 'Tour information' : 'Thông tin tour')

    const id = useLocation().state.id

    const [serviceList, setServiceList] = useState([])

    useEffect(() => {
        let services = [
        ]
        axios.get(API_GET_SERVICE_BY_CONDITION, {
            params: {
                isActive: 1,
                isBlock: 0,
                status: 1
            }
        }).then((response) => {
            response.data.data.map((item) => {
                let service = {
                    value: item.serviceId,
                    label: item.serviceName
                }
                services.push(service)
            })
            setServiceList([...services])
            setGetServiceComplete(true)
        })
    }, [])

    const [tour, setTour] = useState()

    const [tourSchedule, setTourSchedule] = useState([])

    useEffect(() => {
        axios.get(`${API_GET_DETAIL_TOUR}/${id}`).then((res) => {
            const data = res.data.data
            let tagRaw = []
            data.tourDetailDTO.tagOfTourDTOList.forEach(element => {
                tagRaw.push(parseInt(element.tagId))
            })

            let scheduleRaw = []
            data.tourScheduleDTOList.forEach(element => {
                let serviceTourRaw = []
                element.tourServiceOfScheduleDTOList.map((item) => serviceTourRaw.push({ value: item.serviceId }))

                const schedule = {
                    name: element.tourScheduleName,
                    content: element.content,
                    toPlace: element.toPlace,
                    serviceTour: serviceTourRaw,
                    openServices: false,
                    show: true
                }
                scheduleRaw.push(schedule)
            })

            let tourRaw = {
                code: data.tourCode,
                startPlace: data.startPlace,
                endPlace: data.endPlace,
                status: data.status,
                type: data.tourType,
                category: data.tourCategoryId,
                mode: data.tourMode ? 1 : 0,
                startDate: data.startDate,
                numberOfDay: data.numberOfDay,
                numberOfNight: data.numberOfNight,
                minAdult: data.minAdult,
                maxAdult: data.maxAdult,
                minChildren: data.minChildren,
                maxChildren: data.maxChildren,
                minToActive: data.minToStart,
                id: data.tourId,
                name: data.tourName,
                price: data.priceAdult,
                adultPrice: data.priceAdult,
                childrenPrice: data.priceChildren,
                introduce: data.tourDetailDTO.tourIntroduce,
                tag: tagRaw,
                schedule: scheduleRaw,
                city: data.startPlace,
                addressStart: data.tourDetailDTO.addressStart,
                include: data.tourDetailDTO.tourInclude,
                nonInclude: data.tourDetailDTO.tourNonInclude,
                generalTerms: data.tourDetailDTO.generalTerms,
                moreDescription: data.tourDetailDTO.moreDescription,
                latitude: data.tourDetailDTO.latitude,
                longitude: data.tourDetailDTO.longitude
            }
            listAll(ref(storage, `tour/${tourRaw.id}/information/images`)).then((res) => {
                let tourImages = []
                let count = res.items.length;
                let leng = 0;
                res.items.forEach((item) => {
                    getDownloadURL(ref(storage, item.fullPath))
                        .then((url) => {
                            axios({
                                url: url,
                                method: 'GET',
                                responseType: 'blob',
                            }).then(blob => {
                                tourImages.push(blob.data)
                                leng++
                                if (leng === count) {
                                    setTour({
                                        ...tourRaw, images: tourImages
                                    })
                                    setTourSchedule(scheduleRaw)
                                    setGetDataComplete(true)
                                }
                            })
                        })
                })
            })

        })
    }, [])

    const listScreen = [<GeneralInformationTour languageSelected={languageSelected} tour={tour} setTour={setTour} tourSchedule={tourSchedule} setTourSchedule={setTourSchedule} isDisabled />,
    <TourSchedule languageSelected={languageSelected} tour={tour} tourSchedule={tourSchedule} setTourSchedule={setTourSchedule} serviceList={serviceList} isDisabled />,
    <MoreInformationTour languageSelected={languageSelected} tour={tour} setTour={setTour} tourSchedule={tourSchedule} isDisabled />,
    <InformationCustomerRegisterTourPrivate languageSelected={languageSelected} tour={tour} setTour={setTour} />]

    if (!getServiceComplete || !getDataComplete) {
        return (<LoadingDialog />)
    }

    return (
        <div className='main-content-view-service-admin right-content-create-tour'>
            <nav className='d-flex nav-view-service-admin'>
                {menuCreateTour.map((item, index) => (
                    <div onClick={() => setOptionSelected(index)}
                        className={`item-nav-view-service-admin 
                        ${optionSelected == index ? 'item-nav-view-service-admin-selected' : 'item-nav-view-service-admin-unselected'}
                        ${index === 0 && 'br-left-top'} ${index === menuCreateTour.length - 1 && 'br-right-top'}`}>
                        {item}
                    </div>
                ))}
            </nav>

            <div className='d-flex content-title-view-service bg-white content-title-view-admin'>
                <label className='title-admin-view-service'>{titleLanguage}</label>
            </div>

            <div className='main-content-right-view-tour-under'>
                {listScreen[optionSelected]}
            </div>
        </div>
    )
}

export default memo(ViewTour)