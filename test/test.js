var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:8080");

describe("GET /city/{city_id}", function() {

  it("Gets city by id", function(done) {
    server
    .get("/cities/2873891")
    .expect("Content-type",/json/)
    .expect(200,done);
  });

  it("Returns status code 404 if city not found", function(done) {
    server
    .get("/cities/7")
    .expect("Content-type",/json/)
    .expect(404,done);
  });

});

describe("GET /cities/{city_id}/weather", function() {

  it("Gets city weather by id", function(done) {
    server
    .get("/cities/2873891/weather")
    .expect("Content-type",/json/)
    .expect(200,done);
  });

  it("Returns status code 400 if city not found", function(done) {
    server
    .get("/cities/7/weather")
    .expect("Content-type",/json/)
    .expect(404,done);
  });
})

describe("GET /cities?lat={latitude}&lng={longitude}", function(done) {

  it("Gets available cities around the specified latitude/longitude", function(done) {
    server
    .get("/cities?lat=49.48&lng=8.46")
    .expect("Content-type",/json/)
    .expect(200,done);
  });

  it("Returns status code 400 if parameters are missing", function(done) {
    server
    .get("/cities")
    .expect("Content-type",/json/)
    .expect(400,done);
  });
});
