// Steps to complete:
/*
1. Create Firebase link
2. Create button for adding new trains - then update the html + update the database
3. Create a way to retrieve trains from the train database.
4. Create a way to calculate the time remaining until the next train. Using difference between start and current time. Then use moment.js formatting to set difference in months.
5. Calculate Total billed

*/

// 1. Link to Firebase
var trainData = new Firebase("https://trainschedule666.firebaseio.com/");

// 2. Button for adding Employees
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var firstTrainTime = $("#firstTrainTimeInput").val().trim();
	var trainFrequency = $("#frequencyInput").val().trim();

	console.log(firstTrainTime);

	// Creates local "temporary" object for holding employee data
	var newTrain = {
		name:  trainName,
		destination: trainDestination,
		start: firstTrainTime,
		frequency: trainFrequency
	}

	// Uploads employee data to the database
	trainData.push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.start);
	console.log(newTrain.frequency)

	// Alert
	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainTimeInput").val("");
	$("#frequencyInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var firstTrainTime = childSnapshot.val().start;
	var trainFrequency = childSnapshot.val().frequency;

	// Employee Info
	console.log(trainName);
	console.log(trainDestination);
	console.log(firstTrainTime);
	console.log(trainFrequency);

	// Prettify the employee start
	var currentTime = moment();
	console.log("current time: " + moment(currentTime).format"hh:mm")

	var trainStartPretty = moment.unix(firstTrainTime).format("HH:mm");
	console.log("train start time: "+ trainStartPretty);

	// Calculate the months worked using hardcore math
	// To calculate the months worked
	var diffTime = moment().diff(moment.unix(firstTrainTime), "minutes");
	console.log("Difference in time: " + diffTime);

	// // Calculate the total billed rate
	// var empBilled = trainCycles * trainFrequency;
	// console.log(empBilled);

	// Add each train's data into the table
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainCycles + "</td><td>" + trainFrequency + "</td></tr>");

});

