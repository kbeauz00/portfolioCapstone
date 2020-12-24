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

window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above

  const form = document.getElementById("my-form");
  // var button = document.getElementById("my-form-button");
  const status = document.getElementById("status");

  // Success and Error functions for after the form is submitted

  function success() {
    form.reset();
    status.classList.add("success");
    status.innerHTML = "Thanks!";
  }

  function error() {
    status.classList.add("error");
    status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}
