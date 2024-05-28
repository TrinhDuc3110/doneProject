import { Container, Heading, Form, NavLink, Button } from "./LoginFormElement";
import Axios from "axios";
import { useContext, useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { FaGooglePlusG } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
// import { FaRegEye } from "react-icons/fa";
// import { FaRegEyeSlash } from "react-icons/fa";


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const navigate = useNavigate();
  const [showErrorMessage, setShowErrorMessage] = useState('');

  const handleSignIn = (e) => { 
    e.preventDefault();
    Axios.post('http://localhost:8080/login/signin', {
      username: email,
      password: password
    })
    .then(response => {
      let found = false;
      for(var item in response.data){
        if (email === response.data[item].email && password === response.data[item].password) {
          found = true;
          navigate("/home");
          break;
        }
      }
      if (!found) {
        setShowErrorMessage('Wrong email or password');

      }
    })
    .catch(error => {
      console.error('Đã xảy ra lỗi:', error);
    });
  };


  return (
    
    <div className="flex flex-col pt-20 pr-20">
      <Container>
        <Heading>
          <h2 className="text-gray-50 text-center text-3xl">User Login</h2>
        </Heading>

        <Form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="p-0">Email</label>
            <input
              className="relative h-10 pl-3 border border-gray-950 rounded-md pr-10"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdOutlineMail
              class="mail-icon"
              style={{
                position: "absolute",
                top: "38.5%",
                left: "61%",
              }}
            />
          </div>

          <div className="relative flex flex-col gap-1">
            <label className=" p-0">Password</label>
            <input
              className="h-10 pl-3 border border-gray-950 rounded-md mb-2 pr-10"
              type={!showPassword ? "password" : "text"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showErrorMessage && <div style={{ color: 'red' }}>{showErrorMessage}</div>}

            {showPassword ? (
              <FaRegEyeSlash
                className="eye-icon"
                style={{
                  position: "absolute",
                  top: "40px",
                  left: "93%",
                }}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaRegEye
                className="eye-icon"
                style={{
                  position: "absolute",
                  top: "40px",
                  left: "93%",
                }}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <div className="flex justify-end underline text-blue-300 cursor-pointer hover:text-blue-500">
            Forgot password?{" "}
          </div>

          <Button
            style={{
              alignSelf: "center",
            }}
            onClick={handleSignIn}
          >
            Sign in
          </Button>

          <div className="flex flex-row gap-2 justify-center">
            <div
              style={{
                width: "50%",
                height: "2px",
                backgroundColor: "#e5e5e5",
                alignSelf: "center",
              }}
            />

            <text className="text-gray-950 text-center">Or</text>
            <div
              style={{
                width: "50%",
                height: "2px",
                backgroundColor: "#e5e5e5",
                alignSelf: "center",
              }}
            />
          </div>

          <div className="flex justify-center font-thin ">
            <span>Are you new?</span>
            <NavLink
              to="/register"
              activeStyle={String(true)}
              className="text-blue-400 cursor-pointer hover:text-blue-500"
            >
              {" "}
              Create an account{" "}
            </NavLink>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default LoginForm;
