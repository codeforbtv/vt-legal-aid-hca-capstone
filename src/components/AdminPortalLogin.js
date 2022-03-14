import { useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/auth';

export default function AdminPortalLogin ({ setToken }) {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useContext(AuthContext);

  let from = location.state?.from?.pathname || "/admin-portal";

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

      auth.signin(user, () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
      });
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
