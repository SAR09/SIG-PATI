
isTracking = false;
geolocateControl = function(opt_options) {
    var options = opt_options || {};
    var button = document.createElement('button');
    button.className += ' fa fa-map-marker';
    var handleGeolocate = function() {
        if (isTracking) {
            map.removeLayer(geolocateOverlay);
            isTracking = false;
      } else if (geolocation.getTracking()) {
            map.addLayer(geolocateOverlay);
            map.getView().setCenter(geolocation.getPosition());
            isTracking = true;
      }
    };
    button.addEventListener('click', handleGeolocate, false);
    button.addEventListener('touchstart', handleGeolocate, false);
    var element = document.createElement('div');
    element.className = 'geolocate ol-unselectable ol-control';
    element.appendChild(button);
    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });
};
ol.inherits(geolocateControl, ol.control.Control);

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
closer.onclick = function() {
    container.style.display = 'none';
    closer.blur();
    return false;
};
var overlayPopup = new ol.Overlay({
    element: container
});

var expandedAttribution = new ol.control.Attribution({
    collapsible: false
});

var map = new ol.Map({
    controls: ol.control.defaults({attribution:false}).extend([
        expandedAttribution,new geolocateControl()
    ]),
    target: document.getElementById('map'),
    renderer: 'canvas',
    overlays: [overlayPopup],
    layers: layersList,
    view: new ol.View({
         maxZoom: 28, minZoom: 1
    })
});

var layerSwitcher = new ol.control.LayerSwitcher({tipLabel: "Layers"});
map.addControl(layerSwitcher);

map.getView().fit([12294595.325356, -783688.207167, 12438931.586606, -713374.353709], map.getSize());

var NO_POPUP = 0
var ALL_FIELDS = 1

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
    // Determine the index that the layer will have in the popupLayers Array,
    // if the layersList contains more items than popupLayers then we need to
    // adjust the index to take into account the base maps group
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}


var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false // optional, might improve performance
    }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
        }),
    })],
    updateWhileAnimating: true, // optional, for instant visual feedback
    updateWhileInteracting: true // optional, for instant visual feedback
});

var doHighlight = true;
var doHover = true;

var highlight;
var onPointerMove = function(evt) {
    if (!doHover && !doHighlight) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var popupText = '';
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    var count = 1;
    var clusteredFeatures;
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        // We only care about features from layers in the layersList, ignore
        // any other layers which the map might contain such as the vector
        // layer used by the measure tool
        if (layersList.indexOf(layer) === -1) {
            return;
        }
        var doPopup = false;
        if (count == 1) {
            for (k in layer.get('fieldImages')) {
                if (layer.get('fieldImages')[k] != "Hidden") {
                    doPopup = true;
                }
            }
            currentFeature = feature;
            currentLayer = layer;
            clusteredFeatures = feature.get("features");
            var clusterFeature;
            if (typeof clusteredFeatures !== "undefined") {
                if (doPopup) {
                    popupText = '<ul>';
                    for(var n=0; n<clusteredFeatures.length; n++) {
                        clusterFeature = clusteredFeatures[n];
                        currentFeatureKeys = clusterFeature.getKeys();
                        popupText = popupText + '<li><table>'
                        for (var i=0; i<currentFeatureKeys.length; i++) {
                            if (currentFeatureKeys[i] != 'geometry') {
                                popupField = '';
                                if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                                popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                                } else {
                                    popupField += '<td colspan="2">';
                                }
                                if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                    popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                                }
                                if (layer.get('fieldImages')[currentFeatureKeys[i]] != "Photo") {
                                    popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? Autolinker.link(String(clusterFeature.get(currentFeatureKeys[i]))) + '</td>' : '');
                                } else {
                                    popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? '<img src="images/' + clusterFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  + '" /></td>' : '');
                                }
                                popupText = popupText + '<tr>' + popupField + '</tr>';
                            }
                        } 
                        popupText = popupText + '</table></li>';    
                    }
                    popupText = popupText + '</ul>';
                }
            } else {
                currentFeatureKeys = currentFeature.getKeys();
                if (doPopup) {
                    popupText = '<table>';
                    for (var i=0; i<currentFeatureKeys.length; i++) {
                        if (currentFeatureKeys[i] != 'geometry') {
                            popupField = '';
                            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                                popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                            } else {
                                popupField += '<td colspan="2">';
                            }
                            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                            }
                            if (layer.get('fieldImages')[currentFeatureKeys[i]] != "Photo") {
                                popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? Autolinker.link(String(currentFeature.get(currentFeatureKeys[i]))) + '</td>' : '');
                            } else {
                                popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? '<img src="images/' + currentFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  + '" /></td>' : '');
                            }
                            popupText = popupText + '<tr>' + popupField + '</tr>';
                        }
                    }
                    popupText = popupText + '</table>';
                }
            }
        }
        count++;
    });

    if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (currentFeature) {
                var styleDefinition = currentLayer.getStyle().toString();

                if (currentFeature.getGeometry().getType() == 'Point') {
                    var radius = styleDefinition.split('radius')[1].split(' ')[1];

                    highlightStyle = new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: "#ffff00"
                            }),
                            radius: radius
                        })
                    })
                } else if (currentFeature.getGeometry().getType() == 'LineString') {

                    var featureWidth = styleDefinition.split('width')[1].split(' ')[1].replace('})','');

                    highlightStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#ffff00',
                            lineDash: null,
                            width: featureWidth
                        })
                    });

                } else {
                    highlightStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: '#ffff00'
                        })
                    })
                }
                featureOverlay.getSource().addFeature(currentFeature);
                featureOverlay.setStyle(highlightStyle);
            }
            highlight = currentFeature;
        }
    }

    if (doHover) {
        if (popupText) {
            overlayPopup.setPosition(coord);
            content.innerHTML = popupText;
            container.style.display = 'block';        
        } else {
            container.style.display = 'none';
            closer.blur();
        }
    }
};

