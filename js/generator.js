import * as sessionFunctions from "./sessions.js";
checkCheckboxes();
document.getElementById("generate-button").onclick = generate;
let currentSessions = [];
let currentDisplayedIndex = -1;

function checkCheckboxes() {
  let inputs = document.getElementsByTagName("input");
  for(let input of inputs){
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
  for(let input of inputs){
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
  } else if(intensity < 1 || intensity > 10) {
    document.getElementById("in-intensity").setAttribute("style", "border-color:var(--color-fail);");
    validInputs = false;
  }

  if(validInputs) {

    //Generate the sessions, then get a session and display it
    currentSessions = matchSessions(duration, pace, distance, intensity, sessionTypes);
    currentDisplayedIndex = -1;

    if(currentSessions.length > 0) {

      //Display the session-container
      document.getElementById("generated-session").setAttribute("style", "display: flex;");
      document.getElementById("again-button").setAttribute("style", "display: initial;");
      document.getElementById("again-button").onclick = displayRandomSession;
      document.getElementById("instruction-text").setAttribute("style", "display: none;");
      document.getElementById("generate-button").textContent = "RE-GENERATE";

      displayRandomSession();

    } else {

      //Show a message to let the user know that no sessions could be generated.
      let instructionText = document.getElementById("instruction-text");
      instructionText.setAttribute("style", "color: var(--color-fail); display: initial;");
      instructionText.textContent = "No sessions could be generated. Your requirements may be too strict or conflicting. You may need to select other session types to meet your requirements."
    }

  } else {

    //Display an error message that inputs were invalid
    let instructionText = document.getElementById("instruction-text");
    instructionText.setAttribute("style", "color: var(--color-fail); display: initial;");
    instructionText.textContent = "Your inputs were invalid. Please check that your inputs match the required formats."

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

function addSession(session, sessionsArray) {
  if(session != null) {
    sessionsArray.push(session);
  }
}

function generateRegular(duration, pace, distance, intensity) {
  let regularSessions = [];

  //Generate easy
  addSession(sessionFunctions.generateEasySession(duration, pace, distance, intensity), regularSessions);

  //Generate normal
  addSession(sessionFunctions.generateNormalSession(duration, pace, distance, intensity), regularSessions);

  //Genetate terrain
  addSession(sessionFunctions.generateTerrainSession(duration, pace, distance, intensity), regularSessions);

  //Generate long
  addSession(sessionFunctions.generateLongSession(duration, pace, distance, intensity), regularSessions);

  //Generate progression run
  addSession(sessionFunctions.generateProgressionSession(duration, pace, distance, intensity), regularSessions);

  return regularSessions;
}

function generateIntervals(duration, pace, distance, intensity) {
  let intervalsSessions = [];


  return intervalsSessions;
}

function generateThreshold(duration, pace, distance, intensity) {
  let thresholdSessions = [];

  //Threshold run
  addSession(sessionFunctions.generateThresholdRunSession(duration, pace, distance, intensity), thresholdSessions);

  //Threshold intervals long
  addSession(sessionFunctions.generateThresholdLongIntSession(duration, pace, distance, intensity), thresholdSessions);

  //Threshold intervals short
  addSession(sessionFunctions.generateThresholdShortIntSession(duration, pace, distance, intensity), thresholdSessions);

  //Tempo run
  addSession(sessionFunctions.generateTempoRunSession(duration, pace, distance, intensity), thresholdSessions);

  //Tempo intervals long
  addSession(sessionFunctions.generateTempoLongIntSession(duration, pace, distance, intensity), thresholdSessions);

  //Tempo intervals short
  addSession(sessionFunctions.generateTempoShortIntSession(duration, pace, distance, intensity), thresholdSessions);

  return thresholdSessions;
}


//Takes a random session from the currentSessions array and displays one.
function displayRandomSession() {

  //Get a session from the list at random
  //Make sure it isn't the same session currently being displayed
  let randomIndex = Math.floor(Math.random() * currentSessions.length);
  if(currentSessions.length > 1 && randomIndex == currentDisplayedIndex) {
    if(randomIndex == 0) {
      randomIndex++;
    } else {
      randomIndex--;
    }
  }
  currentDisplayedIndex = randomIndex;
  let nextSession = currentSessions[randomIndex];

  //Display the session
  document.getElementById("sess-name-heading").textContent = nextSession["name"];
  document.getElementById("sess-name").textContent = nextSession["name"];
  document.getElementById("sess-type").textContent = nextSession["type"];
  document.getElementById("sess-distance").textContent = parseFloat(nextSession["distance"]).toFixed(2) + "km";
  document.getElementById("sess-duration").textContent = parseFloat(nextSession["duration"]).toFixed() + "mins";
  document.getElementById("sess-intensity").textContent = nextSession["intensity"];
  document.getElementById("sess-comment").textContent = nextSession["comment"];

  if(isNaN(nextSession["pace"])) {
    document.getElementById("sess-pace").textContent = nextSession["pace"];
  } else {
    document.getElementById("sess-pace").textContent = parseFloat(nextSession["pace"]).toFixed(2) + " mins/km";
  }

}
