document.addEventListener("DOMContentLoaded", function() {
    const key = window.MAP_API_KEY;
    const map = new L.Map('map', {maxZoom: 22}).setView([53.45, -7.3], 5.5);
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
        
        const description = 'info'; // TODO
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
    });