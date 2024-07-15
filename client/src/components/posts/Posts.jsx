import Post from "../post/Post";
import style from "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { LoadPost } from "../loader/Loading";
import classNames from "classnames/bind";

const cx = classNames.bind(style)

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className={cx("posts")}>
      {error
        ? "Something went wrong!"
        : isLoading
          ? (
            <div className={cx("load")}>
              <LoadPost />
            </div>
          )
          : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
