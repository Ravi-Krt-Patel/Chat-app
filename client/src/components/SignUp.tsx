import React, { useEffect } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {addUserDetail} from "../redux/userDetailSlice"

function SignUpForm() {
  const navigate = useNavigate()
  const {authentication} = useSelector((store: any)=> store.userDetail)
  const dispatch = useDispatch()
  const [state, setState] = React.useState({
    name: "",
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

    const { name, email, password } = state;

    axios.post('http://localhost:3001/api/v1/register', {
        name, email, password
    })
    .then((res:any)=>{
        console.log(res.data)
        dispatch(addUserDetail({
          name: res.data.user.name,
          authentication: true,
          userId: res.data.user._id,
          token: res.data.token
        }))
    })
    .catch((err: any)=>{
        console.log(err)
    })

    // alert(
    //   `You are sign up with name: ${name} email: ${email} and password: ${password}`
    // );

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  useEffect(()=>{
    if(authentication){
      navigate('/chat')
    }
  },[state.password])

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
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
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
