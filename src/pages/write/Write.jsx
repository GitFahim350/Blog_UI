import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../components/context/context";
import "./write.css";

export default function Write() {
  const [Title, setTitle] = useState("")
  const [Desc, setDesc] = useState("")
  const [File, setFile] = useState(null)
  //const user=useContext(Context)

  const { user } = useContext(Context);
  const handlesubmit = async (e) => {
    e.preventDefault();
   
    if (File) {
      const data =new FormData();
      const filename= Date.now() + File.name;
      data.append("name", filename);
      data.append("file", File);
      console.log("filename",filename)
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}

      try {
        const res = await axios.post("http://localhost:5000/api/posts/create", {
          username: user.username,
          posttitle: Title,
          postdesc: Desc,
          category: ["Music", "Life"],
          photo:filename
        });
        window.location.replace("/post/" + res.data._id);
      } catch (err) { }
    }
    else{
      try {
        const res = await axios.post("http://localhost:5000/api/posts/create", {
          username: user.username,
          posttitle: Title,
          postdesc: Desc,
          category: ["Music", "Life"],
          
        });
        window.location.replace("/post/" + res.data._id);
      } catch (err) { }
    }
   
  }

  return (
    <div className="write">
      
      {
        File && <img
          className="writeImg"
          src={URL.createObjectURL(File)}
          alt=""
        />
      }

      <form className="writeForm" onSubmit={handlesubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>

          <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e) => {
            //console.log("Hello")
            setFile(e.target.files[0])
          }} />

          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            onChange={(e) => {
              setDesc(e.target.value)
            }}
            autoFocus={true}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
