import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Post from "../post/Post";
import "./posts.css";




export default function Posts() {
  const [Posts,setPosts]=useState([])
  const { search } = useLocation()
  const param = useParams()
  console.log("Search",search)
  console.log("Params",param)
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/get");
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  console.log(Posts)
  return (
    <div className="posts">
      {
        Posts.map((post)=>{
          return <Post post={post}/>
        })
      }
      
    </div>
  );
}
