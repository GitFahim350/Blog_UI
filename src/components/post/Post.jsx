import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
  console.log(post)
  return (
    <div className="post">
      <img
        className="postImg"
        //src={}
        alt="img"
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Music
            </Link>
          </span>
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Life
            </Link>
          </span>
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.posttitle}
          </Link>
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
        {post.postdesc}
      </p>
    </div>
  );
}
