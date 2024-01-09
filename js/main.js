"strict mode";
// sellectors
let search = document.getElementById("search");
let today = {
  weekDay: document.querySelector(".today .week-day"),
  date: document.querySelector(".today .date"),
  city: document.querySelector(".today .city"),
  temp: document.querySelector(".today .temp span"),
  iconImg: document.querySelector(".today .temp img"),
  condition: document.querySelector(".today .temp .condition"),
};
let tomorrow = {
  weekDay: document.querySelector(".tomorrow .week-day"),
  bigTemp: document.querySelector(".tomorrow .big-temp"),
  smallTemp: document.querySelector(".tomorrow .small-temp"),
  iconImg: document.querySelector(".tomorrow .temp img"),
  condition: document.querySelector(".tomorrow .temp .condition"),
};
let nextDay = {
  weekDay: document.querySelector(".next-day .week-day"),
  bigTemp: document.querySelector(".next-day .big-temp"),
  smallTemp: document.querySelector(".next-day .small-temp"),
  iconImg: document.querySelector(".next-day .temp img"),
  condition: document.querySelector(".next-day .temp .condition"),
};
let myday = [today, tomorrow, nextDay];

let clientIp;
let fullInfoObject;
let dateNow;
let week = [
  "sunday",
  "monday",
  "tuseday",
  "wednesday",
  "thursday",
  "frieday",
  "suterday",
];
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let ip = fetch("https://api.ipify.org?format=json")
  .then((resolve) => {
    return resolve.json();
  })
  .then((resolve) => {
    clientIp = resolve.ip;
  });
async function gettingIp() {
  await ip;
  await currentWeather(clientIp);
  displayCurrentWeather();
  displayForcast();
}
gettingIp();

// input listener
search.addEventListener("input", () => {
  var city = search.value;
  async function gettingIp(city) {
    await currentWeather(city);
    displayCurrentWeather();
    displayForcast();
  }
  gettingIp(city);
});

// weather api
async function currentWeather(city) {
  try {
    await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=03cb5eaf98dd4afbac163840240101&q=${city}&days=3`
    )
      .then(
        (resolved) => {
          return resolved.json();
        },
        (regect) => {
          throw Error("cant fetch " + regect);
        }
      )
      .then((resolved) => {
        fullInfoObject = resolved;
        dateNow = new Date(fullInfoObject.location.localtime);
      });
  } catch {
    throw Error("api.weatherapi.com can't fetch");
  }
}
function displayCurrentWeather() {
  // formating and getting date
  today.weekDay.innerHTML = week[dateNow.getDay()];
  today.date.innerHTML = dateNow.getDate() + month[dateNow.getMonth()];
  //getting city , tempriture ,day condition and day condition icon
  today.city.innerHTML = fullInfoObject.location.name;
  today.temp.innerHTML = fullInfoObject.current.temp_c;
  today.iconImg.src = fullInfoObject.current.condition.icon;
  today.condition.innerHTML = fullInfoObject.current.condition.text;
}
function displayForcast() {
  for (let i = 1; i < myday.length; i++) {
    let date = new Date(fullInfoObject.forecast.forecastday[i].date);
    myday[i].weekDay.innerHTML = week[date.getDay()];
    myday[i].bigTemp.innerHTML =
      fullInfoObject.forecast.forecastday[i].day.maxtemp_c;
    myday[i].smallTemp.innerHTML =
      fullInfoObject.forecast.forecastday[i].day.mintemp_c;
    myday[i].iconImg.src =
      fullInfoObject.forecast.forecastday[i].day.condition.icon;
    myday[i].condition.innerHTML =
      fullInfoObject.forecast.forecastday[i].day.condition.text;
  }
}
