import React, { useState,useRef, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const formQuestions = {
  q1: "What is your name?",
  q2: "What is your age?",
  q3: "What is your favorite color?",
};

const Form = (props) => {
  const [formData, setFormData] = useState({});
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  
  const location = useLocation();
  const data = location.state?.data || "No data found";
  const [questions,setQuestion]=useState([]);
 const {id}=useParams();
 
 

  useEffect(()=>{
  //  setQuestion(data);
    const localdata= localStorage.getItem('questions');
    
    const filterdata=localdata && JSON.parse(localdata).filter((item)=>item.date==id);
    setQuestion(filterdata[0].questions);
    console.log(filterdata[0].questions)
    
  },[])
 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
  };

  return ( <div style={{width:"100%",height:windowSize.current[1],background:"linear-gradient(0deg, rgba(156,223,221,1) 12%, rgba(221,131,221,1) 56%)"}}>

    <form onSubmit={handleSubmit}>
      {questions && questions.map((question, index) => (
        <div key={index} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"15px"}}>
          <label style={{ color: 'purple' }}>{question.questions}</label>
          <input
            type="text"
            style={{ borderBottomColor: 'red', outlineColor: 'blue',borderBottomWidth:.5,borderRadius:"5px",width:'80%',height:"30px" ,marginTop:"10px",backgroundColor:"rgba(255,255,255,.5)"}}
            //onChange={(e) => handleChange(question, e.target.value)}
          />
        </div>
      ))}
      <button  style={{marginTop:"20px",fontSize:"20px",borderRadius:"5px",width:"85px",height:"40px",marginLeft:"45%",background:"linear-gradient(0deg, rgba(156,223,221,1) 12%, rgba(64,136,168,1) 21%, rgba(118,32,118,1) 56%)",color:"white",boxShadow:'2px 2px 2px orange'
      ,cursor:"pointer",opacity:.7}} type="submit">Submit</button>
    </form>
  </div>
  );
};

export default Form;
