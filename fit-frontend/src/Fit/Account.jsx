import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

// import './Dashboard.css'

export const Account = () => {

  const {authState} = useOktaAuth();

  useEffect(() => {
    // console.log(authState.idToken.claims.email);
  },[])

    return (
    <div className="container mt-3">
      <h1>Account</h1>
      <div className="container">
        <div className="row">
          <div className="col-1" style={{paddingBottom: "5px"}}>
            <p>Name</p>
            <p>Email</p>
          </div>
          <div className="col-4" style={{paddingBottom: "5px"}}>
            <p>{(authState && authState.isAuthenticated)? (authState.idToken.claims.name): ''}</p>
            <p>{(authState && authState.isAuthenticated)? (authState.idToken.claims.email): ''}</p>
          </div>
        </div>
      </div>
      

    </div>)


}