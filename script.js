// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L */

// prints "hi" in the browser's dev tools console
console.log('hi');

/*
base map tile options:
wikimedia: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
osm standard: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' 
stamen toner: 'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
hillshade: 'http://c.tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png'
osm bw: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
watercolor: 'http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg'
carto light: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
carto dark: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
*/

var southWest = L.latLng(40.485604, -74.380875),
northEast = L.latLng(40.972640, -73.533554);
var bounds = L.latLngBounds(southWest, northEast);
var mapOpt = { maxBoundsViscosity: 1 };

// initialize map
var map = L.map('map', mapOpt).setView([40.7, -73.981], 11);
map.setMaxBounds(bounds);

var tileURL = 'https://api.mapbox.com/styles/v1/dcook55/cjn5zbgdb0trc2sp7s07zr24x/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGNvb2s1NSIsImEiOiJjamd6ODh3c2MwMWI2MnFteHI5b2QycjZ5In0.JpZCxOHsG_87QnrbaujA8g'
// Add base layer
L.tileLayer(tileURL, {
  maxZoom: 18,
  minZoom: 10,
}).addTo(map);

// initialize boundaries layer, in order to call it later
var boundaryLayer = L.geoJson().addTo(map);

var myStyle = {
    // "color": '#E82C0C',
    //"color": '#FFA195',
    "color":'#ff8585',
    "color": '#ffcfcf',
    "weight": 2.5,
    "fillOpacity": 0,
};

var boundaryPicker = document.querySelector('.boundary-picker');

// When the boundary picker changes, load data for that boundary
boundaryPicker.addEventListener('change', function () {
  loadData(boundaryPicker.value);
});

function loadData(boundary) {
  // First clear the data from our GeoJSON layer
  boundaryLayer.clearLayers();
  
  fetch(boundary)
    .then(function (response) {
      // Read data as JSON
      return response.json();
    })
    .then(function (data) {
      // Add data to the layer
      // boundaryLayer.addData(data);
      boundaryLayer = L.geoJSON(data, {
       onEachFeature: function (f, l) {
       l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
       }
      }).addTo(map);
      boundaryLayer.setStyle(myStyle);
    });
}

/*

// function for loading all the boundary (polygon) data
// receives input from the event listener
function loadData(boundaries) {
  // start with all layers cleared
  boundaryLayer.clearLayers();
  
  boundaries.forEach(function (boundary) {
    fetch(boundary)
      .then(function(response) {
        return response.json();
    })
    .then(function(data){
      boundaryLayer.addData(data).setStyle(myStyle);
    });
  })
}
                     
// function for getting the checked boundaries
// is called by the event listener, returns to listener the parameter for loadData()
function getCheckedBoundaries(){
  // initialize variable (array) for the api urls
  // var checkedBoundaries = ['https://data.cityofnewyork.us/resource/7t3b-ywvw.geojson']
  var checkedBoundaries = []
  boundaryCheckboxes.forEach(function(boundaryCheckbox) {
    // If it is checked...
    if (boundaryCheckbox.checked) {
      // ...add its borough value to the array of checkedBoroughs
      checkedBoundaries.push(boundaryCheckbox.dataset.boundary);
    }
  });
  // look at the boundary checkboxes
  // if checked, then add value to the array
  // return the array to filter/load the corresponding data
  return checkedBoundaries;
}

// initialize checkboxes
var boundaryCheckboxes = document.querySelectorAll('.boundary-checkbox');

// add event listener which will call the load data function and the getChecked function
boundaryCheckboxes.forEach(function (boundaryCheckbox) {
  boundaryCheckbox.addEventListener('change', function () {
    console.log(getCheckedBoundaries());
    loadData(getCheckedBoundaries());
  });
});
*/

/*
soda api endpoints, in geojson:
boroughs: https://data.cityofnewyork.us/resource/7t3b-ywvw.geojson
council districts: https://data.cityofnewyork.us/resource/ve3w-z72j.geojson
community districts: https://data.cityofnewyork.us/resource/jp9i-3b7y.geojson
neighborhood tabulation areas: https://data.cityofnewyork.us/resource/q2z5-ai38.geojson
state senate districts: https://data.cityofnewyork.us/resource/afns-vxeu.geojson
state assembly districts: https://data.cityofnewyork.us/resource/qbgu-kv2h.geojson
nypd precincts: https://data.cityofnewyork.us/resource/kmub-vria.geojson
nypd sectors: https://data.cityofnewyork.us/resource/5rqd-h5ci.geojson
nyfd divisions: https://data.cityofnewyork.us/resource/68m2-uzcb.geojson
nyfd battalions: https://data.cityofnewyork.us/resource/54w3-cqui.geojson
nyfd companies: https://data.cityofnewyork.us/resource/bst7-5464.geojson
nycha zones: https://data.cityofnewyork.us/resource/m3cb-f9jj.geojson
municipal court districts: https://data.cityofnewyork.us/resource/mi5z-t7dx.geojson
school districts: https://data.cityofnewyork.us/resource/cuae-wd7h.geojson
us congressional districts: https://data.cityofnewyork.us/resource/miue-f5mc.geojson
public use microdata areas (PUMAs): https://data.cityofnewyork.us/resource/ith2-q832.geojson
[unclear origin/purpose] health center districts: https://data.cityofnewyork.us/resource/6ez8-za84.geojson
[unclear origin/purpose] health areas: https://data.cityofnewyork.us/resource/bg38-veix.geojson
[large] census tracts: https://data.cityofnewyork.us/resource/i69b-3rdj.geojson
[large] census blocks: https://data.cityofnewyork.us/resource/twhy-dzjp.geojson
[large] election districts: https://data.cityofnewyork.us/resource/wwxk-38u4.geojson
dsny districts: https://data.cityofnewyork.us/resource/3bb5-pxr6.geojson
dsny sections: https://data.cityofnewyork.us/resource/ik8s-syzs.geojson
*/