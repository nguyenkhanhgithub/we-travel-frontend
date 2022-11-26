import { memo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { english as englishServiceCategory, vietnamese as vietnameseServiceCategory } from '../../Languages/ServiceCategory'
import { english as englishTablePartner, vietnamese as vietnameseTablePartner } from '../../Languages/TableListPartner'
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch, AiOutlineDelete } from 'react-icons/ai'
import { HiOutlineEye } from 'react-icons/hi'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { API_GET_PARTNER } from '../../API';
import axios from 'axios'

function ListParner({ languageSelected }) {
    const optionsCategory = languageSelected === 'EN' ? englishServiceCategory : vietnameseServiceCategory
    const table = languageSelected === 'EN' ? englishTablePartner : vietnameseTablePartner
    const navigate = useNavigate()
    const [count, setCount] = useState(0)
    const totlePage = Math.ceil(count / 10)
    const [searchName, setSearchName] = useState('')
    let numberOfPages = []
    const [numberPage, setNumberPage] = useState(1)
    const [partners, setPartners] = useState([])

    useEffect(() => {
        axios.get(API_GET_PARTNER, {
            params: {
                page: numberPage,
                size: 10,
                tourName: searchName,
            }
        }).then((res) => {
            setCount(res.data.data.totalElements)
            let listPartnerData = []
            for (let i = 0; i < res.data.data.content.length; i++) {
                const listPartner = {
                    email: res.data.data.content[i].email,
                    companyName: res.data.data.content[i].companyName,
                    addressCompany: res.data.data.content[i].addressCompany,
                    cityCompany: res.data.data.content[i].cityCompany,
                    category: res.data.data.content[i].tourCategoryId,
                    isBlock: res.data.data.content[i].isBlock,
                    accountId: res.data.data.content[i].accountId
                }
                listPartnerData.push(listPartner)
            }
            setPartners(listPartnerData)
        }).catch((e) => {
        })
    }, [numberPage, searchName])

    for (let i = 0; i < totlePage; i++) {
        numberOfPages.push(i + 1)
    }

    const blockPartner = (id) => {
        // console.log(id)
        // setGetDataComplete(false)
        // axios.delete(`${API_DELETE_TOUR}/${id}`).then(() => setGetDataComplete(true)).catch((e) => console.log(e))
    }

    console.log(partners)

    return (
        <div>
            <div className='d-flex tool-list-service-main'>
                <div className='d-flex list-service-tool'>
                    <label htmlFor='search-name' className='search-input-text'>
                        <AiOutlineSearch className='icon-inner icon-search-list-service' />
                        <input value={searchName} placeholder={table.txtEnterName} onChange={(e) => setSearchName(e.target.value)} id='search-name' type='text' className='input-inline input-list-service search-name-service input-inline-list-service' />
                    </label>
                </div>
            </div>
            <div className='space-table'>
                <table className='table table-hover table-list-service mt-30 table-striped'>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>{table.txtAccountEmail}</td>
                            <td>{table.txtCompanyName}</td>
                            <td>{table.txtCompanyAddress}</td>
                            <td>{table.txtStatus}</td>
                            <td>{table.txtAction}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {[...partners].map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.email}</td>
                                <td>{item.companyName}</td>
                                <td>{item.addressCompany}, {item.cityCompany}</td>
                                <td>{item.isBlock ? <label className='status status-close'>{table.txtBlocked}</label> :
                                    <label className='status status-active'>{table.txtActive}</label>}</td>
                                <td>
                                    <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                        <MenuItem onClick={() => navigate('/admin/view-detail-partner', { state: { id: item.accountId } })}>
                                            <HiOutlineEye /> {table.txtView}
                                        </MenuItem>
                                        {!item.isBlock && <MenuItem onClick={() => blockPartner(item.accountId)}>
                                            <AiOutlineDelete /> {table.txtBlock}
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
        </div>
    )
}

export default memo(ListParner)