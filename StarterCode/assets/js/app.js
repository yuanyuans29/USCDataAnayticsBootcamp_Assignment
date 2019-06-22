// @TODO: YOUR CODE HERE!
// Step 1: Set up svg area

var svgWidth = 800;
var svgHeight = 500;

var margin = {
  top: 10,
  right: 30,
  bottom: 30,
  left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Read data.csv
d3.csv("assets/data/data.csv", function(censusdata) {
  console.log(censusdata.poverty);
  console.log(d3.max(censusdata.poverty));
  // add x axis
    var xLinearScale = d3.scaleLinear()
    .domain([0,d3.max(censusdata, function(d){return parse.float(d.poverty)})])
    .range([0, width]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xLinearScale));    

    var yLinearScale = d3.scaleLinear()
    .domain([0,30])
    .range([height,0]);
    svg.append("g")
    .call(d3.axisLeft(yLinearScale));

// Add dots
    svg.append('g')
    .enter()
    .append("circle")
      .attr("cx", censusdata.poverty)//function (d) { return xLinearScale(d.poverty); } )
      .attr("cy", censusdata.healthcare)//function (d) { return yLinearScale(d.healthcare); } )
      .attr("r",10)
      .style("fill", "#69b3a2");

});