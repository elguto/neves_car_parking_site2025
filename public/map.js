const map = L.map('map').setView([-19.7397, -44.0477], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

L.marker([-19.7397, -44.0477])
  .addTo(map)
  .bindPopup('Neves Car Parking<br>R. Raimundo Nonato de Souza, 701<br>Ribeirão das Neves - MG')
  .openPopup();
