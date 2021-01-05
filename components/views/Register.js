export default () => `
<div class="hero">
<section class="registerContainer">
  <div class="register">
  <form id="my-form" class="form" action method="POST"> 
  <h2>SignUp Form !</h2> 
  <br>
  <hr class="horizontalLine">
  <div class="registerGroup">
  <label for="email" class="text-info">Email:</label>
      <input
      class="text email"
      type="email"
      name="email"
      placeholder="Email"
      required />
    </div>
    <div class="registerGroup">
    <label for="username" class="text-info">Username:</label>
        <input
          class="text"
          type="text"
          name="username"
          placeholder="User Name"
          required />
    </div>
    <div class="registerGroup">
    <label for="email" class="text-info">Password:</label>
        <input
          class="text"
          type="password"
          name="password"
          placeholder="Password"
          required= />
    </div>
    <div class="registerGroup">
    <label for="email" class="text-info">Confirm Password:</label>
        <input
          class="text w3lpass"
          type="password"
          name="passwordCheck"
          placeholder="Confirm Password"
          required= />
      </div>
        <div class="agreeTerm">
          <label class="anim">
            <input type="checkbox" class="checkbox" required="" />
            <span>I Agree To The Terms & Conditions</span>
          </label>
          <div class="clear"></div>
        </div>
        <button class="btn" name="submit" type="submit">Sign Up !</button> 
        <div id="status"></div>
      <p>
        Already have an Account?
        <a href="/Login" data-navigo class="signUp"> login !</a>
      </p>
    </div>
    </form>
  </div>
</section>
</div>`;
