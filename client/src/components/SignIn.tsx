import React from "react";
import axios from "axios"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import {addUserDetail} from "../redux/userDetailSlice"


function SignInForm() {
  const {authentication} = useSelector((store: any)=>store.userDetail)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const handleChange = (evt: { target: { value: any; name: any; }; }) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();

    // const { email, password } = state;
    // alert(`You are login with email: ${email} and password: ${password}`);
    axios.post('http://localhost:3001/api/v1/login', {
        email: state.email,
        password: state.password
    })
    .then((res: any)=>{
        //alert(`you have login succesfully`)
        console.log(res.data)
        dispatch(addUserDetail({
          name: res.data.user.name,
          authentication: true,
          userId: res.data.user._id,
          token: res.data.token
        }))
    })
    .catch((err:any)=>{
        alert(err?.response?.data?.message)
    })
    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  useEffect(() => {
    if(authentication){
      navigate("/chat")
    }
  }, [authentication])


  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
