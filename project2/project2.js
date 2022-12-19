function printJSONStationTable(jsonObj, city) {
    // JSON data is stored in data variable
    var data = jsonObj;
    // city code is stored in station variable
    var station = city;
    console.log (data);//for testing
    console.log (station);//for testing
    
    // All the data of Arrival trains will be collected to outArrival -variable
    // and the data of Departure trains will be collected to outDeparture -variable
    
    var outArrival = "<table class='table table-dark table-sm'>";
    ///creating headings for the table Arrivals
    outArrival += '<tr>';
    outArrival += '<th>' + 'Train number' + '</th>';
    outArrival += '<th>' + 'From - To' + '</th>';
    outArrival += '<th>' + 'Date' + '</th>';
    outArrival += '<th>' + 'Scheduled time' + '</th>';
    outArrival += '<th>' + 'Status' + '</th>';
    //outArrival += '<th>' + 'Type' + '</th>';
    outArrival += '</tr>';

    var outDeparture = "<table class='table table-dark table-sm'>";
    ///creating headings for the table Departure
    outDeparture += '<tr>';
    outDeparture += '<th>' + 'Train number' + '</th>';
    outDeparture += '<th>' + 'From - To' + '</th>';
    outDeparture += '<th>' + 'Date' + '</th>';
    outDeparture += '<th>' + 'Scheduled time' + '</th>';
    outDeparture += '<th>' + 'Status' + '</th>';
    //outDeparture += '<th>' + 'Type' + '</th>';
    outDeparture += '</tr>';

    /// Create a loop, which will run through the JSON data array. 
    for (var i=0; i < data.length; i++){
        outArrival += '<tr>';
        outDeparture += '<tr>';

        // For each cell, we will output data fields from JSON
        

        // Create a loop wich will run throug all stations and finds the data with the timetable data for selected station
        let stationCode = "";
        for (let y=0; y < data[i].timeTableRows.length; y++){
            stationCode = data[i].timeTableRows[y].stationShortCode;
            console.log(stationCode);
            let type = data[i].timeTableRows[y].type;
            let trainNumber = data[i].trainNumber;
            let from = data[i].timeTableRows[0].stationShortCode;
            let to = data[i].timeTableRows[data[i].timeTableRows.length - 1].stationShortCode;

            let scheduledTime = data[i].timeTableRows[y].scheduledTime;
            ///to split the date and time from the string
            let scheduledTimeDate = scheduledTime.substr(0,10);
            let scheduledTimeTime = scheduledTime.substr(11,5);
            
            let actualTime = data[i].timeTableRows[y].actualTime;
           

            //the data with the selected station & type ARRIVAL - output selected data to Arrival table
            //the data with the selected station & type DEPARTURE - output selected data to Departure table
            if (stationCode == station && type == "ARRIVAL") {
                outArrival += '<td>' + trainNumber + '</td>'
                console.log(data[i].trainNumber);//for testing
                outArrival += '<td>' + from + " - " + to + '</td>';
                //outArrival += '<td>' + departureDate + '</td>';
                outArrival += '<td>' + scheduledTimeDate + '</td>';
                outArrival += '<td>' + scheduledTimeTime + '</td>';
                if (typeof actualTime !== 'undefined' && actualTime !== null){
                    outArrival += '<td class="ready">' + 'Arrived' + '</td>';
                }else{
                    outArrival += '<td>' + 'Arriving' + '</td>';
                }
                ///outArrival += '<td>' + actualTime + '</td>';
                ///outArrival += '<td>' + type + '</td>';

            }else if (stationCode == station && type == "DEPARTURE") {
                outDeparture += '<td>' + trainNumber + '</td>'
                console.log(data[i].trainNumber);//for testing
                outDeparture += '<td>' + from + " - " + to + '</td>';
                //outDeparture += '<td>' + departureDate + '</td>';
                outDeparture += '<td>' + scheduledTimeDate + '</td>';
                outDeparture += '<td>' + scheduledTimeTime + '</td>';
                if (typeof actualTime !== 'undefined' && actualTime !== null){
                    outDeparture += '<td class="ready">' + 'Departured' + '</td>';
                }else{
                    outDeparture += '<td>' + 'Departuring' + '</td>';
                }
                ///outDeparture += '<td>' + actualTime + '</td>';
                ///outDeparture += '<td>' + type + '</td>';

            }

        }

        outArrival += '</tr>';
        outDeparture += '</tr>';
    }
    // After all the data has been set, we will output closing tag for the table
    outArrival+="</table>";
    outDeparture+="</table>";

    // Place the newly created table in tabledata-div
    document.getElementById("stationDataArrival").innerHTML = '<h2>Arrivals - ' + station + '</h2>' + '<br>' + outArrival;
    document.getElementById("stationDataDeparture").innerHTML = '<h2>Departures - ' + station + '</h2>' + '<br>' + outDeparture;
}

function stationSelect(){
    
    ///Liikennepaikan saapuvat ja lähtevät junat (lukumäärärajoitus) url: https://rata.digitraffic.fi/api/v1/live-trains/station/HKI?arrived_trains=5&arriving_trains=5&departed_trains=5&departing_trains=5&include_nonstopping=false&train_categories=Commuter
    ///Stations names and codes metadata url: https://rata.digitraffic.fi/api/v1/metadata/stations
    
    /// Read selected value, if nothing chosen don't do search, if choice made than fetch the data from url and pass it to next function for printing the table
    var selection = document.getElementById("city");
    var city = selection.options[selection.selectedIndex].value;
    if (city !== "none"){
        var url = "https://rata.digitraffic.fi/api/v1/live-trains/station/"+city+"?arrived_trains=5&arriving_trains=5&departed_trains=5&departing_trains=5&include_nonstopping=false";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //	document.getElementById("content").innerHTML = xmlhttp.responseText;
                jsonObj = JSON.parse(xmlhttp.responseText);
                console.log(jsonObj);//for testing
                // Call for a function which will parse the data to a table
                printJSONStationTable(jsonObj, city);
            }
        }
    }
}

function stationSearch(){
    /// Read input value,  transform to upper case and remove whitespace from both ends
    var selection = document.getElementById("citysearch");
    var city = selection.value;
    city = city.toUpperCase();
    city = city.trim();
    console.log (city);


    ///check if the value is empty or not correct station code
    if ((city == null || city=="") || (city !== "ROI" && city !== "KLI" && city !== "KEM" && city !== "KJÄ") ) {
        var field =document.getElementById("citysearch");
        field.style.borderColor = "red";
        field.select();
        field.focus();
        alert("Please write the name of item! It should be more than 2 characters");

    }else{

    
        var url = "https://rata.digitraffic.fi/api/v1/live-trains/station/"+city+"?arrived_trains=5&arriving_trains=5&departed_trains=5&departing_trains=5&include_nonstopping=false";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //	document.getElementById("content").innerHTML = xmlhttp.responseText;
                jsonObj = JSON.parse(xmlhttp.responseText);
                console.log(jsonObj);//for testing
                // Call for a function which will parse the data to a table
                printJSONStationTable(jsonObj, city);
            }
        }
    }
}