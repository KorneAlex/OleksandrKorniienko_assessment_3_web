// it took me some time to understand how the getCurrentPosition works. I wanted to get the lat and lon
// and use them outside this function and right now typing this I'm thinking I'll use local storage for the next patch 
// to be able to use geodata in other functions. But I'll commit it how it is to show you the process.

// used info:
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
// https://www.youtube.com/watch?v=VK9F8BWrOgY


// TODO: use the local storage instead of this mess


document.addEventListener("DOMContentLoaded", getLocation());
export function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
  } else {
      try {
          x.innerHTML = "Geolocation is not supported by this browser.";
      } catch (e) {
          "ERRORR location"
      }
  }
}

function success(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
      console.log(lat + " " + lon);
      
      const key = window.MAP_API_KEY;
      const map = new L.Map('map', {maxZoom: 22}).setView([lat, lon], 5.5);
      const mtLayer = L.maptiler.maptilerLayer({
        style: L.maptiler.MapStyle.DATAVIZ.LIGHT, //BACKDROP.DARK TONER.LITE BASIC.LIGHT
        apiKey: key,
      }).addTo(map);

      const markers = L.markerClusterGroup();
      
      (async () => {
        const responseStations = await fetch('/models/stationsData.json');
        const jsonDataStations = await responseStations.json();
        const activeStations = await jsonDataStations.stationsData.filter((s) => s.deleted === false);
        const responseRecords = await fetch('/models/recordsData.json');
        const jsonDataRecords = await responseRecords.json();

        for (let i = 0; i < activeStations.length; i++) {
          const station = activeStations[i];
          const title = station.name;
          let description = 'd';
          try { const latestRecord = jsonDataRecords.recordsData
            .filter(record => (record.station_id === station.id) && (record.deleted === false)); 
            if (latestRecord) {
              const latest = latestRecord[latestRecord.length - 1];
              description = `<font color="grey">${latest.timestamp_created}</font><br><br>${latest.temperature} °C <br>${latest.wind_speed} m/s`;
            }
          } catch {
            description = `<font color="grey">no data</font>`;
          }
          
          const marker = L.marker(new L.LatLng(station.latitude, station.longitude), { title: title }, { description: description });
          markers.addLayer(marker);
          marker.on('click', function() {
            const popupContent = `<font size="3"><strong><a href="/stations/${station.id}">${title}</a></strong></font><br>${description}`;
            marker.bindPopup(popupContent).openPopup();
          });
        }
        map.addLayer(markers);
      })();
  }
  
  function error() {
    const key = window.MAP_API_KEY;
      const map = new L.Map('map', {maxZoom: 22}).setView([53.45, -7.3], 5.5);
      const mtLayer = L.maptiler.maptilerLayer({
        style: L.maptiler.MapStyle.DATAVIZ.LIGHT, //BACKDROP.DARK TONER.LITE BASIC.LIGHT
        apiKey: key,
      }).addTo(map);

      const markers = L.markerClusterGroup();
      
      (async () => {
        const responseStations = await fetch('/models/stationsData.json');
        const jsonDataStations = await responseStations.json();
        const activeStations = await jsonDataStations.stationsData.filter((s) => s.deleted === false);
        const responseRecords = await fetch('/models/recordsData.json');
        const jsonDataRecords = await responseRecords.json();

        for (let i = 0; i < activeStations.length; i++) {
          const station = activeStations[i];
          const title = station.name;
          let description = 'd';
          try { const latestRecord = jsonDataRecords.recordsData
            .filter(record => (record.station_id === station.id) && (record.deleted === false)); 
            if (latestRecord) {
              const latest = latestRecord[latestRecord.length - 1];
              description = `<font color="grey">${latest.timestamp_created}</font><br><br>${latest.temperature} °C <br>${latest.wind_speed} m/s`;
            }
          } catch {
            description = `<font color="grey">no data</font>`;
          }
          
          const marker = L.marker(new L.LatLng(station.latitude, station.longitude), { title: title }, { description: description });
          markers.addLayer(marker);
          marker.on('click', function() {
            const popupContent = `<font size="3"><strong><a href="/stations/${station.id}">${title}</a></strong></font><br>${description}`;
            marker.bindPopup(popupContent).openPopup();
          });
        }
        map.addLayer(markers);
      })();
  }