var onSingleClick = function(evt) {
    if (doHover) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var popupText = '';
    var currentFeature;
    var currentFeatureKeys;
    var count = 1;
    var clusteredFeatures;
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (feature instanceof ol.Feature) {
            var doPopup = false;
            if (count == 1) {
                for (k in layer.get('fieldImages')) {
                    if (layer.get('fieldImages')[k] != "Hidden") {
                        doPopup = true;
                    }
                }
                currentFeature = feature;
                clusteredFeatures = feature.get("features");
                var clusterFeature;
                if (typeof clusteredFeatures !== "undefined") {
                    if (doPopup) {
                        popupText = '<ul>';
                        for(var n=0; n<clusteredFeatures.length; n++) {
                            clusterFeature = clusteredFeatures[n];
                            currentFeatureKeys = clusterFeature.getKeys();
                            popupText = popupText + '<li><table>'
                            for (var i=0; i<currentFeatureKeys.length; i++) {
                                if (currentFeatureKeys[i] != 'geometry') {
                                    popupField = '';
                                    if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                                    popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                                    } else {
                                        popupField += '<td colspan="2">';
                                    }
                                    if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                        popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                                    }
                                    if (layer.get('fieldImages')[currentFeatureKeys[i]] != "Photo") {
                                        popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? Autolinker.link(String(clusterFeature.get(currentFeatureKeys[i]))) + '</td>' : '');
                                    } else {
                                        popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? '<img src="images/' + clusterFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  + '" /></td>' : '');
                                    }
                                    popupText = popupText + '<tr>' + popupField + '</tr>';
                                }
                            } 
                            popupText = popupText + '</table></li>';    
                        }
                        popupText = popupText + '</ul>';
                    }
                } else {
                    currentFeatureKeys = currentFeature.getKeys();
                    if (doPopup) {
                        popupText = '<table>';
                        for (var i=0; i<currentFeatureKeys.length; i++) {
                            if (currentFeatureKeys[i] != 'geometry') {
                                popupField = '';
                                if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                                    popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                                } else {
                                    popupField += '<td colspan="2">';
                                }
                                if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                    popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                                }
                                if (layer.get('fieldImages')[currentFeatureKeys[i]] != "Photo") {
                                    popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? Autolinker.link(String(currentFeature.get(currentFeatureKeys[i]))) + '</td>' : '');
                                } else {
                                    popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? '<img src="images/' + currentFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  + '" /></td>' : '');
                                }
                                popupText = popupText + '<tr>' + popupField + '</tr>';
                            }
                        }
                        popupText = popupText + '</table>';
                    }
                }
            }
            count++;
        }
    });

    var viewProjection = map.getView().getProjection();
    var viewResolution = map.getView().getResolution();
    for (i = 0; i < wms_layers.length; i++) {
        if (wms_layers[i][1]) {
            var url = wms_layers[i][0].getSource().getGetFeatureInfoUrl(
                evt.coordinate, viewResolution, viewProjection,
                {
                    'INFO_FORMAT': 'text/html',
                });
            if (url) {
                popupText = popupText + '<iframe style="width:100%;height:110px;border:0px;" id="iframe" seamless src="' + url + '"></iframe>';
            }
        }
    }

    if (popupText) {
        overlayPopup.setPosition(coord);
        content.innerHTML = popupText;
        container.style.display = 'block';        
    } else {
        container.style.display = 'none';
        closer.blur();
    }
};



map.on('pointermove', function(evt) {
    onPointerMove(evt);
});
map.on('singleclick', function(evt) {
    onSingleClick(evt);
});



      var geolocation = new ol.Geolocation({
  projection: map.getView().getProjection()
});


var accuracyFeature = new ol.Feature();
geolocation.on('change:accuracyGeometry', function() {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: '#3399CC'
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 2
    })
  })
}));

geolocation.on('change:position', function() {
  var coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ?
      new ol.geom.Point(coordinates) : null);
});

var geolocateOverlay = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [accuracyFeature, positionFeature]
  })
});

geolocation.setTracking(true);


var geocoder = new Geocoder('nominatim', {
  provider: 'osm',
  lang: 'en-US',
  placeholder: 'Search for ...',
  limit: 5,
  keepOpen: true
});
map.addControl(geocoder);

var attribution = document.getElementsByClassName('ol-attribution')[0];
var attributionList = attribution.getElementsByTagName('ul')[0];
var firstLayerAttribution = attributionList.getElementsByTagName('li')[0];
var qgis2webAttribution = document.createElement('li');
qgis2webAttribution.innerHTML = '<a href="https://github.com/tomchadwin/qgis2web">qgis2web</a>';
attributionList.insertBefore(qgis2webAttribution, firstLayerAttribution);

