$(".recipeInfo").hide();
$(".categories").hide();

$(document).ready(function () {
	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
	});
});
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
				img.attr("src", imageURL[i]);
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

	if (userInput) {
		$("#val-text").empty();

		$(".recipeList").show();
		$(".recipeInfo").hide();
		$("#recipe-list").empty();
		e.preventDefault();
		searcharray.push(userInput);
		var searchURL = queryURLbase + userInput;
		doAjax(searchURL);
		displaybutton();
		$("#targetRecipe").val("");
	} else {
		$("#val-text").append("You gotta add some ingredients, bro!");
	};
});

// ==============================================================
//search Array start=================
var searcharray = [];
function displaybutton() {
	$("#searcharray").empty();
	for (var i = 0; i < searcharray.length; i++) {
		var gifli = $(`<li id=${searcharray[i]}>`);
		var gifbtn = $("<h5 style='margin-bottom:5px;'>")
		gifbtn.text(searcharray[i]);
		gifbtn.append(`<i style='float:right' class="far fa-trash-alt" data-content=${searcharray[i]} id="delete">`);
		gifli.append(gifbtn);
		$("#searcharray").append(gifli);
	}
}
displaybutton();

// ========search button click =========
$(document).on("click", "#btnsearch", function () {
	// $("#searcharray").show();
	$(".categories").hide();
	$("#searcharray").show();	
	displaybutton();
});

