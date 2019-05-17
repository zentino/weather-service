'use strict';
const fs = require('fs');
const rawdata = fs.readFileSync('city.list.json');
const cityList = JSON.parse(rawdata);

class WeatherController {

  getCityById(id) {
    let city = cityList.filter(it => it.id == id);
    return city[0];
  }

  getCityWeatherById(id) {
    console.info(`getCityWeatherById city_id = ${id}`);
  }

  getAvailableCities(latitude, longitude) {
    console.info(`getAvailableCities latitude = ${latitude}, longitude = ${longitude}`);
  }

}

module.exports = new WeatherController();
