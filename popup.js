// This function displays the time properly in Excel
function displayTime(x) {
  const visitStamp = new Date(x);
  //get the Date
  var day = visitStamp.getDate();
  //get the month
  var month = visitStamp.getMonth()+1;
  //get the year
  var year = visitStamp.getYear()-100;
// Hours part from the timestamp
var hours = visitStamp.getHours();
// Minutes part from the timestamp
var minutes = "0" + visitStamp.getMinutes();
// Will display time in 10:30:23 format
var formattedTime = month + '/' + day + ' ' + hours + ':' + minutes.substr(-2);
return formattedTime;
}

const main = document.querySelector('main');

// This part gets the week's history from background.js and puts it in an array.
let csvArray = [["Page Title", "Visit Time", "Visit Count"]];
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(csvArray);
  for (entry of response.function) {
    let shortTitle = entry.title;
    let entryArray = [shortTitle, displayTime(entry.lastVisitTime), entry.visitCount];
    csvArray.push(entryArray);
    }
});

// This part takes the populated csv array, shortens the lines if they're too long, and puts them in csv format
setTimeout(function () {
let csvContent = "data:text/csv;charset=utf-8,";
csvArray.forEach(function(rowArray){
  console.log(rowArray[0]);
   let row = rowArray.join(",");
   csvContent += row + "\r\n";
});

// This part puts the csv file into a downloadable uri and links that uri to the "click for history" button.
  var encodedUri = encodeURI(csvContent);
  const historyButton = document.querySelector('.getHistory');
  const link = document.createElement("a");
  link.innerText = '1) Download history';
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data.csv");
  historyButton.appendChild(link);
},200);

// When clicked, turn button green and change button text to DONE
const allButtons = document.querySelectorAll('button');
for (button of allButtons) {
  button.addEventListener('click', function (e) {
    e.target.parentElement.classList.add('green');
    e.target.innerText = "DONE";
  })

  }
