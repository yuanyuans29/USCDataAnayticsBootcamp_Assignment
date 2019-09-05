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
d3.csv("assets/data/data.csv"). then(function(censusdata) {

  censusdata.forEach(function(d) {
    d.poverty = +d.poverty;
    d.healthcare = +d.healthcare;
    d.abbr = +d.abbr;
  });
  // console.log(censusdata.poverty);
  // console.log(d3.max(censusdata.poverty));
  // add x axis
    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(censusdata, d =>d.poverty),d3.max(censusdata, d =>d.poverty)])
    .range([0, width]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xLinearScale));    

    var yLinearScale = d3.scaleLinear()
    .domain([0,d3.max(censusdata, d =>d.healthcare)])
    .range([height,0]);
    svg.append("g")
    .call(d3.axisLeft(yLinearScale));

    // Create axes labels
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (svgHeight / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Lacks Healthcare (%)");
  
        svg.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top+18})`)
        .attr("class", "axisText")
        .text("In Poverty(%)");

// Add dots

    svg.selectAll("circle")
    .data(censusdata)
    .enter()
    .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))//function (d) { return xLinearScale(d.poverty); } )
      .attr("cy", d => yLinearScale(d.healthcare))//function (d) { return yLinearScale(d.healthcare); } )
      .attr("r",15)
      .style("fill", "rgb(198, 45, 205)")
      .attr("opacity", ".5")
    svg.selectAll("text.stateText")
    .data(censusdata)
    .enter()
    .append("text")
    .classed("stateText", true)
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("font-size", 15)
    .style("font-color","black")
    .text(d => d.abbr)

});
  //  // Add state abbr to each plot
  //  var stateLabels = svg.selectAll("name.stateText")
  //  .data(censusdata)
  //  .enter()
  //  .append("name")
  //  .classed("stateText", true)
  //  .attr("x", d => xScale(d.poverty))
  //  .attr("y", d => yScale(d.obesity))
  //  .attr("font-size", 10)
  //  .text(d => d.abbr);