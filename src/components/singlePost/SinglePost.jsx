import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./singlePost.css";

export default function SinglePost() {

  const postid=useParams()
  const[Post,setPost]=useState()
   
  const { search } = useLocation()

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/get/" + postid.id);
      setPost(res.data);
      
    };
    getPost();
  }, [search]);
   
  

  console.log(Post)
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <h1 className="singlePostTitle">
          {Post&&Post.posttitle}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
                {Post&&Post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(Post&&Post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {Post&&Post.postdesc}
        </p>
      </div>
    </div>
  );
}
