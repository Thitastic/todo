import { useEffect, useState } from 'react'
import i18n from './translation/i18n'
import {Routes, Route, Navigate} from 'react-router-dom'

import Header from './components/Header'

import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import New from './pages/new'
import User from './middleware/users'
import Edit from './pages/edit'
import Test from './pages/test'

import { useNavigate } from 'react-router-dom'

import './App.css'
import { connect } from 'react-redux'

const App = (props) =>{


  useEffect(()=>{
    initLanguage()
    checkUser()
  })

  //init language
  const initLanguage = () =>{
    const lang = localStorage.getItem("lang")
    if(lang != null){
      i18n.changeLanguage(lang)
    }
    else{
      i18n.setDefaultLanguage()
    }
  }

  //checking user first open
  const checkUser = async () =>{
    const token = localStorage.getItem("token")
    const user = await User.loginToken(token)
    if(user.length > 0){
      localStorage.setItem("token", user[0]._token)
      props.login({username: user[0]._username, email: user[0]._email})
    }
    else{
      props.auth(false)
    }
  }


  return(
    <div className="mx-10 app">
      <Header/>

      <Routes>
         <Route
            path="/" 
            element={<Navigate to="/dashboard" replace/>}
          />

         <Route 
            path='/login' 
            element={props.userAuth ? <Navigate to="/dashboard" replace/> : <Login />}
          />

         <Route
            path='/register' 
            element={props.userAuth ? <Navigate to="/dashboard" replace/> : <Register />}
         />

         <Route 
            path='/dashboard' 
            element={props.userAuth ? <Dashboard /> : <Navigate to="/login" replace/>}
          />

         <Route 
            path='/new' 
            element={props.userAuth ? <New /> : <Navigate to="/login" replace/>}
          />
          <Route 
            path='/edit' 
            element={props.userAuth ? <Edit /> : <Navigate to="/login" replace/>}
          />

<Route 
            path='/test' 
            element={<Test/>}
          />
      </Routes>
    </div>
  )
}

const mapStateToProps = (state) =>{
    return {userAuth : state.Auth}
}

const mapDispathToProps = (dispatch)=>{
    return{
      login: (user) => dispatch({type: "USER_LOGIN", payload: user}),
      auth : (bool) => dispatch({type: "USER_AUTH", payload: bool})
    } 
}
export default connect(mapStateToProps, mapDispathToProps)(App)
//export default App
