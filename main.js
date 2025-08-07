// import { MaptilerLayer, MapStyle } from '@maptiler/leaflet-maptilersdk';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.markercluster';
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// const key = process.env.map;
// const map = new L.Map('map', {maxZoom: 22}).setView([0, 20], 1);
// const mtLayer = new MaptilerLayer({
//   style: MapStyle.DATAVIZ.LIGHT,
//   apiKey: key,
// }).addTo(map);

// const markers = L.markerClusterGroup();

// (async () => {
//   const response = await fetch('https://docs.maptiler.com/sdk-js/assets/earthquakes.geojson');
//   const jsonData = await response.json();

//   for (let i = 0; i < jsonData.features.length; i++) {
//     const feature = jsonData.features[i];
//     const title = feature.properties.mag;
//     const marker = L.marker(new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]), { title: title });
//     marker.bindPopup(`${title}`);
//     markers.addLayer(marker);
//   }

//   map.addLayer(markers);
// })();