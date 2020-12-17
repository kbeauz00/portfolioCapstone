export default () => `
<div class="hero">
<section class="loginContainer">
  <div class="login">
    <form id="login-form" class="form" action="" method="post">
      <h2>Login !</h2>
      <br>
      <hr class="horizontalLine"> 
      <div class="form-group">
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
      <div class="form-group">
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
        <br>
        <a href="/Login" class="btn" id="btn-login">
        <i class="fas.fa-chevron-right"></i>Login !</a>
        </div>
        <div id="register-link" class="text-right">
        <a href="./register.html" class="text-info">Register here</a>
      </div>
    </form>
  </div>
</section>
</div>`;
