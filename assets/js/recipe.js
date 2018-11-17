

// ========================================================
//Define variables. Construct query URL to get recipe data.
// ========================================================
var queryURLbase = "https://api.edamam.com/search?&app_id=192e6853&app_key=97cc74f29550dbca8f09e9ac463a150f&from=0&to=9&q=";

// ===========================================================================
// This AJAX method performs a GET request to the queryURL to get recipe data.
// After the data comes back, search results are displayed on cards.
// ===========================================================================
function testAjax(queryURL) {
	fetch(queryURL)
	.then((resp) => resp.json())
	.then(function (data) {
        //console.log(queryURL);
        console.log(data);
        var elArray = [];
        var elements =0;
		for (var i = 0; i < 9; i++) {

			//create recipe card.
			var card = $('<div>');
			//Make recipe search results section mobile responsive.
			//On small screens, display one recipe per row.
			//On medium screens, display two recipes per row.
			//On large screens, display three recipes per row.
            

			//Create variable for recipe image and append to card.
			var img = $("<img>");
			imgAPI = data.hits[i].recipe.image;
			img.attr("src", imgAPI);
			card.append(img);

			//Variable for the recipe title/label.
			title = data.hits[i].recipe.label;
			//This appends the recipe title/label to the recipe image.
            
            var link= $(`<a href="#" style="color:white" class="addVids">`);
            link.text(title);
            card.append(link);
            // $('.recipeList').append(cardImg);
            // alert(card.html());
            elArray.push(card);
            elements++;
            if(elements == 3){
                var flex = $('<div class="flex-container">');
                flex.append(elArray);
                $('.recipeList').append(flex);
                elements = 0;
                elArray=[];
            }

		};
	});
};


// =========================
// Find button functionality
// =========================
$(".addRecipe").on("click", function (e) {
    $("#recipe-list").empty();
	// Prevent form from submitting
	e.preventDefault();

	//Grab the user input from the main word search text box.
	userInput = $("#targetRecepi").val().trim().toLowerCase();

	// Integrate user input into our ajax request
	var searchURL = queryURLbase + userInput;
	testAjax(searchURL);

	// Clear previous search
	
	$("#targetRecepi").val("");
});


