// Mapa
const map = L.map('issMap').setView([0, 0], 1);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Marcador Customizado 
const issIcon = L.icon({
    iconUrl: './img/iss.png',
    iconSize:     [45, 35], // size of the icon
    iconAnchor: [25,16],
    popupAnchor:  [-3, -36] // point from which the popup should open relative to the iconAnchor
});
const marker = L.marker([0, 0], {icon: issIcon}).addTo(map)
.bindPopup('¡Hola! acá estoy')
.openPopup();

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

let firstTime = true;

async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude } = data;
    marker.setLatLng([latitude,longitude]);

    if (firstTime) {
        map.setView([latitude,longitude], 3);
        firstTime = false;
    }
    

    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);
};

getISS();

setInterval(getISS, 1500)