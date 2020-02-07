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

  session["comment"] = "Don't push too hard. The aim of this session is to get some training miles without putting too much load on your body.<br><br>You should be able to talk effortlessly while running and the speed should be one that you could maintain for many hours.";

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

export function generateTerrainSession(duration, pace, distance, intensity) {

  let session = {};
  intensity = parseInt(intensity);

  //Decide on acceptable intensities, and paces for each
  if(intensity == 4 || intensity == -1) {
    session["intensity"] = 4;
  } else if(intensity == 5) {
    pace = pace * 0.9;
    session["intensity"] = 5;
  } else {
    return null;
  }

  //Set the basic fields
  session["type"] = "Regular";
  session["name"] = "Terrain";
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

  session["comment"] = "Get completely off-road (even away from the trails if possible). This will help build your strength and also reduce the strain on any repetitive stress niggles. <br><br>Aim for a speed that is not too fast, not too slow, just what feels comfortable. You should be a bit out of breath but able to speak in long sentences. You should be able to maintain the speed for up to 2 hours.";

  return session;

}

export function generateLongSession(duration, pace, distance, intensity) {

  let session = {};
  intensity = parseInt(intensity);

  //Decide on acceptable intensities, and paces for each
  if(intensity == 3) {
    session["intensity"] = 3;
  } else if(intensity == 4 || intensity == -1) {
    pace = pace * 0.95;
    session["intensity"] = 4;
  } else if(intensity == 5) {
    pace = pace * 0.9;
    session["intensity"] = 5;
  } else {
    return null;
  }

  //Set the basic fields
  session["type"] = "Regular";
  session["name"] = "Long";
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
  if(session["duration"] < 60 || session["duration"] > 150) {
    return null;
  }

  session["comment"] = "The focus of this session is duration, not speed. <br><br>Aim for a speed that is not too fast, but not too slow. You should be a bit out of breath but able to speak in long sentences. Try doing this session with friends and talk at the same time  to keep it interesting.";

  return session;

}

export function generateProgressionSession(duration, pace, distance, intensity) {

  let session = {};
  intensity = parseInt(intensity);

  //Decide on acceptable intensities, and paces for each
  if(intensity >= 5 || intensity == -1) {
    session["intensity"] = 6;
    session["pace"] = "Varied";
  } else {
    return null;
  }

  //Set the basic fields
  session["type"] = "Regular";
  session["name"] = "Progression";

  //Set the correct paces
  let pace1 = pace * 0.95;
  let pace2 = pace * 0.85;
  let pace3 = pace * 0.75;

  //60% at pace1, 20% at pace2, 20% at pace3
  let calculatedDist = duration*0.6/pace1 + duration*0.2/pace2 + duration*0.2/pace3;

  if(calculatedDist < distance) {
    session["duration"] = duration;
    session["distance"] = calculatedDist;
  } else {
    //We need to calculate how long it will take to do the desired distance
    session["duration"] = distance/(0.6/pace1 + 0.2/pace2 + 0.2/pace3);
    session["distance"] = distance;
  }

  //Check that this duration is appropriate for this session type
  if(session["duration"] < 60 || session["duration"] > 150) {
    return null;
  }

  session["comment"] = "The focus of the progression run is to build endurance and also practice pushing yourself when you are fatigued. <br><br>You should run the first 60% of the time at approximately " + parseFloat(pace1).toFixed(2) + " mins/km, the next 20% at " + parseFloat(pace2).toFixed(2) + " mins/km, and the final 20% at " + parseFloat(pace3).toFixed(2) + " mins/km.";

  return session;

}

