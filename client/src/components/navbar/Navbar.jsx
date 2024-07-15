import style from "./navbar.scss"

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined"
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import HomeIcon from '@mui/icons-material/Home'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import GroupIcon from '@mui/icons-material/Group'

import Badge from '@mui/material/Badge'

import { Link, useLocation } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { DarkModeContext } from "../../context/darkModeContext"
import { AuthContext } from "../../context/authContext"

import classNames from "classnames/bind"
const cx = classNames.bind(style)

const Navbar = () => {
  const location = useLocation()

  const [activePath, setActivePath] = useState("/")

  useEffect(() => {
    setActivePath(location.pathname)
  }, [location.pathname])

  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const [isState, setIsState] = useState(false)


  const handleClick = () => {
    setIsState(prevState => !prevState)
  }

  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)

  notifications.length = 2

  const handleRead = () => {
    setNotifications([])
    setOpen(prevState => !prevState)
  }

  return (
    <div className={cx("navbar")}>
      <div className={cx("left")}>
        <span>cobham</span>
        <div className={cx("search")}>
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className={cx("center")}>
        {activePath === "/"
          ?
          <Link
            className={cx("active")}
            to="/" style={{ textDecoration: "none" }}>
            <HomeIcon />
          </Link>
          :
          <Link
            className={cx("not-active")}
            to="/" style={{ textDecoration: "none" }}>
            <HomeOutlinedIcon />
          </Link>
        }
        {activePath === "/dashboard"
          ?
          <Link
            className={cx("active")}
            to="/dashboard" style={{ textDecoration: "none" }}>
            <DashboardIcon />
          </Link>
          :
          <Link
            className={cx("not-active")}
            to="/" style={{ textDecoration: "none" }}>
            <GridViewOutlinedIcon />
          </Link>
        }
        {activePath === "/music"
          ?
          <Link
            className={cx("active")}
            to="/music" style={{ textDecoration: "none" }}>
            <PlayCircleIcon />
          </Link>
          :
          <Link
            className={cx("not-active")}
            to="/" style={{ textDecoration: "none" }}>
            <PlayCircleOutlineIcon />
          </Link>
        }
        {activePath === "/group"
          ?
          <Link
            className={cx("active")}
            to="/group" style={{ textDecoration: "none" }}>
            <GroupIcon />
          </Link>
          :
          <Link
            className={cx("not-active")}
            to="/" style={{ textDecoration: "none" }}>
            <PeopleOutlineIcon />
          </Link>
        }
      </div>
      <div className={cx("right")}>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} className={cx("btnNav")} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} className={cx("btnNav")} />
        )}
        <div onClick={() => setOpen(!open)}>
          <Badge badgeContent={notifications.length} color="primary" className={cx("btnNav")}>
            <NotificationsOutlinedIcon />
          </Badge>
          {open && (
            <div className={cx("notifications")}>
              <div className={cx("head")}>
                <h6>Notifications</h6>
                <button onClick={handleRead}>Mark as read</button>
              </div>
            </div>
          )}
        </div>
        <div className="user" onClick={handleClick}>
          <img
            src={"/upload/" + currentUser.profilePic}
            alt=""
          />
        </div>
        {
          isState && (
            <div
              className={cx("settings")}
              onMouseLeave={() => setIsState(false)}
            >
              <div>
                <Link to={`/profile/${currentUser.id}`}
                  className={cx("user")}
                >
                  <span>Profile</span>
                </Link>
              </div>
              <div>
                <Link className={cx("user")} to='/logout'>
                  Logout
                </Link>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
