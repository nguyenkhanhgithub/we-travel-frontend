import { memo, useContext } from 'react'
import { CommonDataForAllViewService } from '../ViewInformationDetailService'
import { Rating } from 'react-simple-star-rating'

function ViewInformationAccommodation({ languageSelected }) {
    const service = useContext(CommonDataForAllViewService)

    const handleBlur = (input) => {
        input.style.border = 'solid 1px #D9D9D9'
    }

    const handleFocus = (input) => {
        input.style.border = 'solid 1px #4874E8'
    }

    return (
        <>
            <div>
                <div className="d-flex line-input">
                    <div className="w-45">
                        <label htmlFor='roomName' className='d-block'>Property Name<span className="requird-star">*</span></label>
                        <input id='roomName' disabled
                            className='input-inline'
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            value={service.propertyName} />
                    </div>
                    <div className='w-45'>
                        <label htmlFor="status" className="d-block">Status<span className="requird-star">*</span></label>
                        <select id='status' className='input-inline had-input' disabled
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}>
                            <option selected={service.status == 1} value={1}>Active</option>
                            <option selected={service.status == 2} value={2}>Close</option>
                            <option selected={service.status == 3} value={3}>Pause</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="w-45">
                        <label htmlFor='numberOfFloors' className='d-block'>Number of floors</label>
                        <input id='numberOfFloors' className='input-inline' disabled
                            value={service.numberOfFloors}
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)} type='number' min={0} />
                    </div>
                    <div className='w-45'>
                        <label className="d-block">Star rating</label>
                        <Rating className="input-inline star-rating" allowHover={false} readonly initialValue={service.starRating} />
                    </div>
                </div>
                <div className="d-flex line-input line-input-3-line">
                    <div className='w-45'>
                        <label htmlFor="city" className="d-block">City<span className="requird-star">*</span></label>
                        <select id='city' className='input-inline had-input' disabled
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}>
                            <option >{service.city}</option>
                        </select>
                    </div>
                    <div className='w-45'>
                        <label htmlFor="address" className="d-block">Address<span className="requird-star">*</span></label>
                        <input value={service.address} onFocus={(e) => handleFocus(e.target)} disabled
                            onBlur={(e) => handleBlur(e.target)}
                            id='address' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='website' className='d-block'>Website</label>
                        <input value={service.website} disabled
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='website' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='taxCode' className='d-block'>Tax code<span className="requird-star">*</span></label>
                        <input value={service.taxCode} disabled
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='taxCode' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='description' className='d-block'>Description</label>
                        <textarea rows="4" id='description' className='input-inline' disabled
                            value={service.description}
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)} />
                    </div>
                </div>
            </div>
            <div>
                <label className='title'>Contact</label>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='phone' className='d-block'>Phone number<span className="requird-star">*</span></label>
                        <input value={service.phoneNumberContact} disabled
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='phone' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='phone' className='d-block'>Fax</label>
                        <input value={service.fax} onFocus={(e) => handleFocus(e.target)} disabled
                            onBlur={(e) => handleBlur(e.target)}
                            id='phone' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='email' className='d-block'>Email<span className="requird-star">*</span></label>
                        <input value={service.emailContact} disabled
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='email' className="input-inline" type='text' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(ViewInformationAccommodation)