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
var format_Pendidikan_0 = new ol.format.GeoJSON();
var features_Pendidikan_0 = format_Pendidikan_0.readFeatures(json_Pendidikan_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Pendidikan_0 = new ol.source.Vector({
    attributions: [new ol.Attribution({html: '<a href=""></a>'})],
});
jsonSource_Pendidikan_0.addFeatures(features_Pendidikan_0);var lyr_Pendidikan_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Pendidikan_0, 
                style: style_Pendidikan_0,
    title: 'Pendidikan<br />\
    <img src="styles/legend/Pendidikan_0_0.png" />  688 - 1557 <br />\
    <img src="styles/legend/Pendidikan_0_1.png" />  1557 - 2425 <br />\
    <img src="styles/legend/Pendidikan_0_2.png" />  2425 - 3294 <br />\
    <img src="styles/legend/Pendidikan_0_3.png" />  3294 - 4162 <br />\
    <img src="styles/legend/Pendidikan_0_4.png" />  4162 - 5031 <br />\
    <img src="styles/legend/Pendidikan_0_5.png" />  5031 - 5900 <br />\
    <img src="styles/legend/Pendidikan_0_6.png" />  5900 - 6768 <br />\
    <img src="styles/legend/Pendidikan_0_7.png" />  6768 - 7637 <br />\
    <img src="styles/legend/Pendidikan_0_8.png" />  7637 - 8505 <br />\
    <img src="styles/legend/Pendidikan_0_9.png" />  8505 - 9374 <br />'
        });

lyr_Pendidikan_0.setVisible(true);
var layersList = [baseLayer,lyr_Pendidikan_0];
lyr_Pendidikan_0.set('fieldAliases', {'KECAMATAN': 'KECAMATAN', 'D4/S1/S2/3': 'D4/S1/S2/3', });
lyr_Pendidikan_0.set('fieldImages', {'KECAMATAN': 'TextEdit', 'D4/S1/S2/3': 'TextEdit', });
lyr_Pendidikan_0.set('fieldLabels', {'KECAMATAN': 'inline label', 'D4/S1/S2/3': 'inline label', });
lyr_Pendidikan_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});