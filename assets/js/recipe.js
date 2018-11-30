$(".recipeInfo").hide();

var queryURLbase = "https://api.edamam.com/search?&app_id=192e6853&app_key=97cc74f29550dbca8f09e9ac463a150f&from=0&to=12&q=";
var ingShowList = [];
var ingredientList = [];
var ingredientLength = [];
var dietList = [];
var healthList = [];
var digests = [];
var digestValues = [];
var calories = [];
var servings = [];
var weights = [];
var cookTimes = [];
var instructions = [];
var imageURL = [];
var labelList = [];

function doAjax(queryURL) {
	fetch(queryURL)
		.then((resp) => resp.json())
		.then(function (data) {
			console.log(data);
			 
			 ingredientList = [];
			 ingredientLength = [];
			 dietList = [];
			 healthList = [];
			 digests = [];
			 calories = [];
			 servings = [];
			 weights = [];
			 cookTimes = [];
			 instructions = [];
			 imageURL = [];
			 labelList = [];

			var flex = $('<div class="main_portfolio_content">');
		

			for (var i = 0; i < 12; i++) {

				var ingList = [];
				var dList = [];
				var hList = [];

				var digestList = $(`<table class="table-condensed">
								<thead class="thead-dark">
								<tr>
									<th scope="col">Nutrition facts</th>
									<th scope="col">Total (per serving)</th>
									<th scope="col">Daily %</th>

								</tr>
								</thead>
								<tbody>`
						);

				for (var j = 0; j < data.hits[i].recipe.ingredientLines.length; j++) {
					var ing = data.hits[i].recipe.ingredientLines[j];
					
					ingList.push(`<li>${ing}</li>`)
				}

				for (var j = 0; j < data.hits[i].recipe.dietLabels.length; j++) {
					var diet = data.hits[i].recipe.dietLabels[j];
					
					dList.push(`<li>${diet}</li>`)
				
				}

				for (var j = 0; j < data.hits[i].recipe.healthLabels.length; j++) {
					var health = data.hits[i].recipe.healthLabels[j];
					
					hList.push(`<li>${health}</li>`)
					
				}

				digestValues[i] = {};

				for (var j = 0; j < data.hits[i].recipe.digest.length; j++) {
					var dig = data.hits[i].recipe.digest[j].label;
					let unit = data.hits[i].recipe.digest[j].unit;

					var digTotal = data.hits[i].recipe.digest[j].total / data.hits[i].recipe.yield;
					digTotal = digTotal.toFixed(0);

					var dailyTotal = data.hits[i].recipe.digest[j].daily/ data.hits[i].recipe.yield;
					dailyTotal = dailyTotal.toFixed(0);

					digestValues[i][dig] = {
						digTotal,
						dailyTotal
					};

					digestList.append(`<tr class="table-warning"><td class="table-warning">${dig}</td><td class="table-warning">${digTotal} ${unit}</td><td class="table-warning">${dailyTotal} %</td></tr>`)
				}

				
				servings.push(data.hits[i].recipe.yield);

				var caloriesFixed = data.hits[i].recipe.calories / data.hits[i].recipe.yield
				calories.push(caloriesFixed.toFixed(0));
				weights.push(data.hits[i].recipe.totalWeight);
				cookTimes.push(data.hits[i].recipe.totalTime);
				instructions.push(data.hits[i].recipe.url);
				imageURL.push(data.hits[i].recipe.image);
				labelList.push(data.hits[i].recipe.label);
				ingredientLength.push(data.hits[i].recipe.ingredientLines.length);
				digests.push(digestList);
				ingredientList.push(ingList);
				dietList.push(dList);
				healthList.push(hList);

				var card = $('<div class="col-md-3 col-sm-4 col-xs-6 single_portfolio_text">');

				var img = $("<img>");
				var txtdiv = $('<div class="portfolio_images_overlay text-center">');
				var tit = $('<h6>')
				title = data.hits[i].recipe.label;
				var redBtn = $(`<a data-content='${i}' link-data='${title}' class="btn btn-primary addVids">Click here</a>`);
				img.attr("src", imageURL);
				card.append(img);
				tit.text(title);
				txtdiv.append(tit);
				txtdiv.append(redBtn);
				card.append(txtdiv);
				flex.append(card);
			};

			$('.recipeList').html(flex);
			
		});
};

