$(document).ready(function () {
// This is the array we will store keywords to localStorage in

localArray = [];
// Creates an area in localStorage
if (!localStorage.keyWords) {
localStorage.setItem('keyWords', JSON.stringify(localArray));
}
// calls the keywords to the view
loadKeyWords();

// Generate random id for id of keywords
function guidGenerator() {
var S4 = function() {
return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};
return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

// This function populates the keywords to the view
function loadKeyWords() {
$('#keyWords').html('');
localArray = JSON.parse(localStorage.getItem('keyWords'));
if (localArray.length === 0) {
$('#alert').html("<strong>Nothing to hide!</strong> Add some keywords that you hate!");
$('#alert').fadeIn().delay(1000).fadeOut(5000);
return false;
} else {
//send data
for(var i = 0; i < localArray.length; i++) {
var x = guidGenerator();
$('#keyWords').prepend('<li class="list-group-item" data-style="button"><input id="'+ x +'" class="check" name="check" type="checkbox"><label for="'+ x +'">'+localArray[i]+'</label></li>'); 
$( "div:contains("+localArray[i]+")" ).css( "display", "none" );
$( "section:contains("+localArray[i]+")" ).css( "display", "none" );
$('#nav-1').fadeIn(550);
}
return localArray;
}
}

// This function adds keywords to the localStorage then updates them to the view
$('#add').click( function() {
var Description = $('#description').val();
if($("#description").val() === '') {
$('#alert').html("<strong>Warning!</strong> You left the to-do empty");
$('#alert').fadeIn().delay(1000).fadeOut();
return false;
}
$('#form')[0].reset();
var keyWords = $('#keyWords').html();
localArray.push(Description);
localStorage.setItem('keyWords', JSON.stringify(localArray));
var getKeywords = loadKeyWords();
chrome.tabs.executeScript(null, {
code: 'var config = ' + JSON.stringify(getKeywords)
}, function() {
chrome.tabs.executeScript(null, {file: 'custom.js'});
});
loadKeyWords();
return false;
});

// Allows the user to clear all the keywords from localStorage
$('#clear').click( function() {
window.localStorage.clear();
chrome.tabs.executeScript({code: 'window.location.reload();'});
loadKeyWords();
return false;
});


// Allows user to remove keywords from the locaStorage
$('#clearChecked').click(function() {
currentArray = [];

if($('.check:checked').length == $('.check').length){
window.localStorage.clear();
chrome.tabs.executeScript({code: 'window.location.reload();'});
}
$('.check').each(function() {
var $curr = $(this);
if (!$curr.is(':checked')) {
var value = $curr.parent().text();
currentArray.push(value);
localStorage.setItem('keyWords', JSON.stringify(currentArray));
loadKeyWords();
} else {
$curr.parent().remove();
localStorage.removeItem($curr);
chrome.tabs.executeScript({code: 'window.location.reload();'});
}
});
});

// Switch between views Form and About. Fade in fade out.
$('.sidenav a').click(function(){
$('.infozone').fadeOut(550);
var region = $(this).attr('data-region');    
$('#' + region).fadeIn(550);
});

//On page load show From view
$(document).ready(function(){
$('#nav-2').fadeOut(550);
$('#nav-1').fadeIn(550);
});

//Navigation on click listener
$(document).ready(function(){
$('#facebook').on('click', function(){
chrome.tabs.create({url: $(this).attr('href')});
return false;
});
$('#wuno').on('click', function(){
chrome.tabs.create({url: $(this).attr('href')});
return false;
});
$('#zen').on('click', function(){
chrome.tabs.create({url: $(this).attr('href')});
return false;
});
});

}); // End of document ready function
