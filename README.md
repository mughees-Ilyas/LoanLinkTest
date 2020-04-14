# LoanLink test app

steps to run the project.
1) clone the project.
2) run npm install to install dependencieis.
3)run npm start.

## user credintials
for login purpose use 

username: test

password: test

or

username: test2

password: test2

or

username: admin

password: admin

only admin account have access to add functionality for thermostat.


as backend is a mocked one, if you refresh the page all new thermostats will be deleted.

## routes
we have   

/login route for login

/thermostats for thermostat list view

/thermostat/:id to view specific thermostat.

/thermostats/thermostat/new to add new thermostat


## Project file setup

pages folder have all the pages (login, thermostat view etc)

components folder have components that are either universal such as navbar or reuseable.

_models folder have all the models needed for project.

_helper folder have auth guard to specifiy which routes are protected and some HTTP intercepter function to mock backend

_Service folder have project services (authentication and thermostat service) 


## project explanation.

We have a simple authentication model to login. it will be intercepted by our mock backend which is build using HTTP interceptor

After login we will have thermostat view that list all thermostat, if you click on any thermostat you will be redirected to its data page. we also have a view to add new thermostat.all these views are
bundeled together in thermostat component.

