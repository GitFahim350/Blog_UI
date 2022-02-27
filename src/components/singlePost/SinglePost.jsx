import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../context/context";
import "./singlePost.css";

export default function SinglePost() {

  const postid = useParams()
  const [Post, setPost] = useState()
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [Isupdate, setIsupdate] = useState()
  const { user } = useContext(Context)

  const { search } = useLocation()
  const PF = "http://localhost:5000/images/";
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/get/" + postid.id);
      setPost(res.data);

    };
    getPost();
  }, [search]);

  const handleupdateclick = async (e) => {

    try {
      await axios.put(`http://localhost:5000/api/posts/update/${postid.id}`, {
        username: user.username,
        posttitle: title,
        postdesc: desc,
      });
      setIsupdate(false)
    } catch (err) { }
  }



  const handledeleteclick = async (e) => {
    try {
      await axios.delete("http://localhost:5000/api/posts/delete/" + Post._id, { data: { username: user.username } })
      window.location.replace("/")
    } catch (error) { }
  }

  Post && console.log(Post.postdesc)
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {Post&&Post.photo && (
          <img src={PF + Post.photo} alt="" className="singlePostImg" />
        )}
        {Isupdate ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {Post&&Post.posttitle}
            {Post&&Post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setIsupdate(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handledeleteclick}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            {Post&&<Link to={`/?user=${Post.username}`} className="link">
              <b> {Post.username}</b>
            </Link>}
          </span>
          {Post&&<span className="singlePostDate">
            {new Date(Post.createdAt).toDateString()}
          </span>}
        </div>
        {Isupdate ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc"></p>
        )}
        {!Isupdate&&<p className="singlePostDesc">{Post&&Post.postdesc}</p>}
        
        {Isupdate && (
          <button className="singlePostButton" onClick={handleupdateclick}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
