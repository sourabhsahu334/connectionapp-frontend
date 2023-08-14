import React, { useState } from 'react';
import { RiLockPasswordLine, RiUserLine } from 'react-icons/ri';
import { GrLogin } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
const SignInForm = () => {
   const navigate=useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading,setLoading]=useState(false)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = async () => {
        try {
            setLoading(true)
            const {data} = await axios.post("https://mobilikbackend.onrender.com/api/v1/login", {
             
              email: email,
              password: password, 
            });
            console.log(data);
           
            if(data)
            {
              if(data.success!==true){
                alert("error: ", data.message);
                setLoading(false)
              }
              else{
                const userdata= JSON.stringify(data)
                localStorage.setItem('user',userdata);
                setLoading(false)
                navigate('/home')
              }
            }
         
          } catch (error) {
            console.error("Error:", error);
            alert(error);
            setLoading(false);
          }

    };


    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(to bottom right, #ff5f6d, #ffc371)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    borderRadius: '8px',
                    background: '#fff',
                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                    width: "300px",
                    height: "100%"
                }}
            >
                <h2 style={{ marginBottom: '20px' }}>Sign In</h2>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <RiUserLine size={20} style={{ marginRight: '10px' }} />
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: 'none' }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <RiLockPasswordLine size={20} style={{ marginRight: '10px' }} />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ padding: '8px', borderRadius: '4px', border: 'none' }}
                    />
                </div>
              { loading?<CircularProgress style={{marginRight:"auto",marginLeft:"auto"}}/> :<button
                    onClick={handleSignIn}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        background: '#4f46e5',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.16)',
                        marginTop: "20px"
                    }}
                >
                    <GrLogin size={20} style={{ marginRight: '8px' }} />
                    Sign In
                </button>}
            </div>
        </div>
    );
};

export default SignInForm;
