// Hyeonjin Lee / 991352009
var stationList = newStation = [],
    rowID = 0,
    orientation = "portrait";

function Station(id, city, name, availDocks, totalDocks, latitude, longitude, statusValue, statusKey, availableBikes, stationImg) {
    this.id = id;
    this.city = city;
    this.name = name;
    this.availDocks = availDocks;
    this.totalDocks = totalDocks;
    this.latitude = latitude;
    this.longitude = longitude;
    this.statusValue = statusValue;
    this.statusKey = statusKey;
    this.availableBikes = availableBikes;
    this.stationImg = stationImg;
}

$(window).on("orientationchange",function(event){
	var activepage = $.mobile.activePage.attr('id');	
    if(event.orientation == "portrait")
    {
    	console.log("change to portrait");
    	orientation = "portrait";
    	if (activepage == "stationDetail") portrait();
    }
    else
    {
    	console.log("change to landscape");
    	orientation = "landscape";
    	if (activepage == "stationDetail") landscape();
    }
});


$(document).on("pagebeforeshow", "#homeP", function() {
    $.ajax({
        type: "GET",
        url: "projectXML09.xml",
        dataType: "xml",
        success: listStation
    });
});

function listStation (xml) {
	console.log("in home page");
    $.getJSON("groupMembers.json", function(data) {
		$("header>h1").html("JJ Site");
		$("footer").html("");
		
		$("footer").append("<nav data-role='navbar' class='ui-navbar' role='navigation' ><ul class='ui-grid-a'>" +
					"<li class='ui-block-a'><a href='#jinInfo' class='ui-btn ui-icon-"+ data.members.member[0].stupic +" ui-btn-icon-bottom' " +
					"data-rel='dialog' data-transition='pop'></a></li>" +
					"<li class='ui-block-b'><a href='#yoojuInfo' class='ui-btn ui-icon-"+data.members.member[1].stupic+" ui-btn-icon-bottom' " + 
					"data-rel='dialog' data-transition='pop'></a></li></ul></nav>");

	    var n = 0;
	    $('#overview').html("<section data-role='collapsible' data-collapsed-icon='arrow-r' data-expanded-icon = 'arrow-u'><h1> Overview </h1>" +
	    	"<p>This app provides the information of sharebike stations in toronto with the location with map and chart showing total docks, available docks and available bikes. </p>" +
	    	"</section>");
	    $('ul#stationList').html("");
	    $('div#popupStation > a').html("");
	    $(xml).find("stationBeanList").each(function() {
	    	str = $(this).find("stationName").text().toLowerCase();
			str = str.replace(/\s+/g, '');
			str = str.replace(/\//g, '');
			str = str.replace(/\(/g, '');
			str = str.replace(/\)/g, '');
			str = str.replace(/\./g, '');

	        $("ul#stationList").append("<li li-id='" + n + "'>" +
	            "<a href='#stationDetail' class='ui-btn ui-icon-" +
		                str + " ui-btn-icon-left'>" +
	            $(this).find("stationName").text() +
	            "</a></li>"
	        );

	        // build Station array
	        newStation = new Station($(this).find("id").text(),
	        	$(this).find("stationName").attr("city"),
	            $(this).find("stationName").text(),
	            $(this).find("availableDocks").text(), 
	            $(this).find("totalDocks").text(),
	            $(this).find("latitude").text(),
	            $(this).find("longitude").text(),
	            $(this).find("statusValue").text(),
	            $(this).find("statusKey").text(),
	            $(this).find("availableBikes").text(),
	            $(this).find("stationImg").text());

	        stationList.push(newStation);
	        n++;

	    });
	    $("ul#stationList").listview("refresh"); 
	    $("#overview").collapsibleset("refresh"); 
	});
}

$(document).on("pagebeforeshow", "#jinInfo", function() {
	console.log("in jin Detail");
	$.getJSON("groupMembers.json", function(data) {
		$("#jinDetail").html("");
		for (var i = 0; i < data.members.member.length; i++) {
			if (data.members.member[i].login == "leehyeo") {
				$("#jinDetail").append("<ul><li>" +
	            	"<b>Member Name : </b>" + data.members.member[i].name +
		            "</li><li><b>Student Number : </b>" + data.members.member[i].stunumber +
		            "</li><li><b>Login ID : </b>" + data.members.member[i].login +
		            "</li></ul>");		
			}
		}
	});
});

$(document).on("pagebeforeshow", "#yoojuInfo", function() {
	console.log("in yooju Detail");
	$.getJSON("groupMembers.json", function(data) {
		$("#jooDetail").html("");
		for (var i = 0; i < data.members.member.length; i++) {
			if (data.members.member[i].login == "choiyooj") {
				$("#jooDetail").append("<ul><li>" +
	            "<b>Member Name : </b>" + data.members.member[i].name +
	            "</li><li><b>Student Number : </b>" + data.members.member[i].stunumber +
	            "</li><li><b>Login ID : </b>" + data.members.member[i].login +
	            "</li></ul>"
	      		 );		
			}
		}
	});
});

$(document).on("pagebeforeshow", "#stationDetail", function() {
    $("#stationdh").html("");
    $("#stationdc").html("");
    $("#stationdh").append("<a href='#popupStation' data-rel='popup' data-position-to='window' data-transition='slide'>"+
    	            "<img class='popphoto' src='_images/"+ stationList[rowID].stationImg +"' alt='"+ stationList[rowID].stationName +"' style='width:30%'></a>"); 
    $("#popupStation > img").attr("src", '_images/'+ stationList[rowID].stationImg);
    if (orientation == "portrait")
		{
			console.log("in portrait");
	    	portrait();
		}
		else
		{
			console.log("in landscape");
	    	landscape();
	}
    $("#stationdc").collapsibleset("refresh"); 
    $("[data-role='popup']").popup();
    $("#popupStation").children('a').buttonMarkup(); 

});

function portrait() {
	$("#stationdc").html("");
	$("#stationdc").append("<section data-role='collapsible' data-collapsed-icon='arrow-r' data-expanded-icon = 'arrow-u'><h1> Station Info </h1><ul>" +
	    		"<li><b>Station ID : </b>" + stationList[rowID].id  + 
	    		"</li><li><b>Station City : </b>" + stationList[rowID].city  + 
	    		"</li><li><b>Station Name : </b>" + stationList[rowID].name  +
	    		"</li><li><b>Available Docks : </b>" + stationList[rowID].availDocks +
	    		"</li><li><b>Total Docks : </b>" + stationList[rowID].totalDocks +
	    		"</li><li><b>Status : </b>" + stationList[rowID].statusValue +
	    		"</li><li><b>Status Key : </b>" + stationList[rowID].statusKey +
	    		"</li><li><b>Available Bikes : </b>" + stationList[rowID].availableBikes +
	    	"</li></ul></section>");
    $("#stationdc").append("<a href='#mapinfo' class='ui-btn ui-btn-inline ui-icon-location ui-btn-icon-left ui-btn-corner-all'> Go Map </a><a href='#chartinfo' class='ui-btn ui-btn-inline ui-icon-location ui-btn-icon-left ui-btn-corner-all'> Go Chart </a>");
    $("#stationdc").collapsibleset("refresh"); 
}

function landscape() {
	$("#stationdc").html("");
	$("#stationdc").append("<section data-role='collapsible' data-collapsed-icon='arrow-r' data-expanded-icon = 'arrow-u'><h1> Station Info </h1><table>" +
			"<tr><th> Station Name : </th>" +
    			"<td colspan='3'>" + stationList[rowID].name  +"</td>" +
    		"</tr>" +
    		"<tr><th> Station ID : </th>" +
    			"<td>" + stationList[rowID].id +"</td>" +
    			"<th> Station City : </th>" +
    			"<td>" + stationList[rowID].city  +"</td>" +
    		"</tr>" +
    		"<tr><th> Available Docks : </th>" +
    			"<td>" + stationList[rowID].availDocks  +"</td>" +
    			"<th> Total Docks : </th>" +
    			"<td>" + stationList[rowID].totalDocks +"</td>" +
    		"</tr>" +
    		"<tr><th> Status :  </th>" +
    			"<td>" + stationList[rowID].statusValue +"</td>" +
    			"<th> Status Key  : </th>" +
    			"<td>" + stationList[rowID].statusKey +"</td>" +
    		"</tr>" +
    		"<tr><th> Available Bikes : </th>" +
    			"<td>" + stationList[rowID].availableBikes +"</td>" +
    		"</tr>" +
    	"</table></section>");
    $("#stationdc").append("<a href='#mapinfo' class='ui-btn ui-btn-inline ui-icon-location ui-btn-icon-left'> Go Map </a><a href='#chartinfo' class='ui-btn ui-btn-inline ui-icon-location ui-btn-icon-left'> Go Chart </a>");
  	$("#stationdc").collapsibleset("refresh");  
}

$(document).on("pageshow", "#mapinfo", function() {
	console.log("in map Detail");
	var memb = "";
	$.getJSON("groupMembers.json", function(data) {
	var mem = data.members.member;
	var mapCenter = null;
	$("#map_canvas").html("");
		

	display = new google.maps.DirectionsRenderer();

	mapCenter = new google.maps.LatLng(stationList[rowID].latitude, stationList[rowID].longitude);

	var Options = {
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: mapCenter
	};

	map = new google.maps.Map(document.getElementById("map_canvas"), Options);

	var makerimg = "_images/mapmarker.png";
	var marker = new google.maps.Marker({
		map : map,
		icon : makerimg,
		animation : google.maps.Animation.DROP,
		position : mapCenter
	});

	display.setMap(map);

	for (var i = 0; i < mem.length; i++) {
		memb += mem[i].login;
		memb += " ";
	}
	var info = new google.maps.InfoWindow({
		// put anything in this area
		content : "Station Name : " + stationList[rowID].name + "<br> City : " +
		stationList[rowID].city + "<br> loginID : " + memb  
	});

	google.maps.event.addListener(marker, "click", function () {
		info.open(map, marker);
	});

	marker.setTitle(stationList[rowID].name);
	});	
});

// Bar chart from XML file
$(document).on("pageshow", "#chartinfobar", function() {
	var charData = {   										// options for the line chart
		// labels
		labels : ["Total Docks", "Available Docks", "Available Bikes"],

		
		datasets : [
		// dataset / must use rgba colors
		{

			fillColor : "rgba(99, 126, 155, 1.0)",						
			strokeColor : "rgba(197, 57, 105, 1.0)",			
			data : [stationList[rowID].totalDocks,stationList[rowID].availDocks,stationList[rowID].availableBikes]
		}
		],

		//String - A legend template
		// legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	};

	var options = {
	    scales: {
	        xAxes: [{
	        	// categorySpacing: 0.5,
	            barValueSpacing: 0,
	            barDatasetSpacing: 0
	        }],
	        yAxes: [{
	            type: "linear",
	            display: true,
	            position: "left",
	            id: "y-axis-1",
	        }]
	    }
	};

	myBar = new Chart(document.getElementById("barCanvas").getContext('2d'),{
	    type: "bar",
	    options: options
	}).Bar(charData, {
		responsive: true
	});
	var legend = myBar.generateLegend();
	console.log(legend);
	document.getElementById("barlegend").innerHTML = legend;
});


// Doughnut Chart Reference - https://github.com/nnnick/Chart.js/issues/522
$(document).on("pageshow", "#chartinfo", function() {
	var charData = [
		
		{
			value: stationList[rowID].totalDocks,
			color:"#F7464A",
            highlight: "#FF5A5E",			
			label : "Total Docks"
		},
		{
			value: stationList[rowID].availDocks,
			color: "#46BFBD",
            highlight: "#5AD3D1",		
			label : "Available Docks",
		
		},
		{
			value: stationList[rowID].availableBikes,
		    color: "#FDB45C",
            highlight: "#FFC870",			
			label : "Available Bikes"
		
		}
	];


	var ctx = document.getElementById("barCanvas").getContext("2d");
 	window.myDoughnut = new Chart(ctx).Doughnut(charData, {
    	// responsive : true,
    	animationEasing: "easeOutQuart",
    	tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
    	segmentStrokeColor : "#f9f9f9",
    	legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><div class=\"comm-how\"><%=segments[i].value%></div><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
 	});

    var helpers = Chart.helpers;
    var legendHolder = document.getElementById('barlegend');
      legendHolder.innerHTML = myDoughnut.generateLegend();
      // Include a html legend template after the module doughnut itself
      helpers.each(legendHolder.firstChild.childNodes, function(legendNode, index){
          helpers.addEvent(legendNode, 'mouseover', function(){
              var activeSegment = myDoughnut.segments[index];
              activeSegment.save();
              activeSegment.fillColor = activeSegment.highlightColor;
              myDoughnut.showTooltip([activeSegment]);
              activeSegment.restore();
          });
      });
      helpers.addEvent(legendHolder.firstChild, 'mouseout', function(){
          myDoughnut.draw();
      });
      myDoughnut.generateLegend();
      document.getElementById('barlegend').innerHTML = myDoughnut.generateLegend();
      
});


$(document).on("click", "#stationList>li", function() {
	console.log("in ID");
    rowID = $(this).closest("li").attr("li-id");
});