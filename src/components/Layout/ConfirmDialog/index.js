import { memo } from 'react'
import './ConfirmDialog.scss'

function ConfirmDialog({ title, content, callback }) {
    return (
        <div className='confirm-dialog'>
            <div></div>
        </div>
    )
}

export default memo(ConfirmDialog)