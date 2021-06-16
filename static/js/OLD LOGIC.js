// Creating map object

var myMap
var incomeLayer = L.geoJSON()
var ratingLayer = L.geoJSON()
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
    id: "mapbox/dark-v10",
    accessToken: API_KEY
  }).addTo(myMap);

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
};



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
  function overPerformers(rating){

  }

  var incomeDict = {};
  var ratingDict = {};
  // Grabbing our GeoJSON data..
// d3.json(link).then(function(data) {
//     // Creating a GeoJSON layer with the retrieved data
//     L.geoJson(data).addTo(myMap);
// });
console.log("TEST1")
createMap(incomeLayer);


d3.json(link).then(data => {
  console.log("TEST2")
  d3.csv("static/data/kaggle_income.csv").then(incomeData => {
    // Step 4: Parse the data
    // Format the data and convert to numerical and date values
    // =================================
    // Create a function to parse date and time
    
    // Format the data
    incomeData.forEach(data => {
      var zip = +data.Zip_Code
      var median = +data.Median
      // var medIncome = {zip, median}
      // row = {zip:median};
      incomeDict[zip] = median

      // incomeDict.push(
      //   row
      //   // data["Zip_Code"] : data["Median"]
      // )
    });

    incomeLayer.addData(data); 
    incomeLayer.setStyle (
      function(feature) {
        console.log(feature.properties.ZIP)
        return {
          color: "white",
          fillColor: chooseColor(incomeDict[feature.properties.ZIP]),
          fillOpacity: 0.9,
          weight: 1.5
        };
       
    });
  //d3.csv("Resources/yelp_academic_dataset_business.csv").then(ratingData => {
    //ratingData.forEach(data =>{

    //})
  });
  // Creating a geoJSON layer with the retrieved data

});

// console.log(incomeDict[0]);