$(document).ready(function () {
    var giphys = ["dogs", "cats", "birds", "fish"];
        
    var insert = function (giphy) {
            var body = $("#body");
            var row = $("<tr>");
            row.addClass("container");
            // Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
            //console.log(response);
            for (var k = 0; k < 10; k++){
            console.log(giphy.data[0].images.downsized.url);
                var giphypictd = $("<td>");
                //giphypictd.addClass("container");
                var giphyimg = $("<img>")
                giphyimg.attr("src", giphy.data[k].images.downsized.url);
                giphyimg.attr("alt", "giphy");
                var giphyrating = ("Rating:  " + giphy.data[k].rating);
                //console.log(giphyrating);
                giphyimg.addClass("sizedgiphy");
                giphyimg.attr("data-still", giphy.data[k].images.downsized_still.url);
                giphyimg.attr("data-giphy", giphy.data[k].images.downsized.url);
                giphyimg.attr("data-animate", "true");
                giphypictd.append(giphyimg);
                giphypictd.append("<br>");
                giphypictd.append(giphyrating);
                // Append the td elements to the new table row
                row.append(giphypictd);
            }
            
            // Append the table row to the tbody element
            body.append(row);
        }

        var toggleStates = function(){
            console.log($(this).attr("data-animate"));
            if ($(this).attr("data-animate") === "true") {
                $(this).attr("src", $(this).attr("data-still"));
                console.log($(this).attr("data-still"));
                $(this).attr("data-animate", "false");
                console.log($(this).attr("data-animate"));
            }
            else{
                //console.log($(this).attr("data-still"));
                $(this).attr("src", $(this).attr("data-giphy"));
                //console.log($(this).attr("data-animate", false));
                $(this).attr("data-animate", "true");
            }
        }

        var displayGiphyInfo = function() {
            // Returns the movie name from the data-name
            var giphyName = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphyName + "&api_key=5hn56bnAGEIKwtTRfhjFAtcU9om4YUlw&limit=10"
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                insert(response);
            });
        }

        function renderButtons(){
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
            //Clear the text box to allow for another user input
            document.getElementById("giphy-input").value = "";
        });

        //Event handler - listens for a giphy button click
        $(document).on("click", ".giphy", displayGiphyInfo);
        $(document).on("click", ".sizedgiphy", toggleStates);

        // Calling the renderButtons function to display the initial list of giphys
        renderButtons();
});