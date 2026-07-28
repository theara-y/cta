document.getElementById('find-btn').addEventListener('click', () => {
  const status = document.getElementById('status');

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
    return;
  }

  status.textContent = 'Locating...';

  // Request the user's current position
  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = `Found! Lat: ${latitude}, Lon: ${longitude}`;
    
    // Pass coordinates to your API function
    fetchNearestBusStops(latitude, longitude);
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }
});


function fetchNearestBusStops(lat, lon) {
  // Replace this URL with your chosen Transit API (e.g., Overpass/OSM, Google Maps, or local transit API)
  const apiUrl = `https://example.com{lat}&lon=${lon}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log('Bus stops found:', data);
      // Code to display the stops on your page goes here
    })
    .catch(err => {
      console.error('Error fetching transit data:', err);
    });
}
