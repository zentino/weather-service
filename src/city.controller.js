'use strict';
const fs = require('fs');
const rawdata = fs.readFileSync('./city.list.json');
const cityList = JSON.parse(rawdata);
const RADIUS = 10;

class WeatherController {

  getCityById(id) {
    let city = cityList.filter(it => it.id == id);
    return city[0];
  }

  getAvailableCities(latitude, longitude) {
    let lat1 = parseFloat(latitude);
    let lon1 = parseFloat(longitude);
    let cities = [];
    cityList.filter(it => {
        if(this.calculateDistance(parseFloat(latitude), parseFloat(longitude), it.coord.lat, it.coord.lon) <= RADIUS) {
          cities.push({id:it.id, name:it.name});
        }
      }
    );
    return cities;
  }

  // Haversine formula to calculate the distance between two points
  calculateDistance(lat1, lon1, lat2, lon2) {
    let R = 6371 // kilometres
    let pi = Math.PI;
    let φ1 = lat1 * (pi/180);
    let φ2 = lat2 * (pi/180);
    let Δφ = (lat2-lat1) * (pi/180);
    let Δλ = (lon2-lon1) * (pi/180);

    let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    let d = R * c;
    return d;
  }

}

module.exports = new WeatherController();
