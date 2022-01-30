import "./App.scss";
import LandingPage from "./components/LandingPage";
import CollegeDetail from "./components/CollegeDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Profile from "./components/Profile";
import AuthProvider, { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import firebase from './firebase';
import React from 'react';

const fcm_server_key = "AAAAA0U22-g:APA91bGuvESZoZOOGsFlSrbHxfvvzsExk1BOx6Hm--6NDe188g50B0jRDvKtWrfDp8LD6M9MZSYtyRW_iryotWIXrtCb3phiAynovISpyvrDduQbQPOdy9VIAj6RKKm97AbF0HELP-r8";

function subscribeTokenToTopic(token, topic) {
  fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic, {
    method: 'POST',
    headers: new Headers({
      'Authorization': 'key='+fcm_server_key
    })
  }).then(response => {
    if (response.status < 200 || response.status >= 400) {
      throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
    }
    console.log('Subscribed to "'+topic+'"');
  }).catch(error => {
    console.error(error);
  })
}

function App() {
  
  React.useEffect(()=>{
    if(firebase.messaging.isSupported()){

      const msg=firebase.messaging();
  
      msg.onMessage(()=>{
        console.log("hello")
        window.location.reload()
      })
      msg.requestPermission().then(()=>{
        return msg.getToken();
      }).then((data)=>{
        console.warn("token",data)
        subscribeTokenToTopic(data,"all");
      })
    }
  })


  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/college/:id" element={<CollegeDetail />} />
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
