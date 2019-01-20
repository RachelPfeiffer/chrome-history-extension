
const oneWeekAgo = Date.now() - 1000*60*60*24*7;
console.log(oneWeekAgo);
let getHistory = function(callback) {
  chrome.history.search({
    text : '',
    maxResults : 100000,
    startTime : oneWeekAgo
  }, function (results) {
    let number = 1;
    for(result of results) {
      callback(result);
      console.log(number + " " +result.title);
      number +=1;
    }
  });
}

let getTitle = [1];
getHistory(function(entry) {
  getTitle.push(entry);
});
chrome.runtime.sendMessage({msg: 'hello there'});
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({function: getTitle});
      console.log(getTitle);
  });
