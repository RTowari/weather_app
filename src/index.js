import _ from 'lodash';
import './style.css';

document.querySelector(".add-button").addEventListener("click", render_form)
document.querySelector(".location-form form").addEventListener("submit", submit_form);

class weatherItem {
    constructor(location, first_day, second_day, third_day) {
      this.location = location;
      this.first_day = first_day;
      this.second_day = second_day;
      this.third_day = third_day;
    }

    get get_location() {
      return this.location;
    }

    set set_location(value) {
      this.location = value;
    }

    get get_first_day() {                                                          
      return this.first_day;
    }

    set set_first_day(value) {
      this.first_day = value;
    }

    get get_second_day() {
      return this.second_day;
    }

    set set_second_day(value) {
      this.second_day = value;
    }

    get get_third_day() {
      return this.third_day;
    }

    set set_third_day(value) {
      this.third_day = value;
    }
}

let forecast_list = [];

// Render form for the user to write a location
function render_form(e) {

    set_overlay("enable");
    set_form("enable");
}


// Submit data and call another function to manage the data
function submit_form(e) {
    e.preventDefault();

    location_name = document.querySelector("#location-name").value

    set_form("disable");
    set_overlay("disable");

    set_forecast(location_name);
}

// This function manage everything to make a new forecast item
async function set_forecast(location_name) {

    // Gets response
    weatherResponse = 
        await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2f273046412a4ed1a11232227230111&q=${location_name}&days=3&aqi=no&alerts=no`)
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                return response.forecast.forecastday;
            })

    // Filter details and set them in a ordered array
    const information_of_days = weatherResponse.map(set_details);

    // Uses the array to make a new forecast item
    set_item(information_of_days, location_name);

    // Insert item in page
    render_items_in_page()

}


function set_details(element) {

  const day = {
    date: element.date,
    chance_of_rain: element.day.daily_chance_of_rain, 
    avgtemp_c: element.day.avgtemp_c
  };

  return day;
}


function set_item(days, location_name) {
  let new_item = new weatherItem(location_name, days[0], days[1], days[2])
  forecast_list.push(new_item);
}


function render_items_in_page() {

  // Remove all weather elements in page to render all of them all over again
  const weather_elements_in_page = document.querySelectorAll(".weather-panel");

  weather_elements_in_page.forEach(element => element.remove());

  forecast_list.forEach((element) => {

    const location = element.get_location;
    const first_day_arr = element.get_first_day;
    const second_day_arr = element.get_second_day;
    const third_day_arr = element.get_third_day;

    console.log(first_day_arr)
    console.log(second_day_arr)
    console.log(third_day_arr)

    const html_position = document.querySelector(".add-button");

    const text = `
    <div class="weather-panel">
      <div class="place-title">${location}</div>
      <div class="days-wrapper">
        <div class="day-content" id="tomorrow">
          <div class="day-title">Today</div>
          <div class="day-details">
            <img class="weather-image" src="sun.png">
            <div class="temperature">${first_day_arr.avgtemp_c}º</div>
            <div class="wind-speed">24km/h</div>
          </div>
        </div>
        <div class="day-content" id="tomorrow">
          <div class="day-title">Tomorrow</div>
          <div class="day-details">
            <img class="weather-image" src="sun.png">
            <div class="temperature">${second_day_arr.avgtemp_c}</div>
            <div class="wind-speed">24km/h</div>
          </div>
        </div>
        <div class="day-content" id="overtomorrow">
          <div class="day-title">Overtomorrow</div>
          <div class="day-details">
            <img class="weather-image" src="sun.png">
            <div class="temperature">${third_day_arr.avgtemp_c}</div>
            <div class="wind-speed">24km/h</div>
          </div>
        </div>
      </div>
    </div>
    `
  
    html_position.insertAdjacentHTML("afterend", text);
  })
}





function set_overlay(option) {
    if (option == "enable") {
        document.querySelector(".overlay").style.display = "block";
    }
    else {
        document.querySelector(".overlay").style.display = "none";
    }   
}
 

function set_form(option) {
    if (option == "enable") {
        document.querySelector(".location-form").style.display = "block";
    }
    else {
        document.querySelector(".location-form").style.display = "none";
    }
}

