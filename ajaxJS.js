function loadXMLdata(){
    /// Create AJAX object
    var xmlhttp = new XMLHttpRequest();
    /// to convert to XML type
    ///xmlhttp.overrideMineType('application/xml');
    xmlhttp.open("GET", "ajax_info.txt", true);
    xmlhttp.send();
    console.log("executed");

    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            console.log("response get");
            document.getElementById("myDiv").innerHTML = xmlhttp.responceText;
        }
    }

}


function loadWeatherData(){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Helsinki&units=metric&mode=JSON&APPID=ff64c247a136f706923d1ee0d55d71e2", true);
    xmlhttp.send();

    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var jsonDoc = xmlhttp.responseText;
            document.getElementById("myDiv").innerHTML = jsonDoc;
        }
    }

}
