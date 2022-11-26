import { memo, useState, useEffect } from 'react'
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom'
import { english as englishStatus, vietnamese as vietnameseStatus } from '../../Languages/StatusTour'
import { english as englishCategory, vietnamese as vietnameseCategory } from '../../Languages/TourCategory'
import { english as englishType, vietnamese as vietnameseType } from '../../Languages/TourType'
import { english as englishTable, vietnamese as vietnameseTable } from '../../Languages/TableTour';
import { AiOutlineSearch, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { HiOutlineEye } from 'react-icons/hi'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import axios from 'axios'
import { API_GET_ALL_TOUR, API_DELETE_TOUR } from '../../API';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import LoadingDialog from '../../Layout/LoadingDialog';
import { toast } from 'react-toastify'

function ListTourProduct({ languageSelected }) {
    const [getDataComplete, setGetDataComplete] = useState(false)
    const [tour, setTour] = useState([])
    const [searchName, setSearchName] = useState('')
    const [searchStatus, setSearchStatus] = useState(-1)
    const [searchCategory, setSearchCategory] = useState(-1)
    const [searchType, setSearchType] = useState(-1)

    const navigate = useNavigate()

    const optionsStatus = languageSelected === 'EN' ? englishStatus : vietnameseStatus
    const optionsCategory = languageSelected === 'EN' ? englishCategory : vietnameseCategory
    const optionsType = languageSelected === 'EN' ? englishType : vietnameseType

    const table = languageSelected === 'EN' ? englishTable : vietnameseTable

    const [count, setCount] = useState(0)

    const totlePage = Math.ceil(count / 10)

    let numberOfPages = []
    const [numberPage, setNumberPage] = useState(1)

    useEffect(() => {
        setNumberPage(1)
    }, [searchName, searchCategory, searchStatus, searchType])

    useEffect(() => {
        axios.get(API_GET_ALL_TOUR, {
            params: {
                page: numberPage,
                size: 10,
                tourName: searchName,
                tourCategoryList: searchCategory,
                status: searchStatus,
                tourType: searchType
            }
        }).then((res) => {
            setCount(res.data.data.countTour)
            let tourRaw = []
            for (let i = 0; i < res.data.data.tourDTO.length; i++) {
                const tourDTO = {
                    id: res.data.data.tourDTO[i].tourId,
                    name: res.data.data.tourDTO[i].tourName,
                    code: res.data.data.tourDTO[i].tourCode,
                    category: res.data.data.tourDTO[i].tourCategoryId,
                    type: res.data.data.tourDTO[i].tourType,
                    status: res.data.data.tourDTO[i].status,
                }
                tourRaw.push(tourDTO)
            }
            setTour(tourRaw)
            setGetDataComplete(true)
        }).catch((e) => {
            setTour([])
            setGetDataComplete(true)
        })
    }, [numberPage, searchName, searchCategory, searchStatus, searchType, getDataComplete])

    for (let i = 0; i < totlePage; i++) {
        numberOfPages.push(i + 1)
    }

    const closeTour = (id) => {
        console.log(id)
        setGetDataComplete(false)
        axios.delete(`${API_DELETE_TOUR}/${id}`).then(() => setGetDataComplete(true)).catch((e) => console.log(e))
    }

    if (!getDataComplete) {
        return (<LoadingDialog />)
    }

    return (
        <div>
            <div className='d-flex tool-list-service-main'>
                <div className='d-flex list-service-tool'>
                    <label htmlFor='search-name' className='search-input-text'>
                        <AiOutlineSearch className='icon-inner icon-search-list-service' />
                        <input value={searchName} placeholder={table.txtName} onChange={(e) => setSearchName(e.target.value)} id='search-name' type='text' className='input-inline input-list-service search-name-service input-inline-list-service' />
                    </label>
                    <Select defaultValue={searchStatus !== 0 && optionsStatus[searchStatus]} onChange={(e) => setSearchStatus(e.value)} placeholder='Status' isSearchable={false} className='select-search-service' options={optionsStatus} />
                    <Select defaultValue={searchCategory !== 0 && optionsCategory[searchCategory]} onChange={(e) => setSearchCategory(e.value)} placeholder='Category' isSearchable={false} className='select-search-service' options={optionsCategory} />
                    <Select defaultValue={searchType !== 0 && optionsType[searchType]} onChange={(e) => setSearchType(e.value)} placeholder='Type' isSearchable={false} className='select-search-service' options={optionsType} />
                </div>
                <Link to='/admin/services/create-tour' className='btn btn-primary btn-add-new-service'><AiOutlinePlus /> {table.txtAddNew}</Link>
            </div>
            <div className='space-table'>
                <table className='table table-hover table-list-service mt-30 table-striped'>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>{table.txtCode}</td>
                            <td>{table.txtName}</td>
                            <td>{table.txtTourCategory}</td>
                            <td>{table.txtTourType}</td>
                            <td>{table.txtStatus}</td>
                            <td>{table.txtAction}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {[...tour].map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{optionsCategory[item.category].label}</td>
                                <td>{item.type ? 'S.I.C' : 'Private'}</td>
                                <td>
                                    {(optionsStatus[item.status].value == 1 && <label className='status status-active'>{optionsStatus[item.status].label}</label>)
                                        || (optionsStatus[item.status].value == 2 && <label className='status status-pause'>{optionsStatus[item.status].label}</label>)
                                        || (optionsStatus[item.status].value == 3 && <label className='status status-close'>{optionsStatus[item.status].label}</label>)}
                                </td>
                                <td>
                                    <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                        <MenuItem onClick={() => navigate('/admin/preview', { state: { id: item.id } })}>
                                            <HiOutlineEye /> {table.txtPreview}
                                        </MenuItem>
                                        <MenuItem onClick={() => navigate('/admin/view-detail-tour', { state: { id: item.id } })}>
                                            <HiOutlineEye /> {table.txtViewDetail}
                                        </MenuItem>
                                        {item.status != 3 && <MenuItem onClick={() => closeTour(item.id)}>
                                            <AiOutlineDelete /> {table.txtClose}
                                        </MenuItem>}
                                    </Menu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='d-flex float-end paging'>
                {numberPage > 1 && <label onClick={() => setNumberPage(pre => pre - 1)} className='btn-paging unseleted'>
                    <AiOutlineLeft />
                </label>}
                {numberOfPages.map((item) => (
                    <label className={`btn-paging ${numberPage === item ? 'selected-paging' : 'unseleted'}`} onClick={() => setNumberPage(item)}>{item}</label>
                ))}
                {numberPage === 1 && numberOfPages.length > 1 && <label onClick={() => setNumberPage(pre => pre + 1)} className='btn-paging unseleted'>
                    <AiOutlineRight />
                </label>}
            </div>
        </div >
    )
}

export default memo(ListTourProduct)