var map = L.map('map').setView([52.058, 4.409], 12);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFha2EiLCJhIjoiY2lzZnp4eWhvMDAzejJwbnExNmY5ODdsMCJ9.EeEx5fDH-zH3pdvuHMuncg'
}).addTo(map);


// Initialise the FeatureGroup to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var customMarker= L.Icon.extend({
    options: {
        shadowUrl: null,
        iconAnchor: new L.Point(12, 12),
        iconSize: new L.Point(24, 24),
        iconUrl: 'marker.svg'
    }
});
// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
  draw: {
    polygon: {
      shapeOptions: {
        color: '#cd0049'
      }
    },
    // disable toolbar item by setting it to false
    polyline: {
      shapeOptions: {
        color: '#cd0049'
      }
    },
    circle: {
      shapeOptions: {
        color: '#cd0049'
      }
    }, // Turns off this drawing tool
    rectangle: {
      shapeOptions: {
        color: '#cd0049'
      }
    },
    marker: {
      icon: new customMarker() //Here assign your custom marker
    },
    circlemarker: false
    },
  edit: {
    featureGroup: drawnItems
  }
});

map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
  var type = e.layerType
  var layer = e.layer;

  // Do whatever else you need to. (save to db, add to map etc)


  drawnItems.addLayer(layer);
});

var searchControl = new L.esri.Controls.Geosearch().addTo(map);

 var results = new L.LayerGroup().addTo(map);

  searchControl.on('results', function(data){
    results.clearLayers();
    
    //for (var i = data.results.length - 1; i >= 0; i--) {
      //results.addLayer(L.marker(data.results[i].latlng));
    //} ADS MARKER
  });