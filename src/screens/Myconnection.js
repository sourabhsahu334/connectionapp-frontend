import React, { useEffect,useState } from "react";
import { useMediaQuery } from "@mui/material";
import "../App.css";
import BadgeIcon from '@mui/icons-material/Badge';
import axios from "axios";
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Myconnection() {
  const [alluser,setalluser]=useState([]);
  const [myconnections,setmyconnection]=useState();
  const [userdata,setuserdata]=useState();
  const [friendsid,setfriendid]=useState()

  const connect=async(id)=>{
  try {
    const user =   localStorage.getItem('user');
  const json= JSON.parse(user);

 const {data}= await axios.put("https://mobilikbackend.onrender.com/api/v1/addconnection",{freindid:id,id:json.user._id});
 console.log(data);
 setuserdata(data);
 localStorage.setItem('user',JSON.stringify(data));

  } catch (error) {
    alert(error.message)
  }
  }

  useEffect(()=>{
    const data = localStorage.getItem('user');
    const json= JSON.parse(data);
    setuserdata(json);
    const list = json.user.friends.map(item=>item.id);
    console.log(list);
    setfriendid(list);
  },[])

  useEffect(()=>{
  const fetch = async()=>{
    const user =   localStorage.getItem('user');
    const json= JSON.parse(user);
    console.log(json);
    const newarray = json.user.friends.map((item)=>{
      return item.id
    })
   try {
    const {data}= await axios.get("https://mobilikbackend.onrender.com/api/v1/all",);
 
   
    const data2= await axios.get("https://mobilikbackend.onrender.com/api/v1/myconnections",{params:{idarray:newarray}});
    console.log(data2.data);
    setmyconnection(data2.data.users);
    setalluser(data.users);
   } catch (error) {
    console.log(error)
   }
  } 
  fetch();
  },[userdata])
  const isMobile = useMediaQuery("(max-width:600px)");

  const styles = {
    userbox: {
      width: isMobile ? "360px" : "300px",
      height: isMobile ? "120px" : "150px",

      marginTop: "30px",

      borderWidth: "1.5px",
      display: "flex",
      padding: "20px",
      display:"flex",
      justifyContent:"space-between",
      borderWidth: "2px",
      borderColor: "rgba(0,0,0,.3)",
      borderStyle: "solid",
      borderRadius: "10px",
    },
    tex1: {
        fontSize: "13px",
        color: "black",
        width:"150px",
        
        padding: 0,
        margin:0
      },
      tex2: {
        fontSize: "13px",
        color: "rgba(0,0,0,0.6)",
        padding: 0,
        margin:0,
        width:"150px",
      },
      connectiondiv:{
        width:"150px",
    height:"25px",
borderRadius:"15px",
backgroundColor:"#bab6eb",  
cursor:"pointer"    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <div
        style={{
          height: "80px",
          backgroundColor: "#27317b",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h3 style={{ paddingTop: "20px", color: "white" }}>My Connection</h3>
      </div>
      <div
        style={{
          display: isMobile?"flex": 'grid',
          flexDirection:"column",
    gridTemplateColumns:!isMobile&& 'repeat(3, 1fr)', // Three columns with equal width
    gap: '20px', // Gap between grid items
    marginBottom: '20px'
        }}
      >
       
    {myconnections && myconnections.map((item)=>(
      <div
          style={{
            ...styles.userbox,
        
          }}
        >
         <div>
          <p style={{...styles.tex1}}>
            {item.name}
          </p>
          <p style={{...styles.tex2,marginTop:!isMobile&& "5px"}}>
            {item.experience.length!==0 ? item.experience[0].possition:"Student"}<br/>
           <BadgeIcon style={{fontSize:"15px"}}/> {item.experience.length!==0 ? item.experience[0].companyname:"LNCT"}
          </p>
          <div onClick={()=>connect(item._id)} style={{...styles.connectiondiv,marginTop:isMobile?"7px":"25px",width:"150px"}} className="hover-effect">
            <p style={{...styles.tex1,margin:"10px"}}>Remove connection</p>
          </div>
         </div>
         <img src={require("./icon.png")} style={{}}/>
        </div>
    ))}
      </div>
      <p style={{fontSize:"20px",color:"rgba(0,0,0,.7)",marginTop:"40px"}}>People you can also connect</p>
      <div
        style={{
          display: isMobile?"flex": 'grid',
          flexDirection:"column",
    gridTemplateColumns:!isMobile&& 'repeat(3, 1fr)', // Three columns with equal width
    gap: '20px', // Gap between grid items
    marginBottom: '20px'
        }}
      >
       
    {alluser && alluser .filter(item => !friendsid.includes(item._id)).map((item)=>(
      <div
          style={{
            ...styles.userbox,
        
          }}
        >
         <div>
          <p style={{...styles.tex1}}>
            {item.name}
          </p>
          <p style={{...styles.tex2,marginTop:!isMobile&& "5px"}}>
            {item.experience.length!==0 ? item.experience[0].possition:"Student"}<br/>
           <BadgeIcon style={{fontSize:"15px"}}/> {item.experience.length!==0 ? item.experience[0].companyname:"LNCT"}
          </p>
          <div onClick={()=>connect(item._id)} style={{...styles.connectiondiv,marginTop:isMobile?"7px":"25px",width:"100px"}} className="hover-effect">
            <p style={{...styles.tex1,margin:"10px"}}>Connect<AddCircleIcon style={{fontSize:"18px",marginInline:"5px"}}/></p>
          </div>
         </div>
         <img src={require("./icon.png")} style={{}}/>
        </div>
    ))}
      </div>
    </div>
  );
}

export default Myconnection;
