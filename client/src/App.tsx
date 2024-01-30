import {useEffect, useState} from 'react'
import {Home} from "./components/Home"
import { Routes, Route } from 'react-router-dom'
import {Chat} from "./components/Chat"
import Login from "./components/Login"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} >
         <Route index element={<div style={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          height: '40vh'
         }} >
          <h1 style={{
            font: '40px',
            fontWeight: 'bold',
            color:'#ff416c'
          }} >Well Come to Chat Application</h1>
         </div>}/>
         <Route path="/chat" element={<Chat/>} />
         <Route path="/login" element={<Login/>} />
      </Route>
      
    </Routes>
    </>
  )
}

export default App
