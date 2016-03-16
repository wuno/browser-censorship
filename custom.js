//this script is to remove the data from the current page
if(config==''){
	//add config some value to avoid null value search in div
config="thisisnullvaluetoavoidspacesearchingindiv";
}
var divs = document.getElementsByTagName('div');
var searchValue=config.toString().split(',');
var div;
var j = searchValue.length;
while(j--){
var i = divs.length;
while (i--) {
  div = divs[i];

		if(div.innerHTML.indexOf(searchValue[j]) > -1){
			
			div.parentNode.removeChild(div);

		  }
	}
}
