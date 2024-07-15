import styles from "./profile.scss"

import Posts from "../../components/posts/Posts"

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import { useContext, useState } from "react"

import { makeRequest } from "../../axios"
import { AuthContext } from "../../context/authContext"
import Update from "../../components/update/Update"
import { BtnUpdate } from "../../components/button/button"

import InstagramIcon from '@mui/icons-material/Instagram'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'

import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className={cx("profile")}>
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className={cx("images")}>
            <img src={"/upload/" + data.coverPic} alt="" className={cx("cover")} />
          </div>
          <div className={cx("container")}>
            <div className={cx("profileContainer")}>
              <div className={cx("info")}>
                <div className={cx("avt")}>
                  <img src={"/upload/" + data.profilePic} alt="" className={cx("profilePic")} />
                </div>
                <div className={cx("center")}>
                  <div className={cx("h3")}>
                    <h3>{data.name}</h3>
                  </div>
                  <div className={cx("social")}>
                    <InstagramIcon className={cx("icon ins")} />
                    <LinkedInIcon className={cx("icon linked")} />
                    <YouTubeIcon className={cx("icon ytb")} />
                    <GitHubIcon className={cx("icon git")} />
                  </div>
                </div>
                <div className={cx("btnUpdate")}>
                  {rIsLoading ? (
                    "loading"
                  ) : userId === currentUser.id ? (
                    <div onClick={() => setOpenUpdate(true)} >
                      <BtnUpdate />
                    </div>
                  ) : (
                    <button onClick={handleFollow} className={cx("follow")}>
                      {relationshipData.includes(currentUser.id)
                        ? "Following"
                        : "Follow"}
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className={cx("postContainer")}>
              <main>
                <div className={cx("information")}>
                  <div className={cx("panel")}>
                    <h4>Intro</h4>
                    <div>
                      <p>From: {data.city}</p>
                      <p>Social: {data.website}</p>
                    </div>
                  </div>
                  <div className={cx("panel")}>
                    <h4>Photos</h4>
                    <div className={cx("photos")}>
                      <div className="wrapImg">
                        <img src={"/upload/" + data.coverPic} alt="" className={cx("photoS")} />
                      </div>
                      <div className="wrapImg">
                        <img src={"/upload/" + data.profilePic} alt="" className={cx("photoS")} />
                      </div>
                    </div>
                  </div>
                </div>
                <Posts userId={userId} />
              </main>
            </div>
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
