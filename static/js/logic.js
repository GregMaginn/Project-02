// Creating map object
var myMap
var incomeLayer = L.geoJSON()
var priceLayer = L.geoJSON()
var priceMarkers = [];
var incomeDict = {};

// Use this link to get the geojson data.
var link = "static/data/Zip_Codes.geojson";

d3.csv("static/data/yelp_academic_dataset_business.csv").then(function(yelpData) {
  yelpData.forEach(function(data) {
    var name = data.name
    var priceRange = data["attributes.Price Range"]
    var rating = +data["stars"]
    var lat = +data["latitude"]
    var long = +data["longitude"]


    // Loop through the stations array
    // for (var index = 1; index < priceRange.length; index++) {
      // var station = priceRange[index];

    // For each station, create a marker and bind a popup with the station's name
    var priceMarker = L.marker([lat, long])
    .bindPopup("<h2>"+ name + "</h2> <h3> Price Range: " + priceRange + "</h3><h3>Rating: " + rating + "</h3>");

      // Add the marker to the bikeMarkers array
    priceMarkers.push(priceMarker);
    // };
    // console.log(lat[1]);
  //  console.log(priceRange)
  });
  console.log("OTHER TEST");

  function createMap(incomeLayer, priceLayer){
    var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });
  
    var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    }); 
  
    var baseMaps = {
        "Street Map": streetMap,
        "Dark Map": darkMap
    };
    // Adding tile layer
  
    var overlayMaps = {
      incomeLayer: incomeLayer,
      priceLayer: priceLayer 
    };
   
  
    myMap = L.map("map", {
      center: [36.1699, -115.1398],
      zoom: 11,
      layers: [darkMap, streetMap, priceLayer, incomeLayer]
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
  // console.log(priceMarkers) 
  // priceLayer.addData(priceMarkers); 
  createMap(incomeLayer, L.layerGroup(priceMarkers));
});
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

d3.json(link).then(function(data) {
  d3.csv("static/data/kaggle_income.csv").then(function(incomeData) {
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
  console.log("TEST");
  
});