$(document).on('click', '.addVids', function () {
	$('.article').empty();
	$('.article').append(`<button type="button" class="btn btn-primary back">Back</button>`);
	$('.article').append('<hr>');

	//Top Row - Image/Title/Link to Recipe Site
	var topRow = $('<div class = "row" id = "recipe-top-row">');
	var imageDiv = $('<div class = "col-md-4">')
	var img = $('<img class = "img-fluid img-thumbnail">');
	img.attr("src", imageURL[parseInt($(this).attr('data-content'))]);
	imageDiv.html(img);
	var titleDiv = $('<div class = "col-md-8">')
	titleDiv.html(`<h2 class = "display-4">${labelList[parseInt($(this).attr('data-content'))]}</h2>`);
	titleDiv.append(`<a target="_blank" href="${instructions[$(this).attr('data-content')]}"><h4>Click here to see full recipe</h4>`)
	topRow.append(imageDiv).append(titleDiv);
	$('.article').append(topRow);
	$('.article').append('<hr>');

	//Second Row - Ingredients/Calories/Servings/Diet/Health
	var secondRow = $('<div class = "row">');
	var ingDiv = $('<div class = "col-md-6">');
	var ingCard = $('<div class="card">');
	var ingCardHeader = $('<div class = "card-header">');
	var ingCardBody =  $('<div class = "card-body">')
	$(ingCardHeader).html(`<h5>${ingredientLength[parseInt($(this).attr('data-content'))]} Ingredients</h5>`);
	$(ingCardBody).html(ingredientList[parseInt($(this).attr('data-content'))]);
	$(ingCard).html(ingCardHeader).append(ingCardBody);
	$(ingDiv).html(ingCard);

	var nutrDiv = $('<div class = "col-md-6">');
	var nutrRow = $('<div class = "row">');
	var calDiv = $('<div class = "col-md-6">');
	var servDiv = $('<div class = "col-md-6">');

	var calCard = $('<div class="card">');
	var calCardHeader = $('<div class = "card-header">');
	var calCardBody =  $('<div class = "card-body">')

	$(calCardHeader).html(`<h5>Calories (per Serving)</h5>`);
	$(calCardBody).html(calories[parseInt($(this).attr('data-content'))]);
	$(calCard).html(calCardHeader).append(calCardBody);
	$(calDiv).html(calCard);

	var servCard = $('<div class="card">');
	var servCardHeader = $('<div class = "card-header">');
	var servCardBody =  $('<div class = "card-body">')

	$(servCardHeader).html(`<h5>Servings</h5>`);
	$(servCardBody).append(servings[parseInt($(this).attr('data-content'))]);
	$(servCard).html(servCardHeader).append(servCardBody);
	$(servDiv).html(servCard);

	var dietCard = $('<div class="card">');
	var dietCardHeader = $('<div class = "card-header">');
	var dietCardBody =  $('<div class = "card-body">')

	nutrRow.append(calDiv).append(servDiv);
	nutrDiv.append(nutrRow);

	$(dietCardHeader).append(`<h5>Diet</h5>`);
	$(dietCardBody).append(dietList[parseInt($(this).attr('data-content'))]);
	$(dietCard).html(dietCardHeader).append(dietCardBody);
	nutrDiv.append(dietCard);

	var healthCard = $('<div class="card">');
	var healthCardHeader = $('<div class = "card-header">');
	var healthCardBody =  $('<div class = "card-body">')
	
	$(healthCardHeader).append(`<h5>Health</h5>`);
	$(healthCardBody).append(healthList[parseInt($(this).attr('data-content'))]);
	$(healthCard).html(healthCardHeader).append(healthCardBody);
	nutrDiv.append(healthCard)

	secondRow.append(ingDiv).append(nutrDiv);
	$('.article').append(secondRow);
	$('.article').append('<hr>');

	var thirdRow = $('<div class = "row">');
	
	// $('.article').append('<h2>Nutrition</h2>');
	var tableDiv = $('<div class = "col-md-6">');
	var tableCard = $('<div class="card">');
	var tableCardHeader = $('<div class = "card-header">');
	var tableCardBody =  $('<div class = "card-body" id = "plot-card-body">');

	$(tableCardHeader).append(`<h5>Nutrition Facts</h5>`);
	$(tableCardBody).append(digests[parseInt($(this).attr('data-content'))]);
	$(tableCard).append(tableCardHeader).append(tableCardBody);
	$(tableDiv).append(tableCard);
	

	var plotDiv = $('<div class = "col-md-6">');
	var plotCard = $('<div class="card">');
	var plotCardHeader = $('<div class = "card-header"><h5>Nutrition Graph</h5></div>');
	var plotCardBody =  $('<div class = "card-body" id = "plot-card-body">')
	var plotGraph = $('<div id = "plot">')

	$(plotCardHeader).html(`<h5>Nutrition Graph</h5>`);
	$(plotCard).append(plotCardHeader).append(plotCardBody);
	$(plotCardBody).append(plotGraph);
	$(plotDiv).append(plotCard);


	thirdRow.append(tableDiv).append(plotDiv);
	$('.article').append(thirdRow);
	
	
	let thisDigests = digestValues[parseInt($(this).attr('data-content'))];

	console.log(thisDigests);

	createNutritionChart(
		document.getElementById('plot'), 
		{
			Carbs: thisDigests["Carbs"].dailyTotal,
			Protein: thisDigests["Protein"].dailyTotal,
			Fat: thisDigests["Fat"].dailyTotal,
		}
	);

});

$(".addRecipe").on("click", function (e) {
	
	userInput = $("#targetRecipe").val().trim().toLowerCase();

	if (userInput){
		$("#val-text").empty();
	
		$(".recipeList").show();
		$(".recipeInfo").hide();
		$("#recipe-list").empty();
		e.preventDefault();
		
		var searchURL = queryURLbase + userInput;
		doAjax(searchURL);
		$("#targetRecipe").val("");
	} else {
		$("#val-text").append("You gotta add some ingredients, bro!");
	};


});
