//This function will run for every new tab
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	//get the keywords from local memory
	localArray = JSON.parse(localStorage.getItem('keyWords'));
	chrome.tabs.executeScript({
    code: 
'var config = ' + JSON.stringify(localArray)
  }, function() {
    chrome.tabs.executeScript(null, {file: 'custom.js'});
});
});
