import { useState } from 'react'
import './App.css'
import HelloWorld from './components/helloWorld'
import { Route, Routes, Navigate, Link } from "react-router-dom";
import Home from './pages/home'
import About from './pages/about'
import User from './pages/user'

function App() {
  const [count, setCount] = useState(0)



  return (
    <>
    <Routes>
      <Route path="/user/:userId" element={<User />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
   </Routes>
      <div>
        <Link to={"/about"}>About</Link> | <Link to={"/"}>Home</Link> | <Link to={"/user/1"}>User</Link>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 2)}>
          count is {count}
        </button>
        <HelloWorld />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App