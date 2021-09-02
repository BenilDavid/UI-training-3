var ip = '8.8.8.8';
var api_key = 'at_uWV6xaU9LfR3EGXUYEWKZkwohgsYG';

var current_ip = document.getElementById('current_ip');
var current_location = document.getElementById('current_location');
var current_time = document.getElementById('current_time');
var current_isp = document.getElementById('current_isp');

var entered_ip = document.getElementById('ip_address');
var search_btn = document.getElementById('search_btn');

var map = L.map('map', {
	center: [51.505, -0.09],
	zoom: 13,
	layers: [
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}),
	],
});
// console.log(map);
// var mark = L.marker([51.505, -0.09])
// 	.addTo(map)
// 	.bindPopup('Your IP Location.')
// 	.openPopup();

$.getJSON('https://api.ipify.org?format=json', function (data) {
	console.log(data.ip);
	$(function () {
		$.ajax({
			url: 'https://geo.ipify.org/api/v1',
			data: { apiKey: api_key, ipAddress: data.ip },
			success: function (data) {
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

search_btn.addEventListener('click', function () {
	console.log(entered_ip.value);
	ip = entered_ip.value;
	$(function () {
		$.ajax({
			url: 'https://geo.ipify.org/api/v1',
			data: { apiKey: api_key, ipAddress: ip },
			success: function (data) {
				// $('body').append('<pre>' + JSON.stringify(data, '', 2) + '</pre>');
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
	current_ip.innerHTML = ip;
	current_location.innerHTML = country;
	current_time.innerHTML = timezone;
	current_isp.innerHTML = isp;
}

// updating map marker
function updateMapMarker(latitude, longitude) {
	console.log(latitude);
	console.log(longitude);

	// map.removeLayer(mark);

	var marker = L.marker(map.getCenter()).addTo(map);
	var newLatLng = new L.LatLng(latitude, longitude);
	marker.setLatLng(newLatLng);
	map.setView([latitude, longitude], 13);
}
