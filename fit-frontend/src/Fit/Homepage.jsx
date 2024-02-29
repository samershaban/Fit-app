import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom"

export const Homepage = () => {

  const { authState } = useOktaAuth();

  return(
    <div className="container mt-3">
      <h1>Welcome to Fit App</h1>
      {authState?.isAuthenticated ?
      <>
        <p>Go to my dashboard</p>
        <Link type="button" className="btn main-color btn-lg text-white" to="/dashboard">Dashboard</Link>
      </>:
      <>
        <p>Login to get started</p>
        <Link type="button" className="btn main-color btn-lg text-white" to="/login">Login</Link>
      </>
      }
  
    </div>
  )
}