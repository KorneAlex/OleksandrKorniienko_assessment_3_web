// it took me some time to understand how the getCurrentPosition works. I wanted to get the lat and lon
// and use them outside this function and right now typing this I'm thinking I'll use local storage for the next patch
// to be able to use geodata in other functions. But I'll commit it how it is to show you the process.
// I wanted to add the page refresh after user accepts toshare the location but it didnt work with simple location.reload()
// There is an option to do it withe the promise instead of localStorage: https://stackoverflow.com/questions/55730280/refresh-the-page-after-user-allowing-location
// maybe I'll come back to it later.

// used info:
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
// https://www.youtube.com/watch?v=VK9F8BWrOgY

document.addEventListener("DOMContentLoaded", getLocation());
document.addEventListener("DOMContentLoaded", function () {
  const key = window.MAP_API_KEY;
  const lat = localStorage.getItem("lat");
  const lon = localStorage.getItem("lon");
  //for some reason regular if(){}else{} didnt work here. I really love this way to write if-else. Looks tidier.
  const map = new L.Map("map", { maxZoom: 22 }).setView(
    [lat ? lat : 53.45, lon ? lon : -7.3],
    5.5
  );
  const mtLayer = L.maptiler
    .maptilerLayer({
      style: L.maptiler.MapStyle.DATAVIZ.LIGHT, //BACKDROP.DARK TONER.LITE BASIC.LIGHT
      apiKey: key,
    })
    .addTo(map);
  const markers = L.markerClusterGroup();

  (async () => {
    const responseStations = await fetch("/models/stationsData.json");
    const jsonDataStations = await responseStations.json();
    const activeStations = await jsonDataStations.stationsData.filter(
      (s) => s.deleted === false
    );
    const responseRecords = await fetch("/models/recordsData.json");
    const jsonDataRecords = await responseRecords.json();

    for (let i = 0; i < activeStations.length; i++) {
      const station = activeStations[i];
      const title = station.name;
      let description = "d";
      try {
        const latestRecord = jsonDataRecords.recordsData.filter(
          (record) =>
            record.station_id === station.id && record.deleted === false
        );
        if (latestRecord) {
          const latest = latestRecord[latestRecord.length - 1];
          description = `in ${station.city}<br><font color="grey">${latest.timestamp_created}</font><br><br>${latest.temperature} °C <br>${latest.wind_speed} m/sec <span><img src="/views/partials/icons/wind_unselected.svg" alt="wind_direction}"
            style="position: absolute; height: 16px; width: 16px; rotate: -${latest.wind_direction}deg;"></span>
        <span style="padding-left: 20px;">${latest.wind_direction}°</span><br>${latest.pressure} hPa`;
        }
      } catch {
        description = `<font color="grey">no data</font>`;
      }

      const marker = L.marker(
        new L.LatLng(station.latitude, station.longitude),
        { title: title },
        { description: description }
      );
      markers.addLayer(marker);
      marker.on("click", function () {
        const popupContent = `<font size="3"><strong><a href="/stations/${station.id}">${title}</a></strong></font><br>${description}`;
        marker.bindPopup(popupContent).openPopup();
      });
    }
    map.addLayer(markers);
  })();
});

export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    try {
      x.innerHTML = "Geolocation is not supported by this browser.";
    } catch (e) {
      ("ERRORR location");
    }
  }
}

function success(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat + " " + lon);
  localStorage.setItem("lat", String(lat));
  localStorage.setItem("lon", String(lon));
  // location.reload(); // doesnt work how I want. There is an option to do it withe the promise instead of localStorage
}

function error() { }
