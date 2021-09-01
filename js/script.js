var ip = '8.8.8.8';
var api_key = 'at_uWV6xaU9LfR3EGXUYEWKZkwohgsYG';

var current_ip = document.getElementById('current_ip');
var current_location = document.getElementById('current_location');
var current_time = document.getElementById('current_time');
var current_isp = document.getElementById('current_isp');

var entered_ip = document.getElementById('ip_address');
var search_btn = document.getElementById('search_btn');

var latitude = 13.0827;
var longitude = 80.2707;
// var map = L.map('map').setView([13.0827, 80.2707], 13);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	attribution:
// 		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// L.marker([13.0827, 80.2707])
// 	.addTo(map)
// 	// .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
// 	.openPopup();
map = L.map('map').setView([latitude, longitude], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([latitude, longitude])
	.addTo(map)
	// .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
	.openPopup();

search_btn.addEventListener('click', function () {
	console.log(entered_ip.value);
	ip = entered_ip.value;
	$(function () {
		$.ajax({
			url: 'https://geo.ipify.org/api/v1',
			data: { apiKey: api_key, ipAddress: ip },
			success: function (data) {
				$('body').append('<pre>' + JSON.stringify(data, '', 2) + '</pre>');
				updateResultDetails(
					data.ip,
					data.location.country,
					data.location.timezone,
					data.isp
				);
				updateMapMarker(data.location.lat, data.location.lng);
			},
		});
	});
});

// update result box
function updateResultDetails(ip, country, timezone, isp) {
	console.log(ip);
	console.log(country);
	console.log(timezone);
	console.log(isp);
	current_ip.innerHTML = ip;
	current_location.innerHTML = country;
	current_time.innerHTML = timezone;
	current_isp.innerHTML = isp;
}
function updateMapMarker(latitude, longitude) {
	console.log(latitude);
	console.log(longitude);

    
	// map = L.map('map').setView([latitude, longitude], 13);

	// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	// 	attribution:
	// 		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	// }).addTo(map);

	// L.marker([latitude, longitude])
	// 	.addTo(map)
	// 	// .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
	// 	.openPopup();
}
