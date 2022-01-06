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
var format_agama_0 = new ol.format.GeoJSON();
var features_agama_0 = format_agama_0.readFeatures(json_agama_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_agama_0 = new ol.source.Vector({
    attributions: [new ol.Attribution({html: '<a href=""></a>'})],
});
jsonSource_agama_0.addFeatures(features_agama_0);var lyr_agama_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_agama_0, 
                style: style_agama_0,
    title: 'agama<br />\
    <img src="styles/legend/agama_0_0.png" />  (36028 - 59012) Rendah <br />\
    <img src="styles/legend/agama_0_1.png" />  (59012 - 81997) Sedang <br />\
    <img src="styles/legend/agama_0_2.png" />  (81997 - 104981) Tinggi<br />'
        });

lyr_agama_0.setVisible(true);
var layersList = [baseLayer,lyr_agama_0];
lyr_agama_0.set('fieldAliases', {'KECAMATAN': 'KECAMATAN', 'Islam': 'Islam', });
lyr_agama_0.set('fieldImages', {'KECAMATAN': 'TextEdit', 'Islam': 'TextEdit', });
lyr_agama_0.set('fieldLabels', {'KECAMATAN': 'inline label', 'Islam': 'inline label', });
lyr_agama_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});