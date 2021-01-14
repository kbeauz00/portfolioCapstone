import { Nav, Main, Footer } from "./components";
import * as state from "./store";
import axios from "axios";

//Added this VVV
import Navigo from "navigo";
import { capitalize } from "lodash";

const API_URL = process.env.API_URL || "http://localhost:5000";

const router = new Navigo(window.location.origin);

router.hooks({
  before: (done, params) => {
    // Because not all routes pass params we have to guard against is being undefined
    const page =
      params && Object.prototype.hasOwnProperty.call(params, "page")
        ? capitalize(params.page)
        : "Home";
    fetchDataByView(state[page]);
    done();
  },
});

router
  .on({
    "/": () => {
      render(state.Home);
    },
    ":page": (params) => {
      render(state[capitalize(params.page)]);
    },
  })
  .resolve();
// Added this ^^^

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = ` 
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
  `;
  router.updatePageLinks();
  addNavEventListeners();
  addEventListenersByView(st);
}

//hamburger menu

hamburger.addEventListener("click", () => {
  const hamburger = document.querySelector("#hamburger");
  const navUL = document.querySelector("#navbar ul");
  navUL.classList.toggle("show");
});

//Nav Bar
function addNavEventListeners() {
  // add event listeners to Nav items for navigation
  document.querySelectorAll("nav a").forEach((navLink) =>
    navLink.addEventListener("click", (event) => {
      event.preventDefault();
      render(state[event.target.title]);
    })
  );
  // add menu toggle to bars icon in nav bar
  document
    .querySelector(".fa-bars")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );
}
//Contact
// Add Formspree
window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above

  var form = document.getElementById("my-form");
  // var button = document.getElementById("my-form-button");
  var status = document.getElementById("status");

  // Success and Error functions for after the form is submitted

  function success() {
    form.reset();
    status.innerHTML = "Thanks!";
  }

  function error() {
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

//Player Registration
function addEventListenersByView(st) {
  if (st.view === "Reg") {
    document.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      const inputList = event.target.elements;

      const requestData = {
        Name: inputList.fullName.value,
        Email: inputList.email.value,
        Club: inputList.club.value,
        Tournament: inputList.tournament.value,
        Position: inputList.position.value,
        GradYear: inputList.gradYear.value,
      };

      axios
        .post(`${API_URL}/players`, requestData)
        .then((response) => {
          //state.Player.players.push(response.data);
          router.navigate("/Player");
        })
        .catch((error) => {
          console.log("It puked", error);
        });
    });
    // Coach Registration
  } else if (st.view === "Register") {
    document.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      const inputList = event.target.elements;

      const requestData = {
        email: inputList.email.value,
        username: inputList.username.value,
        password: inputList.password.value,
      };

      axios.post(`${API_URL}/users`, requestData).then((response) => {
        console.log(response);
        router.navigate("/Login");
      });
    });
    // Delete player Function
  } else if (st.view === "Player") {
    function deleteEvent(event) {
      console.log(event.target.value);
      const playerId = event.target.value;
      axios.delete(`${API_URL}/players/${playerId}`);
      location.reload();
    }
    const deleteBtns = document.querySelectorAll(".deleteBtn");
    for (let i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].addEventListener("click", deleteEvent);
    }

    // Search
    function searchEvent(event) {
      const searchValue = document.querySelector("#search").value;
      if (searchValue.length < 1) {
        alert("You must enter a search value!");
        return;
      }
      state.Search.players = state.Player.players.filter(function (value) {
        return value.Tournament.toLowerCase().includes(searchValue);
        //
        // value.Club.toLowerCase().includes(searchValue) ||
        // value.Name.toLowerCase().includes(searchValue) ||
        // value.Email.toLowerCase().includes(searchValue)
      });
      if (state.Search.players.length === 0) {
        alert("There are no results matching the search criteria!");
        return;
      }
      console.log(state.Search.players);
      router.navigate("/Search");
    }
    document.querySelector("#searchBtn").addEventListener("click", searchEvent);

    //Search button navigate to player
  } else if (st.view === "Search") {
    document.querySelector("#back").addEventListener("click", (event) => {
      router.navigate("/Player");
    });

    //Login page to navigate to Register player
  } else if (st.view === "Login") {
    console.log("Login page");
    document.querySelector("#loginBtn").addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Login form submitted");
      router.navigate("/Reg");
    });
  }
}

function fetchDataByView(st = state.Home) {
  console.log("Test", st);
  switch (st.view) {
    case "Player":
      axios
        .get(`${API_URL}/players`)
        .then((response) => {
          state[st.view].players = response.data;
          render(st);
        })
        .catch((error) => {
          console.log("It puked", error);
        });
      break;
  }
}
