document.addEventListener("DOMContentLoaded", function() {
    const key = window.MAP_API_KEY;
    const map = new L.Map('map', {maxZoom: 22}).setView([53.45, -7.3], 5.5);
    const mtLayer = L.maptiler.maptilerLayer({
        style: L.maptiler.MapStyle.DATAVIZ.LIGHT,
        apiKey: key,
    }).addTo(map);

    const markers = L.markerClusterGroup();

    (async () => {
      const responseStations = await fetch('/models/stationsData.json');
      const jsonDataStations = await responseStations.json();
      const activeStations = await jsonDataStations.stationsData.filter((s) => s.deleted === false);
      const responseRecords = await fetch('/models/recordsData.json');
      const jsonDataRecords = await responseRecords.json();
      // const stationSummary = await stationsStore.getSummaryForTheStation(station[0].id)
      // console.log("activeStations : " + JSON.stringify(activeStations));

      for (let i = 0; i < activeStations.length; i++) {
        const station = activeStations[i];
        const title = station.name;
        let description = 'd';
        const latestRecord = jsonDataRecords.recordsData
          .filter(record => (record.station_id === station.id) && (record.deleted === false));
        if (latestRecord) {
          const latest = latestRecord[latestRecord.length - 1];
          description = `<font color="grey">${latest.timestamp_created}</font><br><br>${latest.temperature} °C <br>${latest.wind_speed} m/s`;
        }
        
        const marker = L.marker(new L.LatLng(station.latitude, station.longitude), { title: title }, { description: description });
        marker.bindPopup(`${title}`);
        markers.addLayer(marker);
        marker.on('click', function() {
          const popupContent = `<font size="3"><strong><a href="/stations/${station.id}">${title}</a></strong></font><br>${description}`;
          marker.bindPopup(popupContent).openPopup();
        });
      }
      map.addLayer(markers);
    })();
    });