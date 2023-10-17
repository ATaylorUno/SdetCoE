import { useState } from 'react'
import ResponsiveAppBar from './components/appbar';
import { Route, Routes, Navigate, Link } from "react-router-dom";
import LogIn from './pages/LogIn';
import Home from './pages/currentRoutine'
import About from './pages/workoutHistory'
import User from './pages/user'
import AccountInfo from './pages/accountInfo'
import AuthContext from './contexts/auth'
import WorkoutHistory from './pages/workoutHistory';
import Workout from './pages/workout';

function App() {
  const AuthenticatedRoutes = () => {
    return (

    <Routes>
      <Route path="/user/:userId" element={<User />} />
      <Route path="/workout/:workoutId" element={<Workout />} />
      <Route path="/about" element={<About />} />
      <Route path="/accountInfo" element={<AccountInfo/>} />
      <Route path="/workoutHistory" element={<WorkoutHistory/>} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />

   </Routes>
    )
  }

  const UnauthenticatedRoutes = () => {
    return (
      <Routes>
      <Route path="/logIn" element={<LogIn />} />
      <Route path="*" element={<Navigate to="/logIn" />} />
      </Routes>
    )
  }


  const { state } = AuthContext.useLogin();
  const authenticated = state.accessToken && true;

  return (
    <>
     {authenticated && <ResponsiveAppBar />}
      {authenticated ? AuthenticatedRoutes() : UnauthenticatedRoutes()}
  
    </>
  )
}

export default App