// ========Choose From Categories click=========
$(document).on("click", "#btnchoose", function () {
	$(".categories").show();
	$("#searcharray").hide();
	for(var i=0;i<searcharray.length;i++){
		if(searcharray.includes($(this).attr('data-content'))){
			searcharray[i] ="";
		}
	}
});
$(document).on("click", "#delete", function () {
	var el = $(this);
	var data = el.attr('data-content')
	
	$.each($("input[name='is_check']:checked"), function (index,v) {
		if($(this).val() === data){
			$(this).prop('checked', false);

		}
	});
	$(`#${data}`).remove();
	el.remove();
	tFunction();
});
//check box check ==========================
var dairy = ["butter", "egg", "milk", "parmesan", "cheddar", "american cheese", "sour cream", "cream cheese", "mozzarella", "yogurt", "cream", "evaporated milk", "whipped cream", "half and half", "feta", "monterey jack cheese", "condensed milk", "cottage cheese", "ice cream", "swiss cheese", "velveeta", "frosting", "buttermilk", "ricotta", "goat cheese", "provolone", "blue cheese", "powdered milk", "colby cheese", "pepper jack", "italian cheese", "soft cheese", "gouda", "pepperjack cheese", "romano", "brie", "pizza cheese", "ghee", "creme fraiche", "cheese soup", "gruyere", "pecorino cheese", "custard", "muenster", "queso fresco cheese", "hard cheese", "havarti cheese", "asiago", "mascarpone", "neufchatel", "halloumi", "paneer", "brick cheese", "camembert cheese", "goat milk", "garlic herb cheese", "edam cheese", "manchego", "fontina", "stilton cheese", "emmenthaler cheese", "red leicester cheese", "jarlsberg cheese", "bocconcini cheese", "farmer cheese", "creme de cassis", "wensleydale cheese", "longhorn cheese", "double gloucester cheese", "raclette cheese", "lancashire cheese", "cheshire cheese"];
var vegetables = ["onion", "garlic", "tomato", "potato", "carrot", "bell pepper", "basil", "parsley", "broccoli", "corn", "spinach", "mushroom", "green beans", "ginger", "chili pepper", "celery", "rosemary", "salad greens", "red onion", "cucumber", "sweet potato", "pickle", "avocado", "zucchini", "cilantro", "frozen vegetables", "olive", "asparagus", "cabbage", "cauliflower", "dill", "kale", "mixed vegetable", "pumpkin", "squash", "mint", "scallion", "sun dried tomato", "shallot", "eggplant", "beet", "butternut squash", "horseradish", "leek", "caper", "brussels sprout", "artichoke heart", "chia seeds", "radish", "sauerkraut", "artichoke", "portobello mushroom", "sweet pepper", "arugula", "spaghetti squash", "capsicum", "bok choy", "parsnip", "okra", "yam", "fennel", "turnip", "snow peas", "bean sprouts", "seaweed", "chard", "collard", "canned tomato", "pimiento", "watercress", "tomatillo", "rocket", "mustard greens", "bamboo shoot", "rutabaga", "endive", "broccoli rabe", "jicama", "kohlrabi", "hearts of palm", "butternut", "celery root", "daikon", "radicchio", "porcini", "chinese broccoli", "jerusalem artichoke", "cress", "water chestnut", "dulse", "micro greens", "burdock", "chayote"];
var meats = ["chicken breast","ground beef","bacon","sausage","beef steak","ham","hot dog","pork chops","chicken thighs","ground turkey","cooked chicken","turkey","pork","pepperoni","whole chicken","chicken leg","ground pork","chorizo","chicken wings","beef roast","polish sausage","salami","pork roast","ground chicken","pork ribs","spam","venison","pork shoulder","bologna","bratwurst","prosciutto","lamb","corned beef","chicken roast","lamb chops","pancetta","ground lamb","beef ribs","duck","pork belly","beef liver","leg of lamb","canadian bacon","beef shank","veal","chicken giblets","cornish hen","lamb shoulder","lamb shank","deer","ground veal","pastrami","rabbit","sliced turkey","pork loin","elk","beef suet","veal cutlet","lamb loin","marrow bones","goose","chicken tenders","veal chops","quail","oxtail","pheasant","lamb liver","moose","turkey liver","pork liver","veal shank","foie gras","beef sirloin","liver sausage","sweetbread","wild boar","snail","pigeon","duck liver","goose liver","grouse","ostrich","soppressata","alligator"];
var sauces = ["tomato sauce","tomato paste","salsa","pesto","alfredo sauce","beef gravy","curry paste","chicken gravy","cranberry sauce","turkey gravy","mushroom gravy","sausage gravy","onion gravy","cream gravy","pork gravy","tomato gravy","giblet gravy"];
// ========== Dairy checkbox ================
$(document).on("click", "#dairy", function () {
	var click = $(this).attr("data-state");
	if (click == "click") {
		$(".dairy").show();

		for (var i = 0; i < dairy.length; i++) {
			var lab = $("<label>");
			lab.addClass("checkbox-inline chec");
			var input = $(`<input id="myCheck" class="inputcheck" type="checkbox" value="${dairy[i]}" name="is_check">`);

			lab.text(dairy[i]);
			lab.append(input);
			$(".dairy").append(lab);
			$('.diary').append('<br>');
			$(this).attr('data-state', 'animate');
		}
	} else {
		$(".dairy").hide();
		$(this).attr('data-state', 'click');
	}
});
// ========== vegetables checkbox ================
$(document).on("click", "#vegetables", function () {
	var click = $(this).attr("data-state");
	if (click == "click") {
		$(".vegetables").show();
		for (var i = 0; i < vegetables.length; i++) {
			var lab = $("<label>");
			lab.addClass("checkbox-inline chec");
			var input = $(`<input id="myCheck" class="inputcheck" type="checkbox" value="${vegetables[i]}" name="is_check">`);

			lab.text(vegetables[i]);
			lab.append(input);
			$(".vegetables").append(lab);
			$(this).attr('data-state', 'animate');
		}
	} else {
		$(".vegetables").hide();
		$(this).attr('data-state', 'click');
	}
});
// ========== meats checkbox ================
$(document).on("click", "#meats", function () {
	var click = $(this).attr("data-state");
	if (click == "click") {
		$(".meats").show();
		for (var i = 0; i < meats.length; i++) {
			var lab = $("<label>");
			lab.addClass("checkbox-inline chec");
			var input = $(`<input id="myCheck" class="inputcheck" type="checkbox" value="${meats[i]}" name="is_check">`);

			lab.text(meats[i]);
			lab.append(input);
			$(".meats").append(lab);
			$(this).attr('data-state', 'animate');
		}
	} else {
		$(".meats").hide();
		$(this).attr('data-state', 'click');
	}

});
// ========== sauces checkbox ================
$(document).on("click", "#sauces", function () {
	var click = $(this).attr("data-state");
	if (click == "click") {
		$(".sauces").show();
		for (var i = 0; i < sauces.length; i++) {
			var lab = $("<label>");
			lab.addClass("checkbox-inline chec");
			var input = $(`<input id="myCheck" class="inputcheck" type="checkbox" value="${sauces[i]}" name="is_check">`);

			lab.text(sauces[i]);
			lab.append(input);
			$(".sauces").append(lab);
			$(this).attr('data-state', 'animate');
		}
	} else {
		$(".sauces").hide();
		$(this).attr('data-state', 'click');
	}
});

//===================checkbox click========================
var checkboxarray = [];

$(document).on("click", "#myCheck", function () {
	if ($(this).is(':checked')) {
		tFunction();
		// console.log("check with click");
	} else {
		// console.log("uncheck with click");
		fFunction();
	}
});

function tFunction() {
	$(".recipeList").empty();
	checkboxarray = [];
	var ck_string = "";
	$.each($("input[name='is_check']:checked"), function () {
		ck_string = $(this).val();
		if(!searcharray.includes(ck_string)){
			searcharray.push(ck_string);
		}
		if(!checkboxarray.includes(ck_string)){
			checkboxarray.push(ck_string);
		}
		$("#targetRecepi").val(checkboxarray);

		var searchURL = queryURLbase + checkboxarray;
		doAjax(searchURL);

	});
}
function fFunction() {
	$(".recipeList").empty();
	checkboxarray = [];
	var ck_string = "";
	$.each($("input[name='is_check']:checked"), function () {
		console.log($(this));
		ck_string = $(this).val();
		if(!checkboxarray.includes(ck_string)){
			checkboxarray.push(ck_string);
		}


		var searchURL = queryURLbase + checkboxarray;
		doAjax(searchURL);
		$("#targetRecepi").val(checkboxarray);

	});

}