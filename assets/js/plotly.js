
// var data = [{
//     values: [carbs, fat, protein],
//     labels: ['Carbohydrates', 'Fat', 'Protein'],
//     type: 'pie'
//   }];
  
//   var layout = {
//     height: 400,
//     width: 500
//   };
  
//   Plotly.newPlot('myDiv', data, layout);


/* REFERENCE CODE FOR "createNutritionChart" USAGE 


/ DOM node as target for plot
let target = document.getElementById("plot");

// compiled data for nutrition facts
let data = {
  carbs: 0.25,
  protein: 0.5,
  fat: 0.14
};

// make a function call with the DOM node and nutrition data
createNutritionChart(target, data);
*/


// generalized function created to plot nutrition info into a target
// nutrition and target are both parameters
function createNutritionChart(target, nutrition) {
  // keys are nutrition categories
  let keys = Object.keys(nutrition);
  // values are percentages of DV
  let values = keys.map(k => nutrition[k]);
  
  // values2 are total (100%) - DV
  let values2 = values.map(dv => 100-dv);
  
  let data = [
    // first set of bars is for categories DV
    {
      type: "bar",
      x: keys,
      y: values,
      name: "Daily Value",
      marker: {
        color: ["#66c2a5", "#fc8d62", "#8da0cb"]
      }
    },
    // second set adds the gray ghost bar
    {
      type: "bar",
      x: keys,
      y: values2,
      name: "Total",
      marker: {
        color: "#e0e0e0"        
      }
    }
  ];
  
  // set layout information to stack
  let layout = {
    barmode: "stack",
  };
  
  // create the plot
  Plotly.plot(target, data, layout, {responsive: true});
}
