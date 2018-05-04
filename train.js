var config = {
  apiKey: "AIzaSyBuYayypa6fprKzrNKspCJhoTXABwoZvW4",
  authDomain: "timesheet-d7b77.firebaseapp.com",
  databaseURL: "https://timesheet-d7b77.firebaseio.com",
  projectId: "timesheet-d7b77",
  storageBucket: "",
  messagingSenderId: "395890372675"
};
firebase.initializeApp(config);

var database = firebase.database();

// Initial Values
var name = "";
var role = "";
var startDate = "01/01/2001";
var startFormat = "MM/DD/YYYY";
var monthlyRate = 0;
var monthsWorked = 0;
var totalBilled = "";

// Capture Button Click
$("#add-user").on("click", function(event) {
  event.preventDefault();

  name = $("#name-input")
    .val()
    .trim();
  role = $("#role-input")
    .val()
    .trim();
  startDate = moment(
    $("#start-input")
      .val()
      .trim()
  ).format("MM/DD/YYYY");
  monthlyRate = $("#rate-input")
    .val()
    .trim();
  var convertedDate = moment(startDate, startFormat);
  monthsWorked = Math.abs(moment(convertedDate).diff(moment(), "months"));
  totalBilled = "$ " + monthlyRate * monthsWorked;

  database.ref().push({
    name: name,
    role: role,
    start: startDate,
    months: monthsWorked,
    rate: monthlyRate,
    total: totalBilled,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  //Add Employee Info into the table
  $("#maintable").append(
    "<tr><td scope='row'>" +
      childSnapshot.val().name +
      "</td><td scope='row'>" +
      childSnapshot.val().role +
      "</td><td scope='row'>" +
      childSnapshot.val().start +
      "</td><td scope='row'>" +
      monthsWorked +
      "</td><td scope='row'>" +
      childSnapshot.val().rate +
      "</td><td scope='row'>" +
      totalBilled +
      "</td></tr>"
  );
});
