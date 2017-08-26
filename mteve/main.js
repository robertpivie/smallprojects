
$(function() {

    //variables
	var systems = [];
	var categories = [];
	var groups = [];
	var items = [];
	var categoryId = null;
	var categoryName = null;
	var groupId = null;
	var groupName = null;
	var itemId = null;
	var itemName = null;
	var supplyData = [];
	var demandData = [];
	var regionLimit = "";
	
	//draw tables by default
    $("#marginTable").DataTable().draw();
    $("#sellOrderTable").DataTable().draw();
    $("#buyOrderTable").DataTable().draw();
	
	//
	//REGION
	//
	
	$.ajax({
		url: "json/regions.json",
		success: function(json) {
			//abort if bad json
			if (typeof json == "undefined") return;
			
			setupRegionTextInput(json);
		}
	});
	
	function setupRegionTextInput(json) {
	    
	    //reset value
	    $("#regionTextInput").val("");

		//autocomplete
		$("#regionTextInput").autocomplete({
			source: json,
			minLength: 0,
			select: function (event, ui) {
				regionLimit = "&regionlimit=" + ui.item.value;
			
				//stop default load of value
				event.preventDefault();
				
				//write the value to the field
				$("#regionTextInput").val(ui.item.label);
			},
			open: function() {
			    $(".ui-menu").width($("#regionTextInput").width());
			}
		});
	}
	
	$("#regionTextInput").click(function() {
        $("#regionTextInput").autocomplete("search","");
    });
    
    //
    //ITEMS
    //
	
	$.ajax({
		url: "json/typeIDs.json",
		success: function(json) {
			//abort if bad json
			if (typeof json == "undefined") return;
			
			items = json;
			setupItemTextInput(json);
		}
	});
	
	function setupItemTextInput(json) {
	    
	    //reset value
	    $("#itemTextInput").val("");

		//autocomplete
		$("#itemTextInput").autocomplete({
			source: json,
			minLength: 2,
			select: function (event, ui) {
				itemId = ui.item.value;
				itemName = ui.item.label;
			
				//stop default load of value
				event.preventDefault();
				
				//get an item
				getItemInfo();
				
				//write the value to the field
				$("#itemTextInput").val(ui.item.label);
				
				//open orders window
				$("#searchHeading").click();
				if (!$("#ordersBody").hasClass("in")) $("#ordersHeading").click();
                $("#ordersTab").click();
			},
			open: function() {
			    $(".ui-menu").width($("#itemTextInput").width());
			}
		});
	}
	
	$("#itemTextInput").click(function() {
        $("#itemTextInput").autocomplete("search","");
    });
    
    //
    //GROUPS
    //
	
	$.ajax({
		url: "json/groupIDs.json",
		success: function(json) {
			//abort if bad json
			if (typeof json == "undefined") return;
			
			groups = json;
			setupGroupTextInput(json);
		}
	});
	
	function setupGroupTextInput(json) {
	    
	    //reset value
	    $("#groupTextInput").val("");

		//autocomplete
		$("#groupTextInput").autocomplete({
			source: json,
			minLength: 0,
			select: function (event, ui) {
				groupId = ui.item.value;
				groupName = ui.item.label;
			
				//stop default load of value
				event.preventDefault(); 
				
				//filter the items
				var newItems = [];
				$.each(items, function() {
				    if(this["groupID"] == groupId) newItems.push(this);
				});
				
				//get margin data
				buildMargins(newItems);
				
				//write the value to the field
				$("#groupTextInput").val(ui.item.label);
				
				//open margins window
				$("#searchHeading").click();
				if (!$("#marginsBody").hasClass("in")) $("#marginsHeading").click();
                $("#marginsTab").click();
			},
			open: function() {
			    $(".ui-menu").width($("#groupTextInput").width());
			}
		});
	}
	
	$("#groupTextInput").click(function() {
        $("#groupTextInput").autocomplete("search","");
    });
	
	//
	//CATEGORIES
	//
	
	$.ajax({
		url: "json/categoryIDs.json",
		success: function(json) {
			//abort if bad json
			if (typeof json == "undefined") return;
			
			categories = json;
			setupCategoryTextInput(json);
		}
	});
	
	function setupCategoryTextInput(json) {
	    
	    //reset value
	    $("#categoryTextInput").val("");

		//autocomplete
		$("#categoryTextInput").autocomplete({
			source: json,
			minLength: 0,
			select: function (event, ui) {
				categoryId = ui.item.value;
				categoryName = ui.item.label;
			
				//stop default load of value
				event.preventDefault();
				
				//filter the groups
				var newGroups = [];
				var newItems = [];
				$.each(groups, function() {
				    if(this["categoryID"] == categoryId) {
				        newGroups.push(this);
				
				        //filter the items
				        var groupId = this["value"];
				        $.each(items, function() {
        				    if(this["groupID"] == groupId) {
        				        newItems.push(this);
        				    }
        				});
				    }
				});
				
				//update groups text input
				setupGroupTextInput(newGroups);
				
				//write the value to the field
				$("#categoryTextInput").val(ui.item.label);
			},
			open: function() {
			    $(".ui-menu").width($("#categoryTextInput").width());
			}
		});
	}
	
	$("#categoryTextInput").click(function() {
        $("#categoryTextInput").autocomplete("search","");
    });
	
	//
	//SYSTEMS
	//
	
	$.ajax({
		url: "json/systems.json",
		success: function(json) {
			//abort if bad json
			if (typeof json == "undefined") return;
			
			systems = json;
			setupSystemTextInput(json);
		}
	});
	
	function setupSystemTextInput(json) {
	    
	    //reset value
	    $("#originTextInput").val("");
	    $("#destinationTextInput").val("");

		//autocomplete
		$("#originTextInput").autocomplete({
			source: json,
			minLength: 0,
			open: function() {
			    $(".ui-menu").width($("#originTextInput").width());
			},
			select: function (event, ui) {
			
				//stop default load of value
				event.preventDefault();
				
				//write the value to the field
				$("#originTextInput").val(ui.item.label);
			}
		});

		//autocomplete
		$("#destinationTextInput").autocomplete({
			source: json,
			minLength: 0,
			open: function() {
			    $(".ui-menu").width($("#destinationTextInput").width());
			},
			select: function (event, ui) {
			
				//stop default load of value
				event.preventDefault();
				
				//write the value to the field
				$("#destinationTextInput").val(ui.item.label);
			}
		});
	}
	
	$("#originTextInput").click(function() {
        $("#originTextInput").autocomplete("search","");
    });
	
	$("#destinationTextInput").click(function() {
        $("#destinationTextInput").autocomplete("search","");
    });
	
	//
	//ORDERS
	//
	
	$('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
		$.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
	} );

	function getItemInfo() {
		
		var id = itemId;
		var name = itemName;
		
		$.ajax({
			url: "http://api.eve-central.com/api/quicklook?typeid="+id+regionLimit,
			success: function(xml) {
			    
				//abort if bad xml
				if (typeof xml == "undefined") return;
				
				//destroy tables
				$("#sellOrderTable").DataTable().destroy();
				$("#buyOrderTable").DataTable().destroy();
				
				//build tables
				setSellOrders($(xml));
				setBuyOrders($(xml));
			},
			error: function(data) {
			    
				console.log("(._. )");
			}
		});
	}

	function setSellOrders(xml) {
		//abort if xml was poorly formatted
		if (typeof xml == "undefined") return;
		
		var sellOrders = xml.find("sell_orders");
		
		//abort if no sell orders
		if (typeof sellOrders == "undefined") return;
		
		buildOrdersTable(false, sellOrders);
	}

	function setBuyOrders(xml) {
		//abort if xml was poorly formatted
		if (typeof xml == "undefined") return;
		
		var buyOrders = xml.find("buy_orders");
		
		//abort if no sell orders
		if (typeof buyOrders == "undefined") return;
		
		buildOrdersTable(true, buyOrders);
	}

	//constructing tables
	function buildOrdersTable(isBuy, orders) {
	    
	    //ready table data
		var orderData = [];
		
		//ready chart data
		var chartData = [];

		for (var i=0; i<orders.find("order").length; i++) {
				
			//update progress bar
			$("#itemProgress").css("width", (((i+1)/orders.find("order").length)*100) + "%");
		    
		    //build table row
			orderData.push([
				$($(orders.find("order")[i]).find("station_name")).text(), 
				$($(orders.find("order")[i]).find("security")).text(), 
				$($(orders.find("order")[i]).find("range")).text(), 
				parseFloat($($(orders.find("order")[i]).find("price")).text()).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'), 
				$($(orders.find("order")[i]).find("vol_remain")).text(), 
				$($(orders.find("order")[i]).find("min_volume")).text()]);
			
			//build chart row
			chartData.push([
			    parseFloat($($(orders.find("order")[i]).find("price")).text()),
			    parseFloat($($(orders.find("order")[i]).find("vol_remain")).text())]);
		}
	 
	    //build table
	    var table = (isBuy) ? $("#buyOrderTable") : $("#sellOrderTable");
		table.DataTable({
			data: orderData
		});
		
		//sort data
		chartData.sort(function(a, b) {
            return parseFloat(a[0]) - parseFloat(b[0]);
        });
		
		//bucket chart data
		var buckettedData = [["Price", "Volume"]];
		var topPrice = parseFloat(chartData[chartData.length-1]);
		var tenth = parseFloat(topPrice/10);
		for (var buckettedPrice=tenth; buckettedPrice<=topPrice; buckettedPrice+=tenth) {
		    
		    //build the bucketted volume
		    var buckettedVolume = 0;
		    for (var j=0; j<chartData.length; j++) {
		        var row = chartData[j];
		        
		        //augment volume
		        var price = parseFloat(row[0]);
		        if (price<=buckettedPrice && price>(buckettedPrice-tenth)) {
		            buckettedVolume += row[1];
		        }
		    }
		    
		    //add row to the table
		    buckettedData.push([buckettedPrice, buckettedVolume]);
		}
		
		//build chart
		if (isBuy) {
	        demandData = buckettedData;
	        drawDemandChart();
		} else {
	        supplyData = buckettedData;
	        drawSupplyChart();
		}
	
	}
	
	//
	//MARGINS
	//
	
	var marginData = [];
	var percentDone = 0;
	
	//get information for all items
	function buildMargins(itemJSON) {
				
		//update progress bar
		percentDone = (1/itemJSON.length)*100;
		$("#marginProgress").css("width", percentDone + "%");
	    
	    //clear margin data
	    marginData = [];
		$("#marginTable").DataTable().clear();
		$("#marginTable").DataTable().draw();
	    
        //get data
        for(var i=0; i<itemJSON.length; i++) {
            getItemInfoByItem(itemJSON[i], itemJSON.length);
        }
	}
	
	//get infor specific to an item
	function getItemInfoByItem(item, length) {
		$.ajax({
			url: "http://api.eve-central.com/api/quicklook?typeid="+item["value"]+regionLimit,
			success: function(xml) {
				
    			//update progress bar
    			percentDone += (1/length)*100;
    			$("#marginProgress").css("width", percentDone + "%");
    			
				//abort if bad xml
				if (typeof xml == "undefined") return;
				
				xml = $(xml);
				
				//build next row
				var row = buildMarginTableRow(xml, item);
				
				//abort if bad row
				if (row == null) return;
				
				//add row to variable
				marginData.push(row);
		
        		//destroy table
        		$("#marginTable").DataTable().destroy();
        	 
        		//rebuild table
        		$("#marginTable").DataTable({
        			data: marginData
        		});
                
			},
			error: function(data) {
				console.log("(._. )");
				
    			//update progress bar
    			percentDone += (1/length)*100;
    			$("#marginProgress").css("width", percentDone + "%");
			}
		});
	}
	
	//construct table body
	function buildMarginTableRow(xml, item) {
			
		//abort if xml was poorly formatted
		if (typeof xml == "undefined") return;
		
		//buy orders
		var bestBuy = getBest(xml, true);
		
		//sell orders
		var bestSell = getBest(xml, false);
		
		if(bestBuy["price"] == 0 
			|| bestBuy["volume"] == 0
			|| bestSell["price"] == 0 
			|| bestSell["volume"] == 0) {
				
			//abort if any best was not found
			return null;
		}
		
		return [
			item["label"],
			parseFloat(bestBuy["price"] - bestSell["price"]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
			parseFloat(bestSell["price"]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
			bestSell["volume"],
			bestSell["security"],
			parseFloat(bestBuy["price"]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
			bestBuy["volume"],
			bestBuy["security"]
		];
	}
		
	//get the best price and volume
	function getBest(xml, isBuy) {
	
		var type = (isBuy) ? "buy_orders" : "sell_orders";
		var price = 0, volume = 0, security = 0;
		
		//abort if no buy orders
		if (typeof xml.find(type) == "undefined" || xml.find(type).length == 0) return {"price": -1, "volume": -1, "security": -1};
		
		//find best buy price and volume
		for (var i=0; i<xml.find(type).find("order").length; i++) {
			
			//find best price
			if(i==0
				|| (isBuy && price<parseInt($($(xml.find(type).find("order")[i]).find("price")).text()))
				|| (!isBuy && price>parseInt($($(xml.find(type).find("order")[i]).find("price")).text()))) {
			
				//update price and volume
				price = parseInt($($(xml.find(type).find("order")[i]).find("price")).text());
				volume = parseInt($($(xml.find(type).find("order")[i]).find("vol_remain")).text());
				security = parseFloat($($(xml.find(type).find("order")[i]).find("security")).text());
			}
		}
		
		return {"price": price, "volume": volume, "security": security};
	}

	//
	//SUPPLY AND DEMAND CHART
	//
	
	google.charts.load("current", {"packages":["corechart"]});
	
	google.charts.setOnLoadCallback(drawSupplyChart);
	function drawSupplyChart() {
	    
	    if(supplyData.length < 1) return;
        
        var data = new google.visualization.arrayToDataTable(supplyData);
        
        var options = {
            title: "Supply",
            vAxis: {title: "Volume", scaleType: "log"},
            colors: ["#555"],
            chartArea: {width:'50%'},
            trendlines: {
                0: {
                    type: 'linear',
                    showR2: true,
                    visibleInLegend: true
                }
            }
        };
        
        var chart = new google.visualization.ScatterChart(document.getElementById('supplyChart'));
        chart.draw(data, options);
	}
	
	google.charts.setOnLoadCallback(drawDemandChart);
	function drawDemandChart() {
	    
	    if(demandData.length < 1) return;
        
        var data = new google.visualization.arrayToDataTable(demandData);
        
        var options = {
            title: "Demand",
            vAxis: {title: "Volume", scaleType: "log"},
            colors: ["#555"],
            chartArea: {width:'50%'},
            trendlines: {
                0: {
                    type: 'linear',
                    showR2: true,
                    visibleInLegend: true
                }
            }
        };
        
        var chart = new google.visualization.ScatterChart(document.getElementById('demandChart'));
        chart.draw(data, options);
	}
	
	$(window).resize(function() {
	    
	    //resize sticky charts
	    if ($("#charts").hasClass("sticky")) {
            $("#charts").width($("#charts").parent().width());
        }
        
	    //redraw charts
	    drawSupplyChart();
	    drawDemandChart();
    });
    
    $(window).scroll(function() {
        if ($(window).scrollTop() > $("#charts").parent().offset().top
                && !$("#charts").hasClass("sticky")) {
            $("#charts").addClass("sticky");
        }
        
        if ($(window).scrollTop() <= $("#charts").parent().offset().top
                && $("#charts").hasClass("sticky")) {
            $("#charts").removeClass("sticky");
        }
    });

	//
	//COMMON
	//
	
	$(document).ajaxStart(function() {
	    $("#overlay").fadeIn("fast");
	});
	
	$(document).ajaxStop(function() {
	    $("#overlay").fadeOut("fast");
	});
	
});
	
function clearCalculatorInputs() {

    //reset values
    $("#originTextInput").val("");
    $("#destinationTextInput").val("");
}
	
function clearSearchInputs() {

    //reset values
    $("#regionTextInput").val("");
    $("#groupTextInput").val("");
    $("#categoryTextInput").val("");
    $("#itemTextInput").val("");
    
    //reset variables
    regionLimit = "";
}

//distance
function getDistance() {
    var origin = $("#originTextInput").val();
    var destination = $("#destinationTextInput").val();
    
    //abort
    if((typeof origin == "undefined" || typeof destination == "undefined") || (origin == "" || destination == "")) return;
    
    //get route
    $.ajax({
        url: "http://api.eve-central.com/api/route/from/"+origin+"/to/"+destination,
        success: function(json) {
            //get distance
            var distance = json.length;
            $("#distance").text(distance+" jumps");
            
            //clear route
            $("#route").text("");
            
            //build route
            for (var i=0; i<json.length; i++) {
                var system = json[i]["to"];
                $("#route").append("<div><span class=\"badge\">" + system["security"] + "</span> " + system["name"] + "</div>");
            }
        }
    });
}