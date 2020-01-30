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

  //Check distance
  if(distance != "" && distance < 0) {
    document.getElementById("in-distance").setAttribute("style", "border-color:var(--color-fail);");
    validInputs = false;
  }

  //Check intensity
  if(intensity != "" && (intensity < 1 || intensity > 10 || !Number.isInteger(intensity))) {
    document.getElementById("in-intensity").setAttribute("style", "border-color:var(--color-fail);");
    validInputs = false;
  }

  //Get a session
  currentSessions = matchSessions(duration, pace, distance, intensity, sessionTypes);

  //Display the session
  document.getElementById("generated-session").setAttribute("style", "display: flex;");
  document.getElementById("again-button").setAttribute("style", "display: initial;");
  document.getElementById("instruction-text").setAttribute("style", "display: none;");

}

function matchSessions(duration, pace, distance, intensity, sessionTypes) {
  return [];
}
