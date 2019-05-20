'use strict';
const fs = require('fs');
const rawdata = fs.readFileSync('./city.list.json');
const cityList = JSON.parse(rawdata);
const haversine = require('haversine')
const RADIUS = 10; // km

class CityController {

  getCityById(id) {
    let city = cityList.filter(it => it.id == id);
    return city[0];
  }

  /**
  * Returns a list of available cities around a specified
  * latitude/longitude (start) within a given radius.
  *
  * @return list of available cities
  */
  getAvailableCities(lat, lon) {
    let cities = [];
    let start = {latitude: lat, longitude: lon};
    let end = {};
    cityList.filter(it => {
        end = {latitude: it.coord.lat, longitude: it.coord.lon};
        if(haversine(start, end) <= RADIUS) {
          cities.push({id:it.id, name:it.name});
        }
      }
    );
    return cities;
  }

}

module.exports = new CityController();
