import { Box, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { Message } from "./Message"
import { useEffect, useState, useMemo } from "react";
import ReactSrcollToBottom from "react-scroll-to-bottom";
import './chat.css'
import { io } from 'socket.io-client'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allAllUsers } from "../redux/userDetailSlice"


export const Chat = () => {
  const [checkSocket, setCheckSocket] = useState(false)
  const [currentUser, setCurrentUser] = useState({ name: '', id: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { authentication, token, AllUser, userId, name } = useSelector((store: any) => store.userDetail)
  const [message, setMessage] = useState<any[]>([])
  const [text, setText] = useState('')
  const socket = useMemo(() => io("http://localhost:3001"), [checkSocket, currentUser.id])

  const handleChat = () => {
    socket.emit('message', { text, id: currentUser.id })
    setMessage((message) => [...message, { message: text, position: 'right' }])
    setText('')
    //console.log("it run")
    setCheckSocket(p => !p)
  }

  useEffect(() => {
    if (!authentication) {
      navigate('/login')
    }
  }, [])

  useEffect(()=>{
    setMessage([])
  },[currentUser])


  useEffect(() => {
    socket.on('connect', () => {
      console.log("connected", socket.id)
    })
    socket.on('welcome', (data) => {
      console.log(data)
    })
    socket.on("receive-message", (data: any) => {
      if (data.id == userId) {
        console.log("-------------", data)
        setMessage((message) => [...message, { message: data.text, position: 'left' }])
      }
    })
    return () => {
      socket.disconnect()
    }
  }, [socket])

  useEffect(() => {
    if (authentication) {
      axios.get(`http://localhost:3001/api/v1/all-user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res: any) => {
          dispatch(allAllUsers(res.data.allUser))
        })
        .catch((err: any) => {
          console.log(err)
        })
    }

  }, [])

  return (<>{authentication && <div>
    <h1>Current User : {name}</h1>
    <div style={{
      display: 'flex'
    }} >
      <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        alignContent: 'center',
        width: '300px',
        height: '500px',
        overflowY: 'auto',
        marginTop: '5vw',
        background: 'ff4b2b',
        boxSizing: 'border-box',
        flexDirection: 'column',
      }} >
        {AllUser.map((item: any) => {
          if (item._id !== userId) {
            return <Box sx={{
              background: '#ff4b2b',
              width: '100%',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              cursor: 'pointer',
              margin: '5px',
              boxSizing: 'border-box',
              '&:hover': {
                backgroundColor: "black",
                color: "white"
             },

            }} onClick={() => {
              setCurrentUser({ name: item?.name, id: item?._id })
            }} >
              {item?.name}
            </Box>
          }
        })}

      </Box>
      {  !!currentUser.name && <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        marginTop: '5vw'
      }} >
        <Box>
          <h1>Chat with : {currentUser.name}</h1>
          {<ReactSrcollToBottom className='container' >

            {!!currentUser.name && message.map((item, ind) => {
              console.log(item)
              return (<Message key={ind} message={item?.message} ownCheck={item?.position !== 'left'} user={"ma"} />)
            })}
          </ReactSrcollToBottom>}
          <FormControl fullWidth sx={{
            background: 'black',
            color: 'white',
          }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount" sx={{
              color: 'white',
              paddingLeft: '2vw'
            }} >Message</InputLabel>
            <Input
              id="standard-adornment-amount"
              endAdornment={<InputAdornment position="end">
                <SendIcon sx={{
                  color: 'white',
                  cursor: 'pointer'
                }} onClick={handleChat} /></InputAdornment>}
              sx={{
                color: 'white',
                paddingLeft: '2vw',
                paddingRight: '2vw',
                border: '1px solid white'
              }}
              value={text}
              onChange={(e) => {
                setText(e.target.value)
              }}
            />
          </FormControl>
        </Box>

      </Box>
      }
      {!!!currentUser.name && <h1>Please Add a Person To chat</h1>}
      </div>
      </div>}


  </>)
}