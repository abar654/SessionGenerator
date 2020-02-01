export function generateEasySession(duration, pace, distance, intensity) {

  let session = {};
  intensity = parseInt(intensity);

  if(intensity == 2) {
    pace = pace * 1.1;
    session["intensity"] = 2;
  } else if(intensity == 3 || intensity == -1) {
    session["intensity"] = 3;
  } else if(intensity == 4) {
    pace = pace * 0.9;
    session["intensity"] = 4;
  } else {
    return null;
  }

  session["type"] = "Regular";
  session["name"] = "Easy";
  session["pace"] = pace;

  let calculatedDist = duration / pace;

  if(calculatedDist < distance) {
    session["duration"] = duration;
    session["distance"] = calculatedDist;
  } else {
    session["duration"] = distance * pace;
    session["distance"] = distance;
  }

  session["comment"] = "Don't push too hard. The aim of this session is to get some training miles without putting too much load on your body. You should be able to talk effortlessly while running and the speed should be one that you could maintain for many hours.";

  return session;

}

export function generateNormalSession(duration, pace, distance, intensity) {

  let session = {};
  intensity = parseInt(intensity);

  //Decide on acceptable intensities, and paces for each
  if(intensity == 4 || intensity == -1) {
    pace = pace * 0.9;
    session["intensity"] = 4;
  } else if(intensity == 5) {
    pace = pace * 0.85;
    session["intensity"] = 5;
  } else {
    return null;
  }

  //Set the basic fields
  session["type"] = "Regular";
  session["name"] = "Normal";
  session["pace"] = pace;

  //Set the correct distance and duration
  let calculatedDist = duration / pace;

  if(calculatedDist < distance) {
    session["duration"] = duration;
    session["distance"] = calculatedDist;
  } else {
    session["duration"] = distance * pace;
    session["distance"] = distance;
  }

  //Check that this duration is appropriate for this session type
  if(session["duration"] < 15 || session["duration"] > 60) {
    return null;
  }

  session["comment"] = "Go out and do a comfortable run. Not too fast, not too slow, just what feels comfortable. You should be a bit out of breath but able to speak in long sentences. Aim for a speed that could be maintained for up to 2 hours.";

  return session;

}
