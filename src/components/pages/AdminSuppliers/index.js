import { memo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch, AiOutlineDelete } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { HiOutlineEye } from 'react-icons/hi'
import LoadingDialog from '../../Layout/LoadingDialog'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { API_GET_SERVICE_BY_CONDITION } from '../../API'
import axios from 'axios'
import { english, vietnamese } from '../../Languages/AdminSuppliers'
import './AdminSuppliers.scss'

function AdminSuppliers({ languageSelected }) {
    let serviceCategory = 0;
    const pathName = window.location.pathname

    const [services, setServices] = useState([])
    const [getDataComplete, setGetDataComplete] = useState(false)
    const navigate = useNavigate()

    const languagesList = languageSelected === 'EN' ? english : vietnamese

    const maxItemInPage = 10
    const [numberPage, setNumberPage] = useState(1)
    const [arrayNumberOfPages, setArrayNumberOfPages] = useState([])

    if (pathName.includes('accommodation')) {
        serviceCategory = 1
    }
    else if (pathName.includes('entertainment')) {
        serviceCategory = 2
    }
    else {
        serviceCategory = 3
    }

    useEffect(() => {
        axios.get(API_GET_SERVICE_BY_CONDITION, {
            params: {
                serviceCategoryId: serviceCategory,
                isActive: 1
            }
        }).then((response) => {
            const data = response.data.data
            let servicesRaw = []
            data.map((service) => {
                const serviceItem = {
                    serviceId: service.serviceId,
                    serviceName: service.serviceName,
                    serviceCategory: parseInt(service.serviceCategory),
                    serviceAddress: service.address,
                    serviceCity: service.city,
                    partnerEmail: service.partnerEmail,
                    status: service.status,
                    isActive: service.isActive,
                    isBlock: service.isBlock
                }
                servicesRaw.push(serviceItem)
            })
            const numberOfPages = Math.ceil(servicesRaw.length / maxItemInPage)
            let arrayPage = []
            for (let i = 0; i < numberOfPages; i++) {
                arrayPage.push(i + 1)
            }
            setArrayNumberOfPages(arrayPage)
            setServices([...servicesRaw])
            setGetDataComplete(true)
        }).catch(() => {
            setServices([])
            setGetDataComplete(true)
        })
    }, [pathName])


    if (!getDataComplete) {
        return (
            <LoadingDialog />
        )
    }

    return (
        <>
            <div className='d-flex tool-list-service-main'>
                <div className='d-flex list-service-tool'>
                    <label htmlFor='search-name' className='search-input-text'>
                        <AiOutlineSearch className='icon-inner icon-search-list-service' />
                        <input placeholder='Name' id='search-name' type='text' className='input-inline input-list-service search-name-service input-inline-list-service' />
                    </label>
                </div>
            </div>
            <div className='space-table'>
                <table className='table table-hover table-list-service mt-30 table-striped'>
                    <thead>
                        <tr>
                            <td className='stt-column'>#</td>
                            <td className='name-column'>{languagesList.txtName}</td>
                            {/* <td className='type-column'>Type</td> */}
                            <td className='address-column'>{languagesList.txtAddress}</td>
                            <td className='status-column'>{languagesList.txtStatus}</td>
                            <td className='action-column'>{languagesList.txtAction}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {[...services].map((service, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{service.serviceName}</td>
                                <td>{`${service.serviceAddress}, ${service.serviceCity}`}</td>
                                <td>{(service.isBlock && <label className='status status-close'>{languagesList.txtDeleted}</label>) ||
                                    (service.status === 1 && <label className='status status-active'>{languagesList.txtActive}</label>) ||
                                    (service.status === 2 && <label className='status status-close'>{languagesList.txtClose}</label>) ||
                                    (service.status === 3 && <label className='status status-pause'>{languagesList.txtPause}</label>)}
                                </td>
                                <td>
                                    <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                        <MenuItem onClick={() => navigate(`/admin/view-service?serviceId=${service.serviceId}`)}>
                                            <HiOutlineEye /> {languagesList.txtPreview}
                                        </MenuItem>
                                        <MenuItem>
                                            <AiOutlineDelete /> {languagesList.txtDelete}
                                        </MenuItem>
                                    </Menu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='d-flex float-end paging'>
                <label className='btn-paging unseleted'>
                    <AiOutlineLeft />
                </label>
                {arrayNumberOfPages.map((page) => (
                    <label className='btn-paging'>{page}</label>
                ))}
                <label className='btn-paging unseleted'>
                    <AiOutlineRight />
                </label>
            </div>
        </>
    )
}

export default memo(AdminSuppliers)