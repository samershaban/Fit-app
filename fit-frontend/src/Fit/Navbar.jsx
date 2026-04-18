// import { useOktaAuth } from "@okta/okta-react";
import { Link, NavLink } from "react-router-dom";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { useAuth0 } from "@auth0/auth0-react";
export const Navbar = () => {
  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
  } = useAuth0();

  // const { oktaAuth, authState } = useOktaAuth();

  // if(!authState) {
  //   return <SpinnerLoading/>
  // }

  const handleLogout = () => auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  // console.log(authState);// prints token to the screen when you sign in

  return (
    <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
      <div className='container-fluid'>
        <span className='navbar-brand'>Fit App</span>
        <button className='navbar-toggler' type='button'
          data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
          aira-controls='navbarNavDropdown' aria-expanded='false'
          aria-label='Toggle Navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            {isAuthenticated && 
            <li className="nav-item">
              <NavLink className='nav-link' to='/dashboard'>Dashboard</NavLink>
            </li>
            }
            <li className='nav-item'>
              <NavLink className='nav-link' to='/routine'>Routine</NavLink>
            </li>
            {isAuthenticated && <>
            <li className="nav-item">
              <NavLink className='nav-link' to='/calendar'>Calendar</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className='nav-link' to='/account'>Account</NavLink>
            </li>
            </>}
          </ul>
          <ul className='navbar-nav ms-auto'>
            {!isAuthenticated ?
              <li className='nav-item m-1'>
                <Link type='button' className='btn btn-outline-light' to='/login'>Sign in</Link>
              </li>
              :
              <li className='nav-item m-1'>
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}