import { useContext, useState } from "react";
import styles from "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { BtnDelete, BtnSend } from '../button/button'
import { toast } from "react-toastify";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId })
    setDesc("")
  }

  const deleteMutation = useMutation(
    (commentId) => {
      return makeRequest.delete("/comments/" + commentId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"])
        toast.error("Comment deleted successfully!")

      },
      onError: (error) => {
        toast.error("Failed to delete comment: " + error.message);
      }
    }
  )

  const handleDelete = (commentId) => {
    deleteMutation.mutate(commentId)
  }

  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={cx("comments")}>
      <div className={cx("write")}>
        <img src={"/upload/" + currentUser.profilePic} alt="" className={cx("imgAvt")} />
        <input
          type="text"
          placeholder="write a comment ..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div onClick={handleClick}>
          <BtnSend />
        </div>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
          ? "loading"
          : data.map((comment) => (
            <div className={cx("comment")} key={comment.id}>
              <img src={"/upload/" + comment.profilePic} alt="" className={cx("imgAvt")} />
              <div className={cx("info")}>
                <div className={cx("content")}>
                  <span className={cx("user")}>{comment.name}</span>
                  <p>{comment.desc}</p>
                </div>
                <p className={cx("dateComment")}>
                  {moment().diff(moment(comment.createdAt).fromNow(), 'hours') < 24
                    ? (
                      moment(comment.createdAt).fromNow()
                    ) : (
                      moment(comment.createdAt).format("DD-MM-YYYY")
                    )}

                </p>
              </div>
              <MoreHorizIcon className={("btnH")} onClick={handleOpen} />
              {isOpen && (
                <span className={("btn")} onClick={() => handleDelete(comment.id)}>
                  <BtnDelete />
                </span>
              )}
            </div>
          ))}
    </div>
  )
}

export default Comments;