export function generateThresholdRunSession(duration, pace, distance, intensity) {

  let session = {};
  intensity = parseInt(intensity);

  //Decide on acceptable intensities, and paces for each
  if(intensity >= 7 || intensity == -1) {
    session["intensity"] = 7;
    pace = pace * 0.8;
  } else {
    return null;
  }

  //Set the basic fields
  session["type"] = "Tempo/Threshold";
  session["name"] = "Threshold Run";
  session["pace"] = pace;

  //Calculate the distance based on pace and duration
  let calculatedDist = duration/pace;

  if(calculatedDist < distance) {
    session["duration"] = duration;
    session["distance"] = calculatedDist;
  } else {
    //We need to calculate how long it will take to do the desired distance
    session["duration"] = distance * pace;
    session["distance"] = distance;
  }

  //Check that this duration is appropriate for this session type
  if(session["duration"] < 35 || session["duration"] > 50) {
    return null;
  }

  session["comment"] = "The threshold run aims to increase your body's ability to process lactate. <br><br>You should aim to run at a speed that is comfortably hard and that you could maintain for 60 to 90 minutes. You should only be able to speak in short sentences and should out of breath but not hyperventilating. Your legs should also not feel heavy.";

  return session;

}

export function generateTempoRunSession(duration, pace, distance, intensity) {

  let session = {};
  intensity = parseInt(intensity);

  //Decide on acceptable intensities, and paces for each
  if(intensity >= 8 || intensity == -1) {
    session["intensity"] = 8;
    pace = pace * 0.7;
  } else {
    return null;
  }

  //Set the basic fields
  session["type"] = "Tempo/Threshold";
  session["name"] = "Tempo Run";
  session["pace"] = pace;

  //Calculate the distance based on pace and duration
  let calculatedDist = duration/pace;

  if(calculatedDist < distance) {
    session["duration"] = duration;
    session["distance"] = calculatedDist;
  } else {
    //We need to calculate how long it will take to do the desired distance
    session["duration"] = distance * pace;
    session["distance"] = distance;
  }

  //Check that this duration is appropriate for this session type
  if(session["duration"] < 15 || session["duration"] > 35) {
    return null;
  }

  session["comment"] = "The tempo run aims to get you used to running at a high speed. <br><br>You should aim to run at a speed that is relatively hard, something around your 10km pace, and that you could maintain for 30 to 60 minutes. You should only be able to speak a few words at a time and should be very short of breath and hyperventilating slightly.";

  return session;

}

export function generateThresholdShortIntSession(duration, pace, distance, intensity) {

  let session = {};
  intensity = parseInt(intensity);

  //Decide on acceptable intensities, and paces for each
  if(intensity >= 7 || intensity == -1) {
    session["intensity"] = 7;
  } else {
    return null;
  }

  //Set the basic fields
  session["type"] = "Tempo/Threshold";
  session["name"] = "Threshold Ints";
  session["pace"] = pace * 0.8;

  //Find the number of intervals
  //Interval = 10 mins, Rest = 2 mins
  let repDistance = 10 / (pace * 0.8) + 2 / pace;
  let numReps = 0;

  //Increase the number of reps so long as we don't go past the desired duration or distance
  while(numReps * 12 <= duration && numReps * repDistance <= distance) {
    numReps++;
  }

  //Roll back one rep, as the last rep we added broke the condition
  numReps--;

  //Calculate the duration and Distance
  session["duration"] = numReps * 12;
  session["distance"] = numReps * repDistance;

  //Check that this duration is appropriate for this session type
  if(session["duration"] < 35 || session["duration"] > 70) {
    return null;
  }

  session["comment"] = "Run " + numReps + " sets of 10 minutes at threshold pace with 2 minutes easy rest between each. <br><br>Threshold intervals aim to increase your body's ability to process lactate. You should aim to run the intervals at a speed that is comfortably hard and that you could maintain for 60 to 90 minutes. At this pace you should only be able to speak in short sentences and should out of breath but not hyperventilating. Your legs should also not feel heavy.";

  return session;

}

