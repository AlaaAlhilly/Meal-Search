

var queryURLbase = "https://api.edamam.com/search?&app_id=192e6853&app_key=97cc74f29550dbca8f09e9ac463a150f&from=0&to=13&q=";
var ingShowList = [];
var digests = [];
var calories = [];
var weights = [];
var coockTimes = [];
var instructions = [];
function doAjax(queryURL) {
	fetch(queryURL)
		.then((resp) => resp.json())
		.then(function (data) {
			console.log(data);
			var flex = $('<div class="row">');
			for (var i = 0; i < 13; i++) {
				var ingList = $(`<table class="table">
										<thead class="thead-dark">
										<tr>
											<th scope="col">Ingerediant</th>
											<th scope="col">Weight(ounce)</th>
										</tr>
										</thead>
										<tbody>`
								);
				var digestList = $(`<table class="table">
								<thead class="thead-dark">
								<tr>
									<th scope="col">Nutrition facts</th>
									<th scope="col">Total</th>
								</tr>
								</thead>
								<tbody>`
						);
				for (var j = 0; j < data.hits[i].recipe.ingredients.length; j++) {
					var ing = data.hits[i].recipe.ingredients[j].text;
					var ingweight = data.hits[i].recipe.ingredients[j].weight;
					ingList.append(`<tr class="table-warning"><td class="table-warning">${ing}</td><td class="table-warning">${ingweight}</td></tr>`)

				}
				for (var j = 0; j < data.hits[i].recipe.digest.length; j++) {
					var dig = data.hits[i].recipe.digest[j].label;
					var digTotal = data.hits[i].recipe.digest[j].total;
					digestList.append(`<tr class="table-warning"><td class="table-warning">${dig}</td><td class="table-warning">${digTotal}</td></tr>`)
				}
				calories.push(data.hits[i].recipe.calories);
				weights.push(data.hits[i].recipe.totalWeight);
				coockTimes.push(data.hits[i].recipe.totalTime);
				instructions.push(data.hits[i].recipe.url);
				digests.push(digestList);
				ingShowList.push(ingList);
				var card = $('<div style="margin-bottom:20px" class="col-s-12 col-m-6 col-lg-4">');

				var img = $("<img>");
				imgAPI = data.hits[i].recipe.image;
				img.attr("src", imgAPI);
				card.append(img);

				title = data.hits[i].recipe.label;

				var link = $(`<a  data-content=${i} href="#" style="text-decoration:none;" class="addVids">`);
				var span = $('<span class="badge badge-pill badge-dark" style="margin-top:10px;">');
				span.text(title);
				link.append(span);
				card.append(link);
				flex.append(card);
				

			};
			$('.recipeList').append(flex);
		});
};

$(document).on('click', '.addVids', function () {
	$('.article').empty();
	$('.article').append(`<button type="button" class="btn btn-primary back">Back</button>`);
	$('.article').append('<hr>');
	$('.article').append('<h2>Ingredients</h2>');
	$('.article').append(ingShowList[parseInt($(this).attr('data-content'))]);
	$('.article').append('<hr>');
	$('.article').append('<h2>Nutritions</h2>');
	$('.article').append(digests[parseInt($(this).attr('data-content'))]);
	$('.article').append('<hr>');
	$('.article').append('<h2>Calories</h2>');
	$('.article').append(`<h3>${calories[$(this).attr('data-content')]}</h3>`);
	$('.article').append('<hr>');
	$('.article').append('<h2>Weight</h2>');
	$('.article').append(`<h3>${weights[$(this).attr('data-content')]}</h3>`);
	$('.article').append('<hr>');
	$('.article').append('<h2>Cook Time</h2>');
	$('.article').append(`<h3>${coockTimes[$(this).attr('data-content')]} /minutes</h3>`);
	$('.article').append('<hr>');
	$('.article').append('<h2>Instructions</h2>');
	$('.article').append(`<a target="_blank" href="${instructions[$(this).attr('data-content')]}"><h3>Click here to see instructions</h3>`);
	
});

$(".addRecipe").on("click", function (e) {
	$("#recipe-list").empty();
	e.preventDefault();

	userInput = $("#targetRecepi").val().trim().toLowerCase();

	var searchURL = queryURLbase + userInput;
	doAjax(searchURL);
	$("#targetRecepi").val("");
});
