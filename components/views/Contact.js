export default () => `
<div class="hero">
<section class="contactContainer" id="">
<div class="contact">
  <form action="https://formspree.io/f/moqpyppy" method="POST" id="my-form">
  <h2>Contact Form !</h2>
 
  <hr class="horizontalLine">

  <div class="contactBlockWide">

    <div class="contactBlock">
      <label for="fname">First Name</label>
      <input type="text" id="fname" name="firstname" placeholder="First Name" required>
    </div>

    <div class="contactBlock">
      <label for="lname">Last Name</label>
      <input type="text" id="lname" name="lastname" placeholder="Last Name" required>
    </div>
</div>


  <div class="contactBlockWide">
    <label for="email">Email</label>
    <input type="email" id="e_mail" name="_replyto" placeholder="Email" required>
  </div>

  <div class="contactBlockWide">
  <label for="subject">Subject/Reason</label>
    <textarea id="subject" name="message" placeholder="Write Something" style="height:50px"></textarea>
  </div>

  <div class="contactBlockWide">
    <input type="submit" class="btn" value="Send">
  </div>
  </form>
  <div id="status"></div>
</div>
</section>
<script> src="./index.js"></script>
</div>`;
