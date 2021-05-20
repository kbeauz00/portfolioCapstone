export default (st) => `
<div class="hero">
<section class="playerContainer" id="">
<div class="player">
<h2>Registered Players !</h2>
<br>
<hr class="horizontalLine"> 
<input type="text" class="form-control" name="search" placeholder="Search Tournament" id="search"/>
<br />
<button id="searchBtn" name="searchBtn" class="btn">Search</button>
<br>
<br>
<div class="tableGroup">
<table class="table" id="table">
<tr>
<th>Number</th>
<!--<th>Number</th>-->
<th>Name</th>
<th>Email</th>
<th>Club</th>
<th>Tournament</th>
<th>Position</th>
<th>GradYear</th>
<th>Action</th>
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
    <td>
    <input type="button" value="Edit" name="edit" class="editBtn">
    <button type="button" value="${
      player._id
    }" name="delete" class="deleteBtn">Delete</button>
    </td>
    </tr>`;
  })
  .join("")}
</table>
</div>
</div>
</section>
</div>
`;
