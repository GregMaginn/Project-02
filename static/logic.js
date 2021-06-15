// Creating map object
var myMap
var incomeLayer = L.geoJSON()

function createMap(incomeLayer){
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
  }); 

  var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap
  };
  // Adding tile layer

  var overlayMaps = {
    incomeLayer: incomeLayer 
  };
 

  myMap = L.map("map", {
    center: [36.1699, -115.1398],
    zoom: 11
  });

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
};
// // Create a legend to display info
// var legend = L.control({
//   position: "bottomright"
// });
// // When layer control is added insert a div with class legend
// legend.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// //Add info to map
// legend.addTo(myMap);

  // Use this link to get the geojson data.
var link = "static/data/Zip_Codes.geojson";

function chooseColor(income) {
  switch (true) {
  case income > 75000:
    return "#001433";
  case income > 60000:
    return "#002966";
  case income > 50000:
    return "#003D99";
  case income > 40000:
    return "#0052CC";
  case income > 30000:
    return "#0066FF";
  default:
    return "#3385FF";
  };
}  

// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (myMap) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["$75K+", "$60K - $75K", "$50K - $59K", "$40K - $49K", "$30K - $39K", "$0 - $29K"],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + chooseColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
// };
// console.log(legend);

// legend.addTo(myMap);

var incomeDict = {};

createMap(incomeLayer);

d3.json(link).then(function(data) {
  d3.csv("Resources/kaggle_income.csv").then(function(incomeData) {
    // Step 4: Parse the data
    
    // Format the data
    incomeData.forEach(function(data) {
      var zip = +data.Zip_Code
      var median = +data.Median
      incomeDict[zip] = median
    });

    incomeLayer.addData(data); 
    incomeLayer.setStyle (
      function(feature) {
        console.log(feature.properties.ZIP)
        return {
          color: "white",
          fillColor: chooseColor(incomeDict[feature.properties.ZIP]),
          fillOpacity: 0.8,
          weight: 1.5
        };
       
    });
  });
});
