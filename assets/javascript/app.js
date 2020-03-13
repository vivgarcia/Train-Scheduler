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

    $("#submitButton").on("click", function(event){
      event.preventDefault();

      trainName = $("#newTrainName").val().trim();
      destination = $("#newDestination").val().trim();
      time = $("#newFirstTrainTime").val().trim();
      frequency = $("#newTrainFrequency").val().trim();
      
      // console.log(trainName);
      // console.log(destination);
      // console.log(time);
      // console.log(frequency);

      database.ref().push({
        name: trainName,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      })
    })

    database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().time);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().dateAdded);
    });