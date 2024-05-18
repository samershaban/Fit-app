import React, { useEffect, useRef } from 'react';
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom"

const steps = ['Goals', 'Basic Info', 'Routine'];

// Main Component
export const Routine = () => {

  const { authState } = useOktaAuth();

  return(
    <div className="container mt-3">
      <h1>Your current routine</h1>
      {authState?.isAuthenticated ?
      <>
        <p>Go to my dashboard</p>
        <Link type="button" className="btn main-color btn-lg text-white" to="/dashboard">Dashboard</Link>
      </>:
      <>
        <p>Login to save data</p>
        <Link type="button" className="btn main-color btn-lg text-white" to="/login">Login</Link>
      </>
      }
      <p>Create routine</p>
        <Link type="button" className="btn main-color btn-lg text-white" to="/start">Start</Link>
    </div>
  )
}