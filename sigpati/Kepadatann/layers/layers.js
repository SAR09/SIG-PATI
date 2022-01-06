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
var format_kepadataan_0 = new ol.format.GeoJSON();
var features_kepadataan_0 = format_kepadataan_0.readFeatures(json_kepadataan_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_kepadataan_0 = new ol.source.Vector({
    attributions: [new ol.Attribution({html: '<a href=""></a>'})],
});
jsonSource_kepadataan_0.addFeatures(features_kepadataan_0);var lyr_kepadataan_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_kepadataan_0, 
                style: style_kepadataan_0,
    title: 'kepadataan<br />\
    <img src="styles/legend/kepadataan_0_0.png" />  387 - 1134 <br />\
    <img src="styles/legend/kepadataan_0_1.png" />  1134 - 1880 <br />\
    <img src="styles/legend/kepadataan_0_2.png" />  1880 - 2627 <br />'
        });

lyr_kepadataan_0.setVisible(true);
var layersList = [baseLayer,lyr_kepadataan_0];
lyr_kepadataan_0.set('fieldAliases', {'KECAMATAN': 'KECAMATAN', 'jmlh pnddk': 'jmlh pnddk', 'LuasDaerah': 'LuasDaerah', 'Kepadatan': 'Kepadatan', });
lyr_kepadataan_0.set('fieldImages', {'KECAMATAN': 'TextEdit', 'jmlh pnddk': 'TextEdit', 'LuasDaerah': 'TextEdit', 'Kepadatan': 'TextEdit', });
lyr_kepadataan_0.set('fieldLabels', {'KECAMATAN': 'inline label', 'jmlh pnddk': 'inline label', 'LuasDaerah': 'inline label', 'Kepadatan': 'inline label', });
lyr_kepadataan_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});