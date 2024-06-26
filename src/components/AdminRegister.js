import { Link } from "react-router-dom";

export default function Register () {
  return (
    <>
      <h1>Register for the Medical Debt Stories Administrative Portal</h1>

      <form action='/register' method='POST'>
        <div>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' name='name' required />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' required />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password' required />
        </div>
        <button type='submit'>Register</button>
      </form>

      <h2>Already have an account?</h2>
      <Link to='/login'>Login</Link>
    </>
  )
}
