import React, { useState , useEffect} from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Video from './pages/video/Video'
import {Route, Routes} from 'react-router-dom'
const App = () => {
  const [sidebar, setSidebar] = useState(true)
  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route exact path='/' element={<Home sidebar={sidebar}/>} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
      
      </Routes>
    </div>
  )
}

export default App