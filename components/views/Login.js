export default () => `
<div class="hero">
<section class="loginContainer">
  <div class="login">
    <form id="my-form" class="form" action="" method="POST">
      <h2>Login !</h2>
      <br>
      <hr class="horizontalLine"> 
      <div class="loginGroup">
        <label for="username" class="text-info">Username:</label>
        <br>
          <input
            type="text"
            name="username"
            id="username"
            class="form-control"
            placeholder ="Username"
            required/>
      </div>
      <div class="loginGroup">
        <label for="password" class="text-info">Password:</label>
        <br>
          <input
            type="text"
            name="password"
            id="password"
            class="form-control"
            placeholder ="Password"
            required />
      </div>
      <div class="remember">
        <label for="remember-me">
        <span>Remember me</span> 
        <span>
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"/>
        </span>
        </label>
      </div>
        <br>              
        <button id="loginBtn" class="btn"
        >Login !</button>
        <div id="status"></div>
    </form>
  </div>
</section>
</div>`;
