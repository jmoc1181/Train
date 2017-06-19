  // Initialize Firebase
  var config = {
    apiKey: "",
    authDomain: "train-6ba6c.firebaseapp.com",
    databaseURL: "https://train-6ba6c.firebaseio.com",
    projectId: "train-6ba6c",
    storageBucket: "",
    messagingSenderId: "747406045119"
};
  firebase.initializeApp(config);


  var database = firebase.database(); 

  function displayTime() {
    var time = moment().format('hh:mm:ss');
    $('#clock').html(time);
    setTimeout(displayTime, 1000);
}

$(document).ready(function() {
    displayTime();

});


  $("#submit-bid").on("click", function(event) {
      // This line prevents the page from refreshing when a user hits "enter".
      event.preventDefault();
      //get input
      var name = $("#name").val().trim();
      var place = $("#place").val().trim();
      var start = $("#start").val().trim();
      var frequency = $("#frequency").val().trim();



    database.ref().push({
    //add new data to firebase
      NAME:name, 
      PLACE:place, 
      START:start,
      FREQUENCY:frequency

  })
});

        database.ref().on("child_added", function(childSnapshot) { 
        var name = childSnapshot.val().NAME;    
        var place = childSnapshot.val().PLACE;
        var frequency = childSnapshot.val().FREQUENCY;
        var start = childSnapshot.val().START;
        console.log(name);
        console.log("START: " + start);
        console.log("remainder ADDED: " + frequency);


            var firstTimeConverted = moment(start, "HH:mm");
            console.log("TEST: " + firstTimeConverted);


            var now = moment();
            console.log("CURRENT TIME: " + moment(now).format("HH:mm"));


            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);


            var tRemainder = diffTime % frequency;
            console.log("REMAINDER: " + tRemainder);

                // Minute Until Train
            var tMinutesTillTrain = frequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

                // Next Train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            var theNextTrain = moment(nextTrain).format("hh:mm"); 
            
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


 
            var newRow = $("<tr>"); 
            newRow.html("<td>" + name + "</td><td>" + place + "</td><td>" + frequency + "</td><td>" + theNextTrain + "</td><td>" + tMinutesTillTrain + "</td>");
            
            $('#dataentry').append(newRow);     


});





