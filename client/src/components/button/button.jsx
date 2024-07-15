import button from './button.scss'
import SendIcon from '@mui/icons-material/Send';
import classNames from 'classnames/bind';

const cx = classNames.bind(button)

export const BtnUpload = () => {
    return (
        <button className={cx("btn upload")}>
            Upload
        </button>
    )
}

export const BtnUpdate = () => {
    return (
        <button className={cx("btn upload")}>
            Update
        </button>
    )
}

export const BtnShare = () => {
    return (
        <div className={cx("btnShare")}>
            Post
        </div>
    )
}

export const BtnClose = () => {
    return (
        <button className={cx("btn close")}>
            Close
        </button>
    )
}

export const BtnSend = () => {
    return (
        <button className={cx("btn send")}>
            <SendIcon />
        </button>
    )
}

export const BtnDelete = () => {
    return (
        <button className={cx("btn delete")}>
            Delete
        </button>
    )
}
