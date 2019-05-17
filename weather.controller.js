'use strict';
class WeatherController {

  getCityById(id) {
    console.info(`getCityById ${id}`);
  }

  getCityWeatherById(id) {
    console.info(`getCityWeatherById city_id = ${id}`);
  }

  getAvailableCities(latitude, longitude) {
    console.info(`getAvailableCities latitude = ${latitude}, longitude = ${longitude}`);
  }

}

module.exports = new WeatherController();
