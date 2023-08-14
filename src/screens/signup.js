import React, { useState } from "react";
import { RiLockPasswordLine, RiUserLine } from "react-icons/ri";
import { GrLogin } from "react-icons/gr";

import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMediaQuery } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DatePicker from "react-datepicker";
import CircularProgress from '@mui/material/CircularProgress';

import "react-datepicker/dist/react-datepicker.css";

const SignUpForm = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [number, setnumber] = useState();
  const [about, setabout] = useState();
  const [skills, setskills] = useState();
  const [professionalDetails, setprofessional] = useState();
  const [experince, setexperice] = useState();
  const navigate = useNavigate();
  const [skilllist, setskilllist] = useState([]);
  const [experiencelist, setexperiencelist] = useState([]);
  const [companyname, setcompanyname] = useState();
  const [startdate, setstrartdate] = useState(new Date());
  const [enddate, setendate] = useState(new Date());
  const [possition, setpossition] = useState();
  const [education, seteducation] = useState([]);
  const [institutename, setintitutename] = useState();
  const [educationdescription, seteducationdescription] = useState();
  const [startyear, setstartyear] = useState();
  const [endyear, setendyear] = useState();
  const [loading,setLoading]=useState(false)

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    if (
      username == "" ||
      email == "" ||
      number == "" ||
      professionalDetails == "" ||
      about == "" ||
      experiencelist == "" ||
      skilllist == ""
    ) {
      return alert("Fill all Details");
    }
    try {
      setLoading(true)
      const { data } = await axios.post(
        "https://mobilikbackend.onrender.com/api/v1/register",
        {
          name: username,
          email: email,
          password: password,
          number: number,
          professionalDetails: professionalDetails,
          about: about,
          experience: experiencelist,
          skills: skilllist,
          education:education
        }
      );

      if (data) {
        if (data.success !== true) {
          alert("alerady registered");
          setLoading(false)
          console.log(data);
        } else {
          const userdata = JSON.stringify(data);
          localStorage.setItem("user", userdata);
          setLoading(false)
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false)
      alert(error.message);
    }
  };
  const addskilles = () => {
    setskilllist([...skilllist, skills]);
    setskills("");
    console.log(skilllist);
  };
  const removeskillls = (ind) => {
    const newArray = skilllist.filter((_, index) => index !== ind);
    setskilllist(newArray);
  };
  const addexperience = () => {
    const obj = {
      // startdate:startdate.toLocalString(),
      // enddate:enddate.toLocalString(),
      companyname: companyname,
      possition: possition,
    };
    setexperiencelist([...experiencelist, obj]);
    setcompanyname("");
    setpossition("");
  };
  const removesexperience = (ind) => {
    const newArray = experiencelist.filter((_, index) => index !== ind);
    setexperiencelist(newArray);
  };
  const addexducation = () => {
    const obj = {
      name: institutename,
      description: educationdescription,
      startyear: startyear,
      endyear: endyear,
    };
    seteducation([...education, obj]);
    setintitutename("");
    seteducationdescription("");
    setstartyear("");
    setendyear("")
  };
  const removeeduction = (ind) => {
    const newArray = education.filter((_, index) => index !== ind);
    seteducation(newArray);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          padding: "20px",
          borderRadius: "8px",
          background: isMobile ? "none" : "#fff",
          boxShadow: !isMobile && "0px 3px 6px rgba(0, 0, 0, 0.16)",
          width: isMobile ? "100%" : "600px",
          height: "100%",
        }}
      >
        <p style={{ marginBottom: "20px", fontsize: "20px" }}>Register Form</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <RiUserLine size={20} style={{ marginRight: "10px" }} />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            style={{ padding: "8px", borderRadius: "4px", border: "none" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <EmailIcon fontsize={20} style={{ marginRight: "10px" }} />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "none" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <RiLockPasswordLine size={20} style={{ marginRight: "10px" }} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            style={{ padding: "8px", borderRadius: "4px", border: "none" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <RiLockPasswordLine size={20} style={{ marginRight: "10px" }} />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => {
              setconfirmpassword(e.target.value);
            }}
            style={{ padding: "8px", borderRadius: "4px", border: "none" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <RiUserLine size={20} style={{ marginRight: "10px" }} />
          <input
            type="text"
            placeholder="Phone number"
            value={number}
            onChange={(e) => setnumber(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "none" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <RiUserLine size={20} style={{ marginRight: "10px" }} />
          <input
            type="text"
            placeholder="Professional Details"
            value={professionalDetails}
            onChange={(e) => setprofessional(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "none" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <RiUserLine size={20} style={{ marginRight: "10px" }} />
          <input
            type="text"
            placeholder="About"
            value={about}
            onChange={(e) => setabout(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "none",
              width: "100%",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <RiUserLine size={20} style={{ marginRight: "10px" }} />
            <input
              type="text"
              placeholder="Skills"
              value={skills}
              onChange={(e) => setskills(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "none",
                height: "30px",
              }}
            />
            <AddCircleIcon
              style={{ cursor: "pointer", marginRight: "20px" }}
              onClick={addskilles}
            />
          </div>
          <div>
            {skilllist.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontSize: "12px" }}>{item}</p>
                <CancelIcon
                  style={{ fontSize: "20px", marginLeft: "5px" }}
                  onClick={() => {
                    removeskillls(index);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <label style={{ marginTop: "10px" }}>Experience</label>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <RiUserLine size={20} style={{ marginRight: "10px" }} />
            <input
              type="text"
              placeholder="Company name"
              value={companyname}
              onChange={(e) => setcompanyname(e.target.value)}
              style={{ padding: "8px", borderRadius: "4px", border: "none" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <RiUserLine size={20} style={{ marginRight: "10px" }} />
            <input
              type="text"
              placeholder="Possition"
              value={possition}
              onChange={(e) => setpossition(e.target.value)}
              style={{ padding: "8px", borderRadius: "4px", border: "none" }}
            />
            <AddCircleIcon
              style={{ cursor: "pointer", marginRight: "20px" }}
              onClick={addexperience}
            />
          </div>
        </div>

        <div>
          {experiencelist.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "row", fontsize: "8px" }}
            >
              <p style={{ width: "100%", fontSize: "12px" }}>
                {index + 1}
                {"   "}
                {item.companyname}
                {"   "}
                {item.possition}
              </p>
              <CancelIcon
                onClick={() => {
                  removesexperience(index);
                }}
              />
            </div>
          ))}
        </div>
        <label style={{ marginTop: "10px" }}>Education</label>
        <div
          style={{
            display: "flex",
            flexDirection:  "column" ,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <RiUserLine size={20} style={{ marginRight: "10px" }} />
            <input
              type="text"
              placeholder="Instiute Name"
              value={institutename}
              onChange={(e) => setintitutename(e.target.value)}
              style={{ padding: "8px", borderRadius: "4px", border: "none" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <RiUserLine size={20} style={{ marginRight: "10px" }} />
            <input
              type="text"
              placeholder="Descritpion"
              value={educationdescription}
              onChange={(e) => seteducationdescription(e.target.value)}
              style={{ padding: "8px", borderRadius: "4px", border: "none" }}
            />
         
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <RiUserLine size={20} style={{ marginRight: "10px" }} />
            <input
              type="text"
              placeholder="Start Year"
              value={startyear}
              onChange={(e) => setstartyear(e.target.value)}
              style={{ padding: "8px", borderRadius: "4px", border: "none" }}
            />
         
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <RiUserLine size={20} style={{ marginRight: "10px" }} />
            <input
              type="text"
              placeholder="Descritpion"
              value={endyear}
              onChange={(e) => setendyear(e.target.value)}
              style={{ padding: "8px", borderRadius: "4px", border: "none" }}
            />
            <AddCircleIcon
              style={{ cursor: "pointer", marginRight: "20px" }}
              onClick={addexducation}
            />
          </div>
        </div>

        <div>
          {education.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "row", fontsize: "8px" }}
            >
              <p style={{ width: "100%", fontSize: "12px" }}>
                {item.startyear}-{item.endyear}
                {"   "}
                {item.name}
                {"   "}
                {item.description}
              </p>
              <CancelIcon
                onClick={() => {
                  removeeduction(index);
                }}
              />
            </div>
          ))}
        </div>
       {loading?<CircularProgress style={{marginLeft:"auto",marginRight:"auto"}}/>: <button
          disabled={password !== confirmpassword}
          onClick={handleSignIn}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 16px",
            borderRadius: "4px",
            background: password == confirmpassword ? "#4f46e5" : "#dc143c",
            color: "#fff",
            border: "none",
            cursor: password == confirmpassword && "pointer",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.16)",
            marginTop: "20px",
          }}
        >
          <GrLogin size={20} style={{ marginRight: "8px" }} />
          <p>Register</p>
        </button>}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p>{password !== confirmpassword && "passwords are not matching"}</p>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 16px",
              borderRadius: "4px",
              background: "#4f46e5",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.16)",
              marginTop: "20px",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
