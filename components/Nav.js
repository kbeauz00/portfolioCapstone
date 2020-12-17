export default (links) => `
<nav id="navbar" class="navbar">
  <h1 class="logo" >  
    <span class="text-primary">
    <i class="fas fa-book-open"></i>Recruiting</span>
    is Easy
  </h1>
  <button class="hamburger" id="hamburger">
  <i class ="fas fa-bars"></i>
  </button>
  <ul>
  ${links.reduce(
    (html, link) =>
      html +
      `<li><a href="/${link.title !== "Home" ? link.title : ""}" title="${
        link.title
      }" data-navigo>${link.text}</a></li>`,
    ``
  )}
  </ul>
</nav>
`;
