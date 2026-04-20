// import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import './Dashboard.css'

export const Account = () => {

  // const {authState} = useOktaAuth();
  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
    getAccessTokenSilently
  } = useAuth0();

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
            <p>
              {isAuthenticated ? (
                <>
                  <p>Logged in as {user.nickname}</p>


                  <p>{user.email}</p>

                </>
              ): (
                <>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      

    </div>)


}