// @TODO: YOUR CODE HERE!
// Step 1: Set up svg area

var svgWidth = 800;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 20,
  left: 40
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3.select(".scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("../data/data.csv", function(data) {
    var xLinearScale = d3.scaleLinear()
    .domain([0,d3.max(data, d => d.poverty))
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([0,d3.max(data, d => d.healthcare)])
    .range([height,0]);


});