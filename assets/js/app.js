// Link to Firebase
var trainData = new Firebase("https://trainschedule666.firebaseio.com/");

// Button for adding Trains
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var firstTrainTime = $("#firstTrainTimeInput").val().trim();
	var trainFrequency = $("#frequencyInput").val().trim();

	// Creates local "temporary" object for holding new train data
	var newTrain = {
		name:  trainName,
		destination: trainDestination,
		start: firstTrainTime,
		frequency: trainFrequency
	}

	// Uploads new train data to the database
	trainData.push(newTrain);

	// Clears all of the text-boxes after sending to database
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainTimeInput").val("");
	$("#frequencyInput").val("");

	// Prevents moving to new page
	return false;
});


// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var firstTrainTime = childSnapshot.val().start;
	var trainFrequency = childSnapshot.val().frequency;

	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(firstTrainTime,"hh:mm").subtract(1, "years");

	// Prettify the train start
	var currentTime = moment();

	// Difference between current time and train's first time
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

	// Time apart (remainder)
	var tRemainder = diffTime % trainFrequency;

	// Minutes until train
	var tMinutesTillTrain = trainFrequency - tRemainder;

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");

	// Add each train's data into the table
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});