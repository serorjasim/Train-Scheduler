var config = {
  apiKey: "AIzaSyDc1ACkJLsuZadkJieHcZ1GoyLEcO_rpv0",
  authDomain: "train-project-cdd9e.firebaseapp.com",
  databaseURL: "https://train-project-cdd9e.firebaseio.com",
  projectId: "train-project-cdd9e",
  storageBucket: "",
  messagingSenderId: "598290953557"
};
firebase.initializeApp(config);

var database = firebase.database();
var frequency;
var userStartTime;

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  userStartTime = $("#first-train-input")
    .val()
    .trim();

  // Grabs user input
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTrain = moment(userStartTime, "HH:mm").format("X");
  frequency = $("#frequency-input")
    .val()
    .trim();

  // Uploads train data to the database
  database.ref().push({
    name: trainName,
    destination: destination,
    start: firstTrain,
    frequency: frequency
  });

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  var startTimeAmPm = moment(childSnapshot.val().start, "X");

  var timeDifference = moment().diff(moment(startTimeAmPm), "minutes");

  var timePassed = timeDifference % childSnapshot.val().frequency;

  var minutesAway = childSnapshot.val().frequency - timePassed;

  var nextArrival = moment()
    .add(minutesAway, "minutes")
    .format("hh:mm A");

  $("#main-table").append(
    "<tr><td>" +
      childSnapshot.val().name +
      "</td><td>" +
      childSnapshot.val().destination +
      "</td><td>" +
      childSnapshot.val().frequency +
      "</td><td>" +
      nextArrival +
      "</td><td>" +
      minutesAway +
      "</td><td>"
  );
});
