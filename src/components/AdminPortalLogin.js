export default function AdminPortalLogin ({ setToken }) {
  const handleLogin = async (ev) => {
    ev.preventDefault();
    const email = ev.target.querySelector('[name="email"]').value;
    const password = ev.target.querySelector('[name="password"]').value;
    const token = await fetch({
      method: 'post',
      url: '/login',
      data: {
        email,
        password,
      }
    });
    console.log(token);
    setToken(token);
  };

  return (
    <>
      <h1>Log in Here!</h1>
      {/* if (messages.error){messages.error} */}
      <form onSubmit={handleLogin} >
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
      <a href='/register'>Register here</a>
    </>
  )
}
