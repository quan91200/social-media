
import style from './modal.scss'
import CloseIcon from '@mui/icons-material/Close'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import { Link } from "react-router-dom"
import Comments from "../comments/Comments"
import { useState } from "react"
import moment from "moment"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import classNames from "classnames/bind"
const cx = classNames.bind(style)

const ModalPost = ({ setOpen, post }) => {
    const handleClose = () => {
        setOpen(prev => !prev)
    }
    const [commentOpen, setCommentOpen] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const { isLoading, data } = useQuery(["likes", post.id], () =>
        makeRequest.get("/likes?postId=" + post.id).then((res) => {
            return res.data
        })
    )
    const queryClient = useQueryClient()
    const mutation = useMutation(
        (liked) => {
            if (liked) return makeRequest.delete("/likes?postId=" + post.id)
            return makeRequest.post("/likes", { postId: post.id })
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["likes"])
            },
        }
    )
    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.id))
    }
    const createdAt = moment(post.createdAt)
    const now = moment()
    const isLessThan24Hours = now.diff(createdAt, 'hours') < 24
    return (
        <div onClose={handleClose} open={true} className={cx("wrapperModal")}>
            <div className={cx("post")}>
                <div className={cx("container")}>
                    <div className={cx("user")}>
                        <div className={cx("userInfo")}>
                            <img src={"/upload/" + post.profilePic} alt="" />
                            <div className={cx("details")}>
                                <Link
                                    to={`/profile/${post.userId}`}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <span className={cx("name")}>{post.name}</span>
                                </Link>
                                <span className={cx("date")}>
                                    {isLessThan24Hours
                                        ? createdAt.fromNow()
                                        : createdAt.format("DD-MM-YYYY")}
                                </span>
                            </div>
                        </div>
                        <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
                    </div>
                    <div className={cx("content")}>
                        <p>{post.desc}</p>
                        <img
                            className={cx('imgContent')}
                            src={"/upload/" + post.img}
                            alt=""
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                    <div className={cx("info-item")}>
                        <div className={cx("item")}>
                            {isLoading ?
                                "loading"
                                : data.includes(currentUser.id) ? (
                                    <FavoriteOutlinedIcon
                                        style={{ color: "red" }}
                                        onClick={handleLike}
                                        className="like"
                                    />
                                ) : (
                                    <FavoriteBorderOutlinedIcon onClick={handleLike} />
                                )}
                            {data?.length} Likes
                        </div>
                        <div className={cx("item")} onClick={() => setCommentOpen(!commentOpen)}>
                            <TextsmsOutlinedIcon />
                            See Comments
                        </div>
                        <div className={cx("item")}>
                            <ShareOutlinedIcon />
                            Share
                        </div>
                    </div>
                    {commentOpen && <Comments postId={post.id} />}
                </div>
            </div>
        </div>
    )
}

export default ModalPost