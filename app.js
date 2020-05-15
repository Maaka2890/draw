
  //fuction to calculate gray
L.TileLayer.Grayscale = L.TileLayer.extend({
    options: {
        quotaRed: 21,
        quotaGreen: 171,
        quotaBlue: 8,
        quotaDividerTune: 0,
        quotaDivider: function() {
            return this.quotaRed + this.quotaGreen + this.quotaBlue + this.quotaDividerTune;
        }
    },

    initialize: function (url, options) {
        options = options || {}
        options.crossOrigin = true;
        L.TileLayer.prototype.initialize.call(this, url, options);

        this.on('tileload', function(e) {
            this._makeGrayscale(e.tile);
        });
    },

    _createTile: function () {
        var tile = L.TileLayer.prototype._createTile.call(this);
        tile.crossOrigin = "Anonymous";
        return tile;
    },

    _makeGrayscale: function (img) {
        if (img.getAttribute('data-grayscaled'))
            return;

                img.crossOrigin = '';
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pix = imgd.data;
        for (var i = 0, n = pix.length; i < n; i += 4) {
                        pix[i] = pix[i + 1] = pix[i + 2] = (this.options.quotaRed * pix[i] + this.options.quotaGreen * pix[i + 1] + this.options.quotaBlue * pix[i + 2]) / this.options.quotaDivider();
        }
        ctx.putImageData(imgd, 0, 0);
        img.setAttribute('data-grayscaled', true);
        img.src = canvas.toDataURL();
    }
});

// map canvas

L.tileLayer.grayscale = function (url, options) {
    return new L.TileLayer.Grayscale(url, options);
};
  var map = L.map('map').setView([52.058, 4.409], 7);

  L.tileLayer.grayscale('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

// Initialise the FeatureGroup to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
  draw: {
    polygon: {
      shapeOptions: {
        color: '#cd0049'
      }
    },
    // disable toolbar item by setting it to false
    polyline: false,
    circle: false, // Turns off this drawing tool
    rectangle: false,
    marker: false,
    circlemarker:false,
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



