var myVid=document.getElementById("video1");
 
function setMediaFile() {
   var file = document.getElementById('file').files[0];
   if(!file){
   	alert("Please upload file.");
   	return false;
   }
   var url = (window.URL) ? window.URL.createObjectURL(file) : window.webkitURL.createObjectURL(file);
   document.getElementById("video1").src = url;
}

myVid.addEventListener("timeupdate",timeupdate);
	function timeupdate(){
		//do something...
	}