export function generateThresholdLongIntSession(duration, pace, distance, intensity) {

  let session = {};
  intensity = parseInt(intensity);

  //Decide on acceptable intensities, and paces for each
  if(intensity >= 7 || intensity == -1) {
    session["intensity"] = 7;
  } else {
    return null;
  }

  //Set the basic fields
  session["type"] = "Tempo/Threshold";
  session["name"] = "Threshold Ints";
  session["pace"] = pace * 0.8;

  //Find the number of intervals
  //Interval = 15 mins, Rest = 3 mins
  let repDistance = 15 / (pace * 0.8) + 3 / pace;
  let numReps = 0;

  //Increase the number of reps so long as we don't go past the desired duration or distance
  while(numReps * 18 <= duration && numReps * repDistance <= distance) {
    numReps++;
  }

  //Roll back one rep, as the last rep we added broke the condition
  numReps--;

  //Calculate the duration and Distance
  session["duration"] = numReps * 18;
  session["distance"] = numReps * repDistance;

  //Check that this duration is appropriate for this session type
  if(session["duration"] < 35 || session["duration"] > 70) {
    return null;
  }

  session["comment"] = "Run " + numReps + " sets of 15 minutes at threshold pace with 3 minutes easy rest between each. <br><br>Threshold intervals aim to increase your body's ability to process lactate. You should aim to run the intervals at a speed that is comfortably hard and that you could maintain for 60 to 90 minutes. At this pace you should only be able to speak in short sentences and should out of breath but not hyperventilating. Your legs should also not feel heavy.";

  return session;

}

export function generateTempoShortIntSession(duration, pace, distance, intensity) {

  let session = {};
  intensity = parseInt(intensity);

  //Decide on acceptable intensities, and paces for each
  if(intensity >= 8 || intensity == -1) {
    session["intensity"] = 8;
  } else {
    return null;
  }

  //Set the basic fields
  session["type"] = "Tempo/Threshold";
  session["name"] = "Tempo Ints";
  session["pace"] = pace * 0.7;

  //Find the number of intervals
  //Interval = 5 mins, Rest = 1.5 mins
  let repDistance = 5 / (pace * 0.7) + 1.5 / pace;
  let numReps = 0;

  //Increase the number of reps so long as we don't go past the desired duration or distance
  while(numReps * 6.5 < duration && numReps * repDistance < distance) {
    numReps++;
  }

  //Roll back one rep, as the last rep we added broke the condition
  numReps--;

  //Calculate the duration and Distance
  session["duration"] = numReps * 6.5;
  session["distance"] = numReps * repDistance;

  //Check that this duration is appropriate for this session type
  if(session["duration"] < 18 || session["duration"] > 45) {
    return null;
  }

  session["comment"] = "Run " + numReps + " sets of 5 minutes at tempo pace with 1.5 minutes easy rest between each. <br><br>Tempo intervals aim to get you used to running at a high speed. You should aim to run the intervals at a speed that is relatively hard, something around your 10km pace, and that you could maintain for 30 to 60 minutes. You should only be able to speak a few words at a time and should be very short of breath and hyperventilating slightly.";

  return session;

}

export function generateTempoLongIntSession(duration, pace, distance, intensity) {

  let session = {};
  intensity = parseInt(intensity);

  //Decide on acceptable intensities, and paces for each
  if(intensity >= 8 || intensity == -1) {
    session["intensity"] = 8;
  } else {
    return null;
  }

  //Set the basic fields
  session["type"] = "Tempo/Threshold";
  session["name"] = "Tempo Ints";
  session["pace"] = pace * 0.7;

  //Find the number of intervals
  //Interval = 10 mins, Rest = 3 mins
  let repDistance = 10 / (pace * 0.7) + 3 / pace;
  let numReps = 0;

  //Increase the number of reps so long as we don't go past the desired duration or distance
  while(numReps * 13 <= duration && numReps * repDistance <= distance) {
    numReps++;
  }

  //Roll back one rep, as the last rep we added broke the condition
  numReps--;

  //Calculate the duration and Distance
  session["duration"] = numReps * 13;
  session["distance"] = numReps * repDistance;

  //Check that this duration is appropriate for this session type
  if(session["duration"] < 18 || session["duration"] > 45) {
    return null;
  }

  session["comment"] = "Run " + numReps + " sets of 10 minutes at tempo pace with 3 minutes easy rest between each. <br><br>Tempo intervals aim to get you used to running at a high speed. You should aim to run the intervals at a speed that is relatively hard, something around your 10km pace, and that you could maintain for 30 to 60 minutes. You should only be able to speak a few words at a time and should be very short of breath and hyperventilating slightly.";

  return session;

}

