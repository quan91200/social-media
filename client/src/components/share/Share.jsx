import style from "./share.scss"
import Image from "../../assets/img.png"
import Map from "../../assets/map.png"
import Friend from "../../assets/friend.png"

import { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { BtnClose, BtnShare } from '../button/button'
import { toast } from "react-toastify"

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PinDropIcon from '@mui/icons-material/PinDrop';

import classNames from "classnames/bind"

const cx = classNames.bind(style)
const Share = () => {
  const { currentUser } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(preState => !preState)
  }
  return (
    <div className={cx("share")}>
      <div className={cx("container")}>
        <div className={cx("top")}>
          <div className={cx("left")}>
            <img src={"/upload/" + currentUser.profilePic} alt="" className={cx("avt")} />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onClick={handleClick}
              className={cx("content")}
            />
            {isOpen && (
              <ModalShare isOpen={isOpen} setIsOpen={setIsOpen} />
            )}
          </div>
        </div>
        <hr />
        <div className={cx("bottom")}>
          <label htmlFor="file">
            <div className={cx("item")} onClick={handleClick}>
              <img src={Image} alt="" />
              <span>Add Image</span>
            </div>
          </label>
          <div className={cx("item")} onClick={handleClick}>
            <img src={Map} alt="" />
            <span>Add Place</span>
          </div>
          <div className={cx("item")} onClick={handleClick}>
            <img src={Friend} alt="" />
            <span>Tag Friends</span>
          </div>
        </div>
      </div>
    </div>

  )
}

const ModalShare = ({ setIsOpen }) => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault()
    let imgUrl = ""
    if (file) imgUrl = await upload()
    mutation.mutate({ desc, img: imgUrl })
    setDesc("")
    setFile(null)
    toast.success('Successful!')
    setIsOpen(false)
  }

  return (
    <div className={cx("modal")}>
      <div className={cx("container")}>
        <div className={cx("wrapper")}>
          <div className={cx("header-modal")}>
            <div className={cx("top-header")}>
              <div className={cx("create")}>
                <h2>Create post</h2>
              </div>
              <div className={cx("btn-close")}>
                <div onClick={() => setIsOpen(false)}>
                  <BtnClose />
                </div>
              </div>
            </div>
            <div className={cx("bottom-header")}>
              <img src={"/upload/" + currentUser.profilePic} alt="" className={cx("avt")} />
              <div className={cx("name-user")}>
                <p>{currentUser.name}</p>
                <div className={cx("icon")}>
                  Public
                </div>
              </div>
            </div>
          </div>
          <div className={cx("mid-modal")}>
            <div className={cx("content-content")}>
              <textarea
                className={cx("text")}
                name="textarea" id="textarea" rows="5" cols="50"
                placeholder={`What's on your mind ${currentUser.name}?`}
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
              <div className={cx("file")}>
                {file && (
                  <img className={cx("fileImg")} alt="" src={URL.createObjectURL(file)} />
                )}
              </div>
            </div>
          </div>
          <div className={cx("modal-bottom")}>
            <div className={cx("left")}>
              <div className={cx("add")}>Add to your post</div>
              <div className={cx("choose")}>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="file">
                  <div className={cx("modal-item")}>
                    <AddPhotoAlternateIcon style={{ color: "green", fontSize: "35px" }} />
                  </div>
                </label>
                <div className={cx("modal-item")}>
                  <PersonPinIcon style={{ color: "blue", fontSize: "35px" }} />
                </div>
                <div className={cx("modal-item")}>
                  <InsertEmoticonIcon style={{ color: "rgb(235, 235, 90)", fontSize: "35px" }} />
                </div>
                <div className={cx("modal-item")}>
                  <PinDropIcon style={{ color: "red", fontSize: "35px" }} />
                </div>
              </div>
            </div>
            <div onClick={handleClick}>
              <BtnShare />
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share;
