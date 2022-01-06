var wms_layers = [];
var baseLayer = new ol.layer.Group({
    'title': '',
    layers: [
new ol.layer.Tile({
    'title': 'OSM',
    'type': 'base',
    source: new ol.source.OSM()
})
]
});
var format_kematiann_0 = new ol.format.GeoJSON();
var features_kematiann_0 = format_kematiann_0.readFeatures(json_kematiann_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_kematiann_0 = new ol.source.Vector({
    attributions: [new ol.Attribution({html: '<a href=""></a>'})],
});
jsonSource_kematiann_0.addFeatures(features_kematiann_0);var lyr_kematiann_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_kematiann_0, 
                style: style_kematiann_0,
    title: 'kematiann<br />\
    <img src="styles/legend/kematiann_0_0.png" /> (37928 - 62657) Rendah<br />\
    <img src="styles/legend/kematiann_0_1.png" /> (62657 - 87386) Sedang<br />\
    <img src="styles/legend/kematiann_0_2.png" /> (87386 - 112115) Tinggi<br />'
        });

lyr_kematiann_0.setVisible(true);
var layersList = [baseLayer,lyr_kematiann_0];
lyr_kematiann_0.set('fieldAliases', {'KECAMATAN': 'KECAMATAN', 'Kematian': 'Kematian', });
lyr_kematiann_0.set('fieldImages', {'KECAMATAN': 'TextEdit', 'Kematian': 'TextEdit', });
lyr_kematiann_0.set('fieldLabels', {'KECAMATAN': 'inline label', 'Kematian': 'inline label', });
lyr_kematiann_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});