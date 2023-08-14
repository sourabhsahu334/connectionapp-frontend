import React, { useState, setEffect, useEffect } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Button from "@mui/material/Button";
import axios from "axios";

import "../App.css";
import { useMediaQuery } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CircularProgress from '@mui/material/CircularProgress';
function Home() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [questions, setQuestion] = useState([]);
  const [input, setinput] = useState();
  const [userdata, setuserdata] = useState();
  const [loading,setLoading]=useState(false);
  const [user, setuser] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setnumber] = useState();
  const [about, setabout] = useState();
  const [skills, setskills] = useState();
  const [professionalDetails, setprofessional] = useState();
  const [experince, setexperice] = useState();
  const [skilllist, setskilllist] = useState([]);
  const [experiencelist, setexperiencelist] = useState([]);
  const [companyname, setcompanyname] = useState();
  const [startdate, setstrartdate] = useState(new Date());
  const [enddate, setendate] = useState(new Date());
  const [possition, setpossition] = useState();
  const [editstatus,setEditStatus]=useState();
  const addskilles=()=>{
    setskilllist([...skilllist,skills]);
    setskills("");
    console.log(skilllist)
  
  }
  const removeskillls=(ind)=>{
    const newArray = skilllist.filter((_, index) => index !==ind );
    setskilllist(newArray);


  }
  const addexperience=()=>{
    const obj = {
      // startdate:startdate.toLocalString(),
      // enddate:enddate.toLocalString(),
      companyname:companyname,
      possition:possition


    }
    setexperiencelist([...experiencelist,obj])
  }
  const removesexperience=(ind)=>{
    const newArray = experiencelist.filter((_, index) => index !==ind );
    setexperiencelist(newArray);


  }

  React.useEffect(() => {
    const data = localStorage.getItem("user");
  if( data){
    const json = JSON.parse(data);
    console.log(json.user);
    setuser(json);
    setUsername(json.user.name);
    setnumber(json.user.number);
    setEmail(json.user.email);
    setabout(json.user.about);
    setskilllist(json.user.skills);
    setexperiencelist(json.user.experience);
    setprofessional(json.user.professionalDetails)
   
  }
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("user");
    const userdata1 = JSON.parse(data);
    setuserdata(userdata1);
    console.log(userdata1.user._id);
  }, []);

  const addformsinmongo = () => {
    axios
      .post("https://mobilikbackend.onrender.com/api/v1/addquestion", {
        id: userdata.user._id,
        questions: questions,
      })
      .then((response) => {
        alert(response.data.message + " " + "Your Forms in Forms Pannel");
        setQuestion([]);
        setinput("");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const styles = {
    icon: {
      height: "100px",
      width: "100px",
      borderRadius: "50px",
    },
    box: {
      width: "100%",
      backgroundColor: "white",
      height: "120px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    tex1: {
      fontSize: "15px",
      color: "black",

      padding: 0,
    },
    tex2: {
      fontSize: "15px",
      color: "rgba(0,0,0,0.6)",
      padding: 0,
    },
    fonttex2: {
      fontSize: "12px",
    },
  };

  const updatedata=async()=>{
     alert("Do you want to Update or Save");
     setLoading(true)
    try {
      const {data}=await axios.put("https://mobilikbackend.onrender.com/api/v1/me/update",{
  id:user.user._id,
  name: username,
  email: email,

  number:number,
  professionalDetails:professionalDetails,
  about:about,
  experience:experiencelist,
  skills:skilllist,
});

localStorage.setItem('user',JSON.stringify(data));
setLoading(false)
console.log(data);
    } catch (error) {
      console.log(error);
      alert("Network error");
      setLoading(false)
    }

  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          top: 0,
          height: "150px",
          backgroundColor: "#27317b",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,.9)",
            fontSize: "12.5px",
            paddingLeft: "2%",
          }}
        >
          My Profile
        </p>
      </div>

      <div
        style={{
          height: "100%",
          width: "95%",
          backgroundColor: "white",
          borderRadius: "10px",
          marginTop: "-80px",
        }}
        className="shadow"
      >
        <div
          style={{
            width: "98%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              margin: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="col-md-6 "
          >
            <div style={{ ...styles.box, width: isMobile ? "100%" : "90%" }}>
              <img
                src={require("./icon.png")}
                style={{ ...styles.icon, boxShadow: "0 0 5px rgba(0,0,0,.2)" }}
              />
              <button
                style={{
                  borderRadius: "10px",
                  padding: "5px",
                  height: "30px",
                  borderStyle: "none",
                }}
              >
                <p style={{ fontSize: "15px" }}>Upload Photo</p>
              </button>
            </div>
            <div
              style={{
                width: isMobile ? "100%" : "90%",
                borderRadius: "10px",
                padding: "10px",
              }}
              className={"border shadow"}
            >
              <div style={{ ...styles.box, height: "45px" }}>
                <p style={{ ...styles.tex2, height: "10px" }}>Your Name</p>
              </div>
              <div style={{ ...styles.box, height: "30px" }}>
                <input 
                  onChange={(e)=>setUsername(e.target.value)}
                type="text" value={username} disabled={editstatus!=="username"} style={{ ...styles.tex1,backgroundColor:"white",borderStyle:editstatus=="username"?"solid":"none",width:"100%",padding:"2px",marginRight:"10px" }}></input>
                <button
                onClick={()=>{
                  if(editstatus=="username"){
                    setEditStatus(" ");
                  }
                 else{
                  setEditStatus("username");
                 }
                  }}
                
                  style={{
                    borderRadius: "10px",
                    padding: "5px",
                    height: "30px",
                    borderStyle: "none",
                    paddingInline: "20px",
                    backgroundColor:editstatus=="username"&&"green"
                  }}
                >
                  <p style={{ fontSize: "13px" }}>{editstatus=="username"?"Done":"Edit"}</p>
                </button>
              </div>
              <div style={{ ...styles.box, height: "45px" }}>
                <p style={{ ...styles.tex2, height: "10px" }}>Your Email</p>
              </div>
              <div style={{ ...styles.box, height: "30px" }}>
              <input 
                  onChange={(e)=>setEmail(e.target.value)}
                type="text" value={email} disabled={editstatus!=="email"} style={{ ...styles.tex1,backgroundColor:"white",borderStyle:editstatus=="email"?"solid":"none",width:"100%",padding:"2px",marginRight:"10px" }}></input>
                               <button
                       onClick={()=>{
                  if(editstatus=="email"){
                    setEditStatus(" ");
                  }
                 else{
                  setEditStatus("email");
                 }}}
                  style={{
                    borderRadius: "10px",
                    padding: "5px",
                    height: "30px",
                    borderStyle: "none",
                    paddingInline: "20px",
                    backgroundColor:editstatus=="email"&&"green"
                  }}
                >
                  <p style={{ fontSize: "13px" }}>{editstatus=="email"?"Done":"Edit"}</p>
                </button>
              </div>
              <div style={{ ...styles.box, height: "45px" }}>
                <p style={{ ...styles.tex2, height: "10px" }}>Phone Number</p>
              </div>
              <div style={{ ...styles.box, height: "30px" }}>
              <input 
                  onChange={(e)=>setEmail(e.target.value)}
                type="text" value={number} disabled={editstatus!=="number"} style={{ ...styles.tex1,backgroundColor:"white",borderStyle:editstatus=="number"?"solid":"none",width:"100%",padding:"2px",marginRight:"10px" }}></input>
                             <button
                             onClick={()=>{
                              if(editstatus=="number"){
                                setEditStatus("")
                              }
                              else{
                                setEditStatus("number");
                              }
                             }}
                  style={{
                    borderRadius: "10px",
                    padding: "5px",
                    height: "30px",
                    borderStyle: "none",
                    paddingInline: "20px",
                    backgroundColor:editstatus=="number"&&"green"

                  }}
                >
                  <p style={{ fontSize: "13px" }}>{editstatus=="number"?"Done":"Edit"}</p>
                </button>
              </div>
            </div>
            <div
              style={{
                width: isMobile ? "100%" : "90%",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "20px",
                height:"100%"
              }}
              className={"border shadow"}
            >
              <div style={{ ...styles.box, }}>
                <p style={{ ...styles.tex1, height: "10px",marginTop:"-20px" }}>
                  About{" "}
                  <span style={{ color: "purple" }}>
                    {username}
                  </span>
                </p>
                <button
                onClick={()=>{
                  if(editstatus=="about"){
                    setEditStatus("");
                  }else{
                    setEditStatus("about")
                  }
                }}
                  style={{
                    borderRadius: "10px",
                    marginTop:"-25px",
                    padding: "5px",
                    height: "30px",
                    borderStyle: "none",
                    paddingInline: "20px",
                    backgroundColor:editstatus=="about"&&"green"
                  }}

                >
                  <p style={{ fontSize: "13px" }}>{editstatus=="about"?"Done":"Edit"}</p>
                </button>
              </div>
              <div style={{ ...styles.box, height: "30px" }}>
              <textarea
  onChange={(e) => setabout(e.target.value)}
  value={about}
  disabled={editstatus !== 'about'}
  style={{
    ...styles.tex1,
    backgroundColor: 'white',
    borderStyle: editstatus === 'about' ? 'solid' : 'none',
    width: '100%', // Set the fixed width
    padding: '5px',
    minHeight: '100px', // Minimum height for the textarea
    resize: 'vertical',
    marginBottom:"50px" // Allow vertical resizing
  }}
></textarea>            </div>
            </div>
            <div
            
              style={{
                width: isMobile ? "100%" : "90%",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "20px",
              }}
              className={"border shadow"}
            >
              <div style={{ ...styles.box, height: "45px" }}>
                <p style={{ ...styles.tex1, height: "10px" }}>Skills</p>
                <button
                    onClick={()=>{
                  if(editstatus=="skills"){
                    setEditStatus("");
                  }else{
                    setEditStatus("skills")
                  }
                }}
                  style={{
                    borderRadius: "10px",
                    padding: "5px",
                    height: "30px",
                    borderStyle: "none",
                    paddingInline: "20px",
                    backgroundColor:editstatus=="skills"?"green":""
                  }}
                >
                  <p style={{ fontSize: "13px" }}>{editstatus=="skills"?"Done":"Edit"}</p>
                </button>
              </div>
           {  editstatus=="skills"&& <div style={{display:"flex"}}><input
           value={skills} onChange={(e)=>setskills(e.target.value)} style={{height:"25px"}}/><AddCircleIcon style={{color:"#8fbc8f",cursor:"pointer"}} onClick={addskilles} className="hover-add"/></div>}
              {user &&
                skilllist.map((item,index) => (
                  <p
                
                    style={{
                      padding: 0,
                      margin: 0,
                      height: "20px",
                      fontSize: "13px",
                      ...styles.tex2,
                    }}
                  >
                   {item}
{                 editstatus=="skills"&&  <CancelIcon onClick={()=>removeskillls(index)} style={{fontSize:"18px",marginLeft:"10px"}}/>}
                  </p>
                ))}
            </div>
          </div>
          <div
            style={{
              margin: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: !isMobile && "10px",
              marginLeft: "5px",
            }}
            className="col-md-6"
          >
            <div
              style={{
                width: isMobile ? "100%" : "90%",
                borderRadius: "10px",
                padding: "10px",
                marginTop: isMobile ? "20px" : "-50px",
              }}
              className={"border shadow"}
            >
              <div style={{ ...styles.box, height: "45px" }}>
                <p style={{ ...styles.tex1, height: "10px" }}>
                  Professional Details
                </p>
                <button
                onClick={()=>{
                  if( editstatus=="pro"){
                    setEditStatus("")
                  }else{
                    setEditStatus("pro")
                  }
                }}
                  style={{
                    borderRadius: "10px",
                    padding: "5px",
                    height: "30px",
                    borderStyle: "none",
                    paddingInline: "20px",
                    backgroundColor:editstatus=="pro"&&"green"
                  }}
                >
                  <p style={{ fontSize: "13px" }}>{editstatus=="pro"?"Done":"Edit"}</p>
                </button>
              </div>
              <div style={{ ...styles.box, height: "30px" }}>
              <input 
                  onChange={(e)=>setprofessional(e.target.value)}
                type="text" value={professionalDetails} disabled={editstatus!=="pro"} style={{ ...styles.tex1,backgroundColor:"white",borderStyle:editstatus=="pro"?"solid":"none",width:"100%",padding:"2px",marginRight:"10px" }}></input>
             
                <StarIcon style={{ color: "#92c1fb" }} />
              </div>
            </div>
            <div
              style={{
                width: isMobile ? "100%" : "90%",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              <div style={{ ...styles.box, height: "45px" }}>
                <p style={{ ...styles.tex1, height: "10px" }}>Certifications</p>
                <button
                  style={{
                    borderRadius: "10px",
                    padding: "5px",
                    height: "30px",
                    borderStyle: "none",
                    paddingInline: "20px",
                  }}
                >
                  <p style={{ fontSize: "13px" }}>Edit</p>
                </button>
              </div>
            </div>
            <div
              style={{
                width: isMobile ? "100%" : "90%",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "-10px",
              }}
              className={"border shadow"}
            >
              <div style={{ ...styles.box, height: "45px" }}>
                <p style={{ ...styles.tex1, height: "10px" }}>Python</p>
                <StarIcon style={{ color: "gold" }} />
              </div>
            </div>
            <div
              style={{
                width: isMobile ? "100%" : "90%",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              <div style={{ ...styles.box, height: "45px" }}>
                <p style={{ ...styles.tex1, height: "10px" }}>Experience</p>
                <button
                onClick={()=>{
                  if(editstatus=="ex"){
                    setEditStatus("")
                  }else{
                    setEditStatus("ex")
                  }
                }}
                  style={{
                    borderRadius: "10px",
                    padding: "5px",
                    height: "30px",
                    borderStyle: "none",
                    paddingInline: "20px",
                    backgroundColor:editstatus=="ex"&&"green"
                  }}
                >
                  <p style={{ fontSize: "13px" }}>{editstatus=="ex"?"Done":"Edit"}</p>
                </button>
              </div>
            </div>{" "}
            {user &&
              experiencelist.map((item) => (
                <div
                  style={{
                    width: isMobile ? "100%" : "90%",
                    borderRadius: "10px",
                    padding: "10px",
                    height: "65px",
                  }}
                  className={"border shadow"}
                >
                  <div style={{ ...styles.box, height: "25px" }}>
                    <input style={{ ...styles.tex1, borderStyle:editstatus=="ex"?"":"none",backgroundColor:"white",padding:editstatus=="ex"&&"3px" }}
                    disabled={editstatus!=="ex"}
                    value=  {item.possition}>
                    
                    </input>
                  </div>
                  <div style={{ ...styles.box, height: "30px" }}>
                  <input style={{ ...styles.tex2, borderStyle:editstatus=="ex"?"":"none",backgroundColor:"white",padding:editstatus=="ex"&&"3px" }}
                    disabled={editstatus!=="ex"}
                    value=  {item.companyname}
                    onChange={(e)=>setcompanyname(e.target.value)}>
                    
                    </input>                  
                    <input style={{ ...styles.tex2, borderStyle:editstatus=="ex"?"":"none",backgroundColor:"white",padding:editstatus=="ex"&&"3px",textAlign:"right",width:"100px" }}
                    disabled={editstatus!=="ex"}
                    value=  {item.companyname}
                    onChange={(e)=>setcompanyname(e.target.value)}>
                    
                    </input>                  </div>
                </div>
              ))}
            <div
              style={{
                width: isMobile ? "100%" : "90%",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              <div style={{ ...styles.box, height: "45px" }}>
                <p style={{ ...styles.tex1, height: "10px" }}>Education</p>
                <button
                  style={{
                    borderRadius: "10px",
                    padding: "5px",
                    height: "30px",
                    borderStyle: "none",
                    paddingInline: "20px",
                  }}
                >
                  <p style={{ fontSize: "13px" }}>edit</p>
                </button>
              </div>
            </div>{" "}
            {user &&
              user.user.education.map((item) => (
                <div
                  style={{
                    width: isMobile ? "100%" : "90%",
                    borderRadius: "10px",
                    padding: "10px",
                    height: "165px",
                  }}
                  className={"border shadow"}
                >
                  <div style={{ ...styles.box, height: "25px" }}>
                    <p style={{ ...styles.tex1, height: "10px", color: "purple"  }}>
                      {item.name}
                    </p>
                  </div>
                  <p style={{ ...styles.tex2 }}>{item.startyear}-{item.endyear}</p>
                    <p style={{ ...styles.tex2,width: "300px", wordWrap: "break-word" }}>{item.description}</p>
                  <div style={{ ...styles.box, height: "50px",flexDirection:"row" }}>

                  </div>
                </div>
              ))}
          </div>
        </div>
        <button onClick={updatedata} style={{marginLeft:"45%",marginTop:"20px",marginBottom:"20px",backgroundColor:"rgba(135,275,12,112)",padding:"2px",borderRadius:"7px"}}>{loading?<CircularProgress/>:'Save'}</button>
      </div>
    </div>
  );
}

export default Home;
