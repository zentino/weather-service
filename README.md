## Coding Challenge 
To build the REST based weather service I used the node.js module 'restify', because I think it is a very intuitiv way of defining routes, being used to
other Frameworks. I started by defining the server and routes in the index.js file and created a city.controller which is responsible for getting the city
details and handling calculations. At first the controller handled calls at route /cities/:city_id/weather also, but I had an error I couldn't fix in due time,
thats why I outsourced the requests to the http://openweathermap.org/ API in the index.js file, which fixed the error. For testing the RESTful API I used the modules
'mocha' 'supertest' and 'should'. The methods used for writing tests with these libraries are easy to understand and the syntax is easy to read. I removed the
function 'calculateDistance' that used the haversine formula to calculate the distance between to points, and replaced it with the node.js module 'haversine' to ensure the
right functionality.

Some of the things that are still left TO DO are:
* dockerize tests

### Dependencies
* restify
* request
* mocha
* supertest
* should
* haversine

-Start app: npm start <br>
-Start tests: npm test
