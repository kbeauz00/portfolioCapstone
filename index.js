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

const hamburger = document.querySelector("#hamburger");
const navUL = document.querySelector("#navbar ul");

hamburger.addEventListener("click", () => {
  navUL.classList.toggle("show");
});

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

function addEventListenersByView(st) {
  if (st.view === "RegisterP") {
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
          state.Player.players.push(response.data);
          router.navigate("/Player");
        })
        .catch((error) => {
          console.log("It puked", error);
        });
    });
  }
}

// if (st.view === "Login") {
//   document.querySelector("form").addEventListener("submit", (event) => {
//     event.preventDefault();
//     const inputList = event.target.elements;

//     const attempt = 3; // Variable to count number of attempts.
//     // Below function Executes on click of login button.
//     function validate() {
//       const username = document.getElementById("username").value;
//       const password = document.getElementById("password").value;
//       if (username == "Formget" && password == "formget#123") {
//         alert("Login successfully");
//         window.location = "success.html"; // Redirecting to other page.
//         return false;
//       } else {
//         attempt--; // Decrementing by one.
//         alert("You have left " + attempt + " attempt;");
//         // Disabling fields after 3 attempts.
//         if (attempt == 0) {
//           document.getElementById("username").disabled = true;
//           document.getElementById("password").disabled = true;
//           document.getElementById("submit").disabled = true;
//           return false;
//         }
//       }
//     }
//     axios
//       .post(`${API_URL}/players`, requestData)
//       .then((response) => {
//         state.Player.players.push(response.data);
//         router.navigate("/Player");
//       })
//       .catch((error) => {
//         console.log("It puked", error);
//       });
//   });
// }

function fetchDataByView(st = state.Home) {
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
