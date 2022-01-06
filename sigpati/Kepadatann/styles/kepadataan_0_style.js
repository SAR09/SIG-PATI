var size = 0;
var placement = 'point';

var style_kepadataan_0 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = feature.get("Kepadatan");
    var labelText = "";
    size = 0;
    var labelFont = "10.725px \'MS Shell Dlg 2\', sans-serif";
    var labelFill = "rgba(0, 0, 0, 1)";
    var textAlign = "left";
    var offsetX = 8;
    var offsetY = 3;
    var placement = 'point';
    if (feature.get("KECAMATAN") !== null) {
        labelText = String(feature.get("KECAMATAN"));
    }
    if (value > 387.400000 && value <= 1133.853333) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(175,179,138,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(255,255,178,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value > 1133.853333 && value <= 1880.306667) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(175,179,138,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(253,141,60,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value > 1880.306667 && value <= 2626.760000) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(175,179,138,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(189,0,38,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    };

    return style;
};
