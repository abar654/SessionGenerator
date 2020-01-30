import * as sessionFunctions from "sessions.js";

checkCheckboxes();
document.getElementById("generate-button").onclick = generate;
let currentSessions = [];

function checkCheckboxes() {
  let inputs = document.getElementsByTagName("input");
  for(input of inputs){
    if(input.type == "checkbox") {
      input.checked = true;
    }
  }
}

function generate() {

  //Get all the inputs
  let duration = document.getElementById("in-duration").value;
  let pace = document.getElementById("in-pace").value;
  let distance = document.getElementById("in-distance").value;
  let intensity = document.getElementById("in-intensity").value;

  //Get the session types
  let sessionTypes = [];
  let inputs = document.getElementsByTagName("input");
  for(input of inputs){
    if(input.type == "checkbox") {
      if(input.checked === true) {
        sessionTypes.push(input.value);
      }
    }
  }

  //Check that inputs are invalid
  let validInputs = true;

  //Check duration
  if(duration == "" || isNaN(duration) || duration < 0) {
    document.getElementById("in-duration").setAttribute("style", "border-color:var(--color-fail);");
    validInputs = false;
  }

  //Check pace
  if(pace == "" || isNaN(pace) || pace < 0) {
    document.getElementById("in-pace").setAttribute("style", "border-color:var(--color-fail);");
    validInputs = false;
  }

  //Check distance, can be thought of as max distance
  if(distance == "") {
    distance = Number.MAX_SAFE_INTEGER;
  } else if(distance < 0) {
    document.getElementById("in-distance").setAttribute("style", "border-color:var(--color-fail);");
    validInputs = false;
  }

  //Check intensity, if none given then set to -1
  if(intensity == "") {
    intensity = -1;
  } else if(intensity < 1 || intensity > 10 || !Number.isInteger(intensity)) {
    document.getElementById("in-intensity").setAttribute("style", "border-color:var(--color-fail);");
    validInputs = false;
  }

  if(validInputs) {

    //Display the session-container
    document.getElementById("generated-session").setAttribute("style", "display: flex;");
    document.getElementById("again-button").setAttribute("style", "display: initial;");
    document.getElementById("again-button").onclick = displayRandomSession();
    document.getElementById("instruction-text").setAttribute("style", "display: none;");

    //Generate the sessions, then get a session and display it
    currentSessions = matchSessions(duration, pace, distance, intensity, sessionTypes);
    displayRandomSession();

  }

}

function matchSessions(duration, pace, distance, intensity, sessionTypes) {
  let newSessions = [];

  if(sessionTypes.includes("regular")) {
    newSessions = newSessions.concat(generateRegular(duration, pace, distance, intensity));
  }

  if(sessionTypes.includes("intervals")) {
    newSessions = newSessions.concat(generateIntervals(duration, pace, distance, intensity));
  }

  if(sessionTypes.includes("threshold")) {
    newSessions = newSessions.concat(generateThreshold(duration, pace, distance, intensity));
  }

  return newSessions;
}

function generateRegular(duration, pace, distance, intensity) {
  let regularSessions = [];

  //Generate easy
  let easy = sessionFunctions.generateEasySession(duration, pace, distance, intensity);
  if(easy != null) {
    regularSessions.push(easy);
  }
  
  //Generate normal

  //Genetate terrain

  //Generate long

  //Generate progression run

  return regularSessions;
}

function generateIntervals(duration, pace, distance, intensity) {
  let intervalsSessions = [];


  return intervalsSessions;
}

function generateThreshold(duration, pace, distance, intensity) {
  let thresholdSessions = [];


  return thresholdSessions;
}


//Takes a random session from the currentSessions array and displays one.
function displayRandomSession() {

}
