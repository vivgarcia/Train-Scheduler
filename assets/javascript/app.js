  // Your web app's Firebase configuration
    var firebaseConfig = {
    apiKey: "AIzaSyBUJn1ZC8fjOha_GMIbjYOyfMaepE6k9h4",
    authDomain: "train-project-vgarcia.firebaseapp.com",
    databaseURL: "https://train-project-vgarcia.firebaseio.com",
    projectId: "train-project-vgarcia",
    storageBucket: "train-project-vgarcia.appspot.com",
    messagingSenderId: "225604754998",
    appId: "1:225604754998:web:e4f1edad1172c23ef78297"
    };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var time = "";
    var frequency = "";

    setInterval(function(startTime) {
      $("#timer").html(moment().format('hh:mm a'))
    }, 1000);

    $("#submitButton").on("click", function(event){
      // prevents from refreshing page
      event.preventDefault();
      // retrieves data from inputs and stores it in a val
      trainName = $("#newTrainName").val().trim();
      destination = $("#newDestination").val().trim();
      time = $("#newFirstTrainTime").val().trim();
      frequency = $("#newTrainFrequency").val().trim();
      
      // console.log(trainName);
      // console.log(destination);
      // console.log(time);
      // console.log(frequency);
      // pushes value into database 
      database.ref().push({
        name: trainName,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      })
      // clears input fields
      $("#newTrainName").val("");
      $("#newDestination").val("");
      $("#newFirstTrainTime").val("");
      $("#newTrainFrequency").val("");
    })

    database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      var train = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var firstTrainTime = childSnapshot.val().time;
      var frequency = childSnapshot.val().frequency;
      var dateAdded = childSnapshot.val().dateAdded;

      var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      //determine Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));

      //get timer functioning and display to timer span
      $("#timer").text(currentTime.format("hh:mm a"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % frequency;
      console.log("Remainder: " + tRemainder);

      //determine Minutes Away
      var minutesAway = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + minutesAway);

      //determine Next Train Arrival
      var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
      console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm a"));

      $("#trainData").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>")
    });