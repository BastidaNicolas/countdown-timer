const months = [
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
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//getting elements from the HTML doc
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

//this is to keep the program running so it works for ever (this will check what the current date is and add 10 days)
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
const futureDate = new Date (tempYear, tempMonth, tempDay + 10, 11, 30, 0);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//setting goal day, months start counting from 0 like an array and hourse are in 24hr format // this is how it should be done normaly
// let futureDate = new Date(2022, 4, 24, 11, 30, 0);

//getting and setting up values from futureDate, you can get values from your current date by taking out the falues in futureDate and leaving the method empty
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date = futureDate.getDate();//gives day number as written in futureDate
const weekday = weekdays[futureDate.getDay()];//getDay gives numbers from 0 to 6 so we can use it to get value from an array
let month = months[futureDate.getMonth()];//In months we do the same as the day to get the name of the month from an array

//placing the values from futureDate in the subtitle of the HTML doc
giveaway.textContent = `giveaway ends on ${weekday} ${date} ${month} ${year} ${hours}:${minutes}am`;

//Setting up time for the count down, the idea is subtracting the future date in ms with the current date and the result just dispaly it in HTML//

//futureDate in ms
const futureTime = futureDate.getTime();

function getRemainingTime(){

  //getting current date in ms
  const today = new Date().getTime();

  //getting the diferance of time between end date and today
  const t = futureTime - today;

  //turning t that is in ms into days, hours and seconds
  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMin = 60*1000;
  const oneSecond = 1000;

  //calculating to pass ms to days, hours, minutes and sec
  let days = t / oneDay;
  days = Math.floor(days);//rounding down the number
  let hours = Math.floor((t%oneDay) / oneHour);
  let minutes = Math.floor((t% oneHour)/ oneMin);
  let seconds = Math.floor((t% oneMin)/oneSecond);
  
  //array to set values of date
  const values = [days, hours, minutes, seconds];

  //adds a 0 id the item value in less than 10 so it looks like 09 instead of 9
  function format(item){
    if(item<10){
      return (item = `0${item}`);
    }
    return item;
  }
 
  //goes through the values Array and sets it to each element in the HTML witch is items
  items.forEach(function(item, index){
    item.innerHTML = format(values[index]);
  });
  //once the timer reaches 0 it'll show this
  if(t < 0 ){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry,this giveaway has expired</h4>`;
  }
}

//make numbers refresh every second, it calls back the function every second
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
