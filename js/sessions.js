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
