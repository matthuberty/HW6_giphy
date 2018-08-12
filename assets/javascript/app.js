$(document).ready(function () {
    var giphys = ["dogs", "cats", "birds", "fish"];
        
    var insert = function (movie) {
            var body = $("#body");
            var row = $("<tr>");
            // Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
            //console.log(response);
            var Title = $("<td>").text(movie.Title);
            var Year = $("<td>").text(movie.Year);
            var Actor = $("<td>").text(movie.Actors);
            // Append the td elements to the new table row
            row.append(Title, Year, Actor);
            //row.append(Year);
            //row.append(Actor);
            // Append the table row to the tbody element
            body.append(row);
        }

        function renderButtons(){
            console.log("renderButtons has been called.");
            //Delete the content inside of giphys-view prior to adding new giphys
            //This is necessary.  Otherwise, you will have repeat buttons
            $("#giphys-view").empty();
            //Loop through the array of giphys, generating buttons for each giphy, one-by-one
            for (var i = 0; i < giphys.length; i++){
                //Create a new button, dynamically, via JQuery
                var newButton = $("<button>");
                //Add the class to the button
                newButton.addClass("giphy");
                //Add the data attribute with the value of the giphy at index i
                newButton.attr("data-name", giphys[i]);
                //Add text to the button, via the Giphys array
                newButton.text(giphys[i]);
                //Append the button to the div, id="giphys-view"
                $("#giphys-view").append(newButton);
            }
        }
        // var searchOMDB = function (movie) {
        //     var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        //     $.ajax({
        //         url: queryURL,
        //         method: "GET"
        //     }).then(function (response) {
        //         console.log(response);
        //         insert(response);
        //     });
        // }

        //searchOMDB("Mr. Nobody");
        //searchOMDB("Inception");
        //searchOMDB("Wedding Crashers");
    
        //This function handles events where the Giphy Search button is clicked
        $("#find-giphy").on("click", function(event){
            //Prevent the submit button from trying to send a form. 
            //Use a submit button instead of a regular button - to allow
            //user to hit the "enter" key, instead of clicking
            event.preventDefault();
            //Grab the text the user types into the input field;
            var giphy = $("input").val().trim();
            //Add the new giphy into the giphys array.
            giphys.push(giphy);
            //call the renderButtons function.  
            //this renders the list of giphys.
            renderButtons();
        });

        // Calling the renderButtons function to display the initial list of giphys
        renderButtons();
});