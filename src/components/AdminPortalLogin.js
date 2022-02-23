export default function AdminPortalLogin () {
  return (
    <>
      <h1>Log in Here!</h1>
      {/* if (messages.error){messages.error} */}
      <form action='/login' method='POST'>
        <div>
          <label for='email'>Email:</label>
          <input type='email' id='email' name='email' required />
        </div>
        <div>
          <label for='password'>Password:</label>
          <input type='password' id='password' name='password' required />
        </div>
        <button type='submit'>Login</button>
      </form>
      <h5>Don't have an account?</h5>
      <a href='/register'>Register here</a>
    </>
  )
}
