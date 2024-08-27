import React, { StrictMode, useEffect, useState, createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App, { backendURL } from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import Temp from './pages/Temp.jsx';
import Result from './pages/Result.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

export const LoginContext = createContext({
  user: {},
  isLoggedIn: false,
  setUser: () => { },
  setIsLoggedIn: () => { },
});

const AppWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [subjects, setSubjects] = useState([]);
  return (
    <LoginContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      loading,
      setLoading,
      user,
      setUser,
      subjects,
      setSubjects,
    }} >
      <App />
    </LoginContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
    {/* <Result /> */}
    {/* <Temp /> */}
  </React.StrictMode>,
)