export function generateHillIntSession(duration, pace, distance, intensity) {

  let session = {};
  intensity = parseInt(intensity);

  //Decide on acceptable intensities, and paces for each
  if(intensity >= 8 || intensity == -1) {
    session["intensity"] = 8;
  } else {
    return null;
  }

  //Set the basic fields
  session["type"] = "Intervals";
  session["name"] = "Hill Ints";
  session["pace"] = "Varied";

  //Set duration and distance
  session["duration"] = 24; //8 sets of 1 + 2
  session["distance"] = 4; //8 sets of approx 250 up + 250 down

  //Check that this duration and distance match
  if(duration < session["duration"] || distance < session["distance"]) {
    return null;
  }

  session["comment"] = "Find a moderately steep hill (not the kind of hill you need stairs to go up). Run 8 sets of 1 min up at a hard pace with 2 mins easy recovery back down. (Easier - take 2 sets off, Harder - add 2 sets).<br><br> Hill intervals are great for building strength and power. During the intervals you should only be able to speak in monosyllables and feel as though you are hyperventilating, however, it still should not be an all out sprint. Remember you need to get through all 8 sets.";

  return session;

}

export function generateMonaFartlekSession(duration, pace, distance, intensity) {

  let session = {};
  intensity = parseInt(intensity);

  //Decide on acceptable intensities, and paces for each
  if(intensity >= 7 || intensity == -1) {
    session["intensity"] = 8;
  } else {
    return null;
  }

  //Set the basic fields
  session["type"] = "Intervals";
  session["name"] = "Mona Fartlek";
  session["pace"] = pace * 0.67; //Around 5km pace

  //Set duration and distance
  session["duration"] = 20; //90 x 2, 60 x 4, 30 x 4, 15 x 4, plus equal rest
  session["distance"] = 10 / (pace * 0.67) + 10 / pace; //Half easy, half hard

  //Check that this duration and distance match
  if(duration < session["duration"] || distance < session["distance"]) {
    return null;
  }

  session["comment"] = "The classic: 2 x 90s, 4 x 60s, 4 x 30s, 4 x 15s hard. Each interval is followed by the same amount of time at easy pace e.g. 90s hard is followed by 90s easy. <br><br>During the intervals you should only be able to speak in monosyllables and feel as though you are hyperventilating, however, it still should not be an all out sprint. Run the hard intervals just fast enough that you can still run the rests at an easy pace (not a very slow jog or walk).";

  return session;

}

export function generatePickupsSession(duration, pace, distance, intensity) {

  let session = {};
  intensity = parseInt(intensity);

  //Decide on acceptable intensities, and paces for each
  if(intensity >= 8 || intensity == -1) {
    session["intensity"] = 8;
  } else {
    return null;
  }

  //Set the basic fields
  session["type"] = "Intervals";
  session["name"] = "Pickups";
  session["pace"] = pace * 0.67;

  //Find the number of intervals
  //Interval = 1 mins, Rest = 1 mins
  let repDistance = 1 / (pace * 0.67) + 1 / pace;
  let numReps = 0;

  //Increase the number of reps so long as we don't go past the desired duration or distance
  while(numReps * 2 <= duration && numReps * repDistance <= distance) {
    numReps++;
  }

  //Roll back one rep, as the last rep we added broke the condition
  numReps--;

  //Calculate the duration and Distance
  session["duration"] = numReps * 2;
  session["distance"] = numReps * repDistance;

  //Check that this duration is appropriate for this session type
  if(session["duration"] < 20 || session["duration"] > 40) {
    return null;
  }

  session["comment"] = "Run " + numReps + " sets of 1 minute at hard (approx. 5km pace) with 1 minute easy between each. <br><br>During the intervals you should only be able to speak in monosyllables and feel as though you are hyperventilating, however, it still should not be an all out sprint. Run the hard intervals just fast enough that you can still run the rests at an easy pace (not a very slow jog or walk).";

  return session;

}
