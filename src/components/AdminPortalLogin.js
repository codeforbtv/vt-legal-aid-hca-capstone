import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../contexts/auth";

export default function AdminPortalLogin ({ setToken }) {
  let navigate = useNavigate();
  let location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/admin-portal";

  // check to see if we are already logged in and if so then log in the user and direct the user to their page
  useEffect(() => {
    async function getCurrentUser() {
      try {
        // check to see if logged in
        const response = await fetch('/api/currentuser', {
          method: 'get',
        });

        const user = await response.json();
        if (user) {
          await auth.login(user);
          navigate(from, { replace: true });
        }
      }
      catch(ex) {
        console.log(ex);
      }
    }
    getCurrentUser();
  }, []);

  async function handleLogin(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    try {
      const response = await fetch('/api/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      const user = await response.json();

      await auth.login(user);
      navigate(from, { replace: true });
    }
    catch (ex) {
      console.log(ex);
    }
  }

  return (
    <>
      <h1>Log in Here!</h1>
      {/* if (messages.error){messages.error} */}
      <form onSubmit={handleLogin} method="post" action="/api/login">
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' required />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password' required />
        </div>
        <button type='submit'>Login</button>
      </form>
      <h5>Don't have an account?</h5>
      <Link to='/register'>Register here</Link>
    </>
  )
}
