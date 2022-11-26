import { memo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { english as englishTableCustomer, vietnamese as vietnameseTableCustomer } from '../../Languages/TableListCustomer'
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch, AiOutlineDelete } from 'react-icons/ai'
import { HiOutlineEye } from 'react-icons/hi'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { BsThreeDotsVertical } from 'react-icons/bs'
import axios from 'axios'
import { API_GET_CUSTOMER } from '../../API';

function ListCustomer({ languageSelected }) {
    const navigate = useNavigate()

    const [count, setCount] = useState(0)
    const totlePage = Math.ceil(count / 10)
    const [searchName, setSearchName] = useState('')
    let numberOfPages = []
    const [numberPage, setNumberPage] = useState(1)

    const [customers, setCustomers] = useState([
    ])

    const table = languageSelected === 'EN' ? englishTableCustomer : vietnameseTableCustomer

    useEffect(() => {
        axios.get(API_GET_CUSTOMER, {
            params: {
                page: numberPage,
                size: 10,
            }
        }).then((res) => {
            setCount(res.data.data.totalElements)
            let listCustomerData = []
            for (let i = 0; i < res.data.data.content.length; i++) {
                const listCus = {                    
                    id: res.data.data.content[i].accountId,
                    email: res.data.data.content[i].email,
                    firstName: res.data.data.content[i].firstName,
                    lastName: res.data.data.content[i].lastName,
                    gender: res.data.data.content[i].gender,
                    status: res.data.data.content[i].isBlock
                }
                listCustomerData.push(listCus)
            }
            setCustomers(listCustomerData)
        }).catch((e) => {
        })
    }, [numberPage])

    for (let i = 0; i < totlePage; i++) {
        numberOfPages.push(i + 1)
    }

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
                            <td>{table.txtLoginEmail}</td>
                            <td>{table.txtFirstName}</td>
                            <td>{table.txtLastName}</td>
                            <td>{table.txtGender}</td>
                            <td>{table.txtStatus}</td>
                            <td>{table.txtAction}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {[...customers].map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>
                                    {item.gender === 'Male' && table.txtMale ||
                                        item.gender === 'Female' && table.txtFemale ||
                                        item.gender === 'Other' && table.txtOther
                                    }
                                </td>
                                <td>{item.status ? <label className='status status-close'>{table.txtBlocked}</label> :
                                    <label className='status status-active'>{table.txtActive}</label>}</td>
                                <td>
                                    <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                        <MenuItem onClick={() => navigate('/admin/view-detail-customer', { state: { id: item.id } })}>
                                            <HiOutlineEye /> {table.txtView}
                                        </MenuItem>
                                        {!item.status && <MenuItem>
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

export default memo(ListCustomer)