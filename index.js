import { Header, Footer, Main, Nav } from "./components";

function render() {
  document.querySelector("#root").innerHTML = `
  ${Header()}
    ${Nav()}
    ${Main()}
    ${Footer()}
    `;
}

render();
