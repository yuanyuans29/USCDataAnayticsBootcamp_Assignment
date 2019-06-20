function createMap(earthquakelocation){
    // Create the tile layer as base layer
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap
      };
    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
        "Earthquake": earthquakelocation
    };
    // Create the map object with options
    var map = L.map("map", {
    center: [-14.73, -74.0059],
    zoom: 2,
    layers: [lightmap, earthquakelocation]
  });

//   // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}
function createMarkers(response) {
    // Pull the "stations" property off of response.data
    var eachincident = response.features;

    // Initialize an array to hold bike markers
    earthquakemarkers = []
    // Loop through the stations array
    for (var i = 0; i < eachincident.length; i++) {
        earthquakemarker=L.circle([eachincident[i].geometry.coordinates[0],eachincident[i].geometry.coordinates[1]],{
            fillOpacity:0.5,
            color:"White",
            fillColor:"purple",
            radius: 500000//markerSize(eachincident[i].properties.mag),
        }).bindPopup("<h3>" + eachincident[i].properties.mag + "<h3><h3>Capacity: " + eachincident[i].properties.mag + "<h3>");



    // Add the marker to the bikeMarkers array
    earthquakemarkers.push(earthquakemarker);
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(earthquakemarkers));
};

//Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);