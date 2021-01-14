export default () => `
<div class="hero">
<section class="playerRegisterContainer">
<div class="playerRegister">
<form id="myForm" method="POST" action="">
  <h2> Register Players !</h2>
  <br>
  <hr class="horizontalLine">
  <div class="playerRegisterGroup">
    <label for="fullName">Full Name:</label>
    <input type="text" name="fullName" id="fullName" placeholder="Enter Full Name" required></input>
  </div>
  <div class="playerRegisterGroup">
    <label for="email">Email:</label>
    <input type="text" name="email" id="email" placeholder="Enter Email" required>
  </div>
  <div class="playerRegisterGroup">
    <label for="club">Club:</label>
    <input type="text" name="club" id="club" placeholder="Enter Club" required>
  </div>
  <div class="playerRegisterGroup">
    <label for="tournament">Tournament:</label>
    <input type="text" name="tournament" id="tournament" placeholder="Enter Tournament" required></input>
  </div>
  <div class="playerRegisterGroup">
    <label for="position">Position:</label>
    <input type="text" name="position" id="position" placeholder="Enter Position" required>
  </div>
  <div class="playerRegisterGroup">
    <label for="gradYear">HS GradYear:</label>
    <input type="text" name="gradYear" id="gradYear" placeholder="Enter HS Graduation Year" required>
  </div>
  <input type="submit" class="btn" id="PlayerRegisterBtn" name="submit" value="Register Player">
</form>
</div>
</section>
</div>
`;
