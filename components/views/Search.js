export default (st) => `
<div class="hero">
<section class="playerContainer" id="">
<div class="player">
<h2>Search Result for Tournaments !</h2>
<br>
<hr class="horizontalLine"> 
<br>
<button name="back" class="btn" value="" id="back">Go Back</button>
<br>
<br>
<div class="tableGroup">
<table class="table" id="searchTable">
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
  .map((player, i) => {
    return `
    <tr>
    <td>${i + 1}</td>
    <!--<td>${player.uid}</td>-->
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
