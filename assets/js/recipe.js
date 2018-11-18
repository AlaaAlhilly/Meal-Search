

var queryURLbase = "https://api.edamam.com/search?&app_id=192e6853&app_key=97cc74f29550dbca8f09e9ac463a150f&from=0&to=9&q=";
var ingShowList = [];
function doAjax(queryURL) {
	fetch(queryURL)
		.then((resp) => resp.json())
		.then(function (data) {
			console.log(data);
			var elArray = [];
			var elements = 0;
			for (var i = 0; i < 9; i++) {
				var ingList = $(`<table class="table">
										<thead class="thead-dark">
										<tr>
											<th scope="col">Ingerediant</th>
											<th scope="col">Weight(ounce)</th>
										</tr>
										</thead>
										<tbody>`
								);
				for (var j = 0; j < data.hits[i].recipe.ingredientLines.length; j++) {
					var ing = data.hits[i].recipe.ingredients[j].text;
					var ingweight = data.hits[i].recipe.ingredients[j].weight;
					ingList.append(`<tr class="table-warning"><td class="table-warning">${ing}</td><td class="table-warning">${ingweight}</td></tr>`)

				}
				ingShowList.push(ingList);
				var card = $('<div>');

				var img = $("<img>");
				imgAPI = data.hits[i].recipe.image;
				img.attr("src", imgAPI);
				card.append(img);

				title = data.hits[i].recipe.label;

				var link = $(`<a type="button" data-content=${i} href="#" style="color:white;text-decoration:none" class="addVids">`);
				link.text(title);
				card.append(link);
				elArray.push(card);
				elements++;
				if (elements == 3) {
					var flex = $('<div class="flex-container">');
					flex.append(elArray);
					$('.recipeList').append(flex);
					elements = 0;
					elArray = [];
				}

			};
		});
};

$(document).on('click', '.addVids', function () {
	$('.article').empty();
	$('.article').append(`<button type="button" class="btn btn-primary back">Back</button>`);

	$('.article').append(ingShowList[parseInt($(this).attr('data-content'))]);
});

$(".addRecipe").on("click", function (e) {
	$("#recipe-list").empty();
	e.preventDefault();

	userInput = $("#targetRecepi").val().trim().toLowerCase();

	var searchURL = queryURLbase + userInput;
	doAjax(searchURL);
	$("#targetRecepi").val("");
});


