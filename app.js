// Mapbox layer
var osmUrl = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFha2EiLCJhIjoiY2lzZnp4eWhvMDAzejJwbnExNmY5ODdsMCJ9.EeEx5fDH-zH3pdvuHMuncg',
            osmAttrib = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
            map = new L.Map('map', { center: new L.LatLng(52.3, 5.509), zoom: 9 }),
            drawnItems = L.featureGroup().addTo(map);
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
    // change colour for toolbar item  and disabling some by setting it to false
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

// adding Kadaster overlay layer
    var Kadaster = L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/inspire/cp/wms?', {
            layers: 'CP.CadastralBoundary',
            format: 'image/png',
            transparent: true,
            attribution: 'Kadaster-CP'
        });

// addig google as background and buttons to control the layers
L.control.layers({
        'MapBox': osm.addTo(map),
        "Google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            attribution: 'google'
        })
    }, 
    { 'TekenLaag': drawnItems,
      'Kadaster': Kadaster},
    { position: 'topleft', collapsed: false }).addTo(map);
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