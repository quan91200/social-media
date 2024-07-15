import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"

const Home = () => {
  return (
    <div className="home">
      <div className="main">
        <Stories />
        <Share />
        <Posts />
      </div>
    </div>
  )
}

export default Home