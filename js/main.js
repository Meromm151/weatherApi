// vars
let search = document.getElementById("search");
let todayWeekDay = document.querySelector("#weatherDisplay .today .week-day");
let todayDate = document.querySelector("#weatherDisplay .today .date");
let city = document.querySelector("#weatherDisplay .today .city");
let temp = document.querySelector("#weatherDisplay .today .temp span");
let iconImg = document.querySelector("#weatherDisplay .today .temp img");
let condition = document.querySelector(
  "#weatherDisplay .today .temp .condition"
);

// input listener
search.addEventListener("input", () => {
  var city = search.value;
  api(city);
});

// api
function api(city) {
  let searchApi = new XMLHttpRequest();
  searchApi.open(
    "get",
    `http://api.weatherapi.com/v1/current.json?key=03cb5eaf98dd4afbac163840240101&q=${city}`
  );
  searchApi.send();
  searchApi.addEventListener("readystatechange", () => {
    if (searchApi.readyState === 4 && searchApi.status === 200) {
      //getting response
      let fullInfoObject = JSON.parse(searchApi.responseText);
      console.log(fullInfoObject);
      display(fullInfoObject);
    }
  });
}

function display(fullInfoObject) {
  let week = ["sunday","monday","tuseday","wednesday","thursday","frieday","suterday",];
  let month=["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"]
  // formating and getting date
  let dateNow= new Date(fullInfoObject.current.last_updated);
  todayWeekDay.innerHTML =week[dateNow.getDay()];
  todayDate.innerHTML =dateNow.getDate() + month[dateNow.getMonth()]
  //getting city , tempriture ,day condition and day condition icon
  city.innerHTML = fullInfoObject.location.name;
  temp.innerHTML = fullInfoObject.current.temp_c;
  iconImg.src = fullInfoObject.current.condition.icon;
  condition.innerHTML = fullInfoObject.current.condition.text;
}

function getIPFromAmazon() {
  // let ip = new XMLHttpRequest();
  // ip.open("get" , "https://checkip.amazonaws.com/")
  fetch("https://checkip.amazonaws.com/").then(res => res.text()).then(data => console.log(data))
  // ip.send();
  // ip.addEventListener("readystatechange", ()=>{
  //   if (ip.readyState === 4 && ip.status === 200) {
  //     console.log(ip.responseText)
  //   }
  // })
}

getIPFromAmazon()