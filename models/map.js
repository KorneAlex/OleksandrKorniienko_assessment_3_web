// import { MaptilerLayer, MapStyle } from '@maptiler/leaflet-maptilersdk';
// import L from 'leaflet';
// import L from 'leaflet.markercluster';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// console.log(L.MarkerClusterGroup); // Should be a function

//     const key = import.meta.env.map_api_key;
//     const map = new L.Map('map', {maxZoom: 22}).setView([53.5, -7], 5.5);
//     const mtLayer = L.maptiler.maptilerLayer({
//       style: L.maptiler.MapStyle.DATAVIZ.LIGHT,
//       apiKey: "key", //temp to not spend all free requests
//     }).addTo(map);

//     const markers = L.markerClusterGroup();

//     (async () => {
//       const response = await fetch('/models/geodata.geojson');
//       const jsonData = await response.json();

    //   for (let i = 0; i < jsonData.features.length; i++) {
    //     const feature = jsonData.features[i];
    //     const title = feature.properties.stationName;
    //     const description = 'sdsd';
    //     const marker = L.marker(new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]), { title: title }, { description: description });
    //     marker.bindPopup(`${title}`);
    //     markers.addLayer(marker);
    //     marker.on('click', function() {
    //       const popupContent = `<strong><a href="/stations/eb07ccad-d7a9-4a2b-b332-91c3d78729cb">${title}</a></strong><br>${description}`;
    //       marker.bindPopup(popupContent).openPopup();
    //     });
    //   }

//       map.addLayer(markers);
//     })();





    const key = process.env.MAP_API_KEY;
    const map = new L.Map('map', {maxZoom: 22}).setView([53.5, -7], 5.5);
    const mtLayer = L.maptiler.maptilerLayer({
      style: L.maptiler.MapStyle.DATAVIZ.LIGHT,
      apiKey: key,
    }).addTo(map);

    const markers = L.markerClusterGroup();

    (async () => {
      const response = await fetch('/models/stationsData.json');
      const jsonData = await response.json();

      for (let i = 0; i < jsonData.stationsData.length; i++) {
        const station = jsonData.stationsData[i];
        const title = station.name;
        const description = 'sdsd';
        const marker = L.marker(new L.LatLng(station.latitude, station.longitude), { title: title }, { description: description });
        marker.bindPopup(`${title}`);
        markers.addLayer(marker);
        marker.on('click', function() {
          const popupContent = `<strong><a href="/stations/${station.id}">${title}</a></strong><br>${description}`;
          marker.bindPopup(popupContent).openPopup();
        });
      }

      map.addLayer(markers);
    })();