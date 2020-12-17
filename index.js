import { Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";

const router = new Navigo(window.location.origin);

router
  .on({
    ":view": (params) => render(state[capitalize(params.view)]),
    "/": () => render(state.Home),
  })
  .resolve();

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = ` 
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
    `;
  router.updatePageLinks();
}

const hamburger = document.querySelector("#hamburger");
const navUL = document.querySelector("#navbar ul");

hamburger.addEventListener("click", () => {
  navUL.classList.toggle("show");
});
