function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    d3.json(`/metadata/${sample}`).then((data) =>{
    var sampleinfo = d3.select("#sample-metadata");
    sampleinfo.html("");
    Object.entries(data).forEach(([key, value]) => {
    sampleinfo.append('h6').text(`${key}: ${value}`);
  });
    // BONUS: Build the Gauge Chart
    buildGauge(data.WFREQ);
});
};
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
    // @TODO: Build a Bubble Chart using the sample data
    d3.json(`/samples/${sample}`).then(function(data) {
//       // Create items array
//       var items = Object.keys(data).map(function(key) {
//         return [key, data[key]];
// });

// // // Sort the array based on the second element
// //       items.sort(function(first, second) {
// //         return second[1] - first[1];
// // });

// // // Create a new array with only the first 5 items
// //     console.log(items.slice(0, 10));
      var top10id= data.otu_ids.slice(0,10);
      var top10values = data.sample_values.slice(0,10);
      var top10labels = data.otu_labels.slice(0,10);
      var trace1 = {
        x: top10id,
        y: top10values,
        mode: 'markers',
        marker: {
          size: top10values
        }
      };

      var data = [trace1];

      var layout = {
        showlegend: false,
        height: 600,
        width: 1400
      };

      Plotly.newPlot('bubble', data, layout);

    // @TODO: Build a Pie Chart
      var data2 = [{
        values: top10values,
        labels: ["a","b","c","d","e","f","g","h","i","j"],
        type: 'pie'
      }];
      
      var layout = {
        height: 400,
        width: 500
      };
      
      Plotly.newPlot("pie", data2, layout);
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
});

};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
   buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
 buildMetadata(newSample);
}

// Initialize the dashboard
init();
