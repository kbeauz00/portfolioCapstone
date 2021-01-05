export default (st) => `
<div class="hero">
<section class="playerContainer" id="">
<div class="player">
<h2>Registered Players !</h2>
<br>
<hr class="horizontalLine"> 
<div class="tableGroup">
<table id="table">
<tr>
<th>Number</th>
<th>Name</th>
<th>Email</th>
<th>Club</th>
<th>Tournament</th>
<th>Position</th>
<th>GradYear</th>
</tr>
${st.players
  .map((player) => {
    return `
    <tr>
    <td>${player.Number}</td>
    <td>${player.Name}</td>
    <td>${player.Email}</td>
    <td>${player.Club}</td>
    <td>${player.Tournament}</td>
    <td>${player.Position}</td>
    <td>${player.GradYear}</td>
    </tr>`;
  })
  .join("")}
</table>
</div>
</div>
</section>
</div>
`;
