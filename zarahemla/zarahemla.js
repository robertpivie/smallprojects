/*controls*/
var zoom = 100;
var rightButton = $("#right-button");
var leftButton = $("#left-button");
var upButton = $("#up-button");
var downButton = $("#down-button");

$(document).keydown(handleKey);
function simulateKeyPress(character) {
    var e = $.Event("keydown");
	e.keyCode = character.charCodeAt(0);
    handleKey(e);
}

function handleKey(e) {
	
	if (!isOut) {
		return;
	}
	
    switch (e.keyCode) {
		case 65:
        case 37:
			// left arrow
			goLeft("player", 1);
			if (!isOut("player")) {
				goRight("player", 3);
			}
            break;
		case 87:
        case 38:
			// up arrow
			goUp("player", 1);
			if (!isOut("player")) {
				goDown("player", 3);
			}
            break;
		case 68:
        case 39:
			// right arrow
			goRight("player", 1);
			if (!isOut("player")) {
				goLeft("player", 3);
			}
            break;
		case 83:
        case 40:
			// down arrow
			goDown("player", 1);
			if (!isOut("player")) {
				goUp("player", 3);
			}
            break;
		case 43:
            zoom += 2;
            document.body.style.zoom = zoom+"%";
			break;
		case 45:
            zoom -= 2;
            document.body.style.zoom = zoom+"%";
			break;
    }
};

function isOut(id) {
	var playerElement = document.getElementById(id);
	var playerId = playerElement.id;
	var player = $(playerElement);
	var playerOffset = player.offset();
	var playerLeft = playerOffset.left;
	var playerTop = playerOffset.top;
	var playerHeight = player.outerHeight();
	var playerWidth = player.outerWidth();
	var playerRight = playerLeft + playerWidth;
	var playerBottom = playerTop + playerHeight;
		
	var isLeft = true;
	var isRight = true;
	var isAbove = true;
	var isBelow = true;
	var isOutX = true;
	var isOutY = false;
	
	var elements = $("#map").find("div");
	for(var i = 0; i < elements.length; i++) {
		var proximity = 2;
		var element = elements[i];
		var id = element.id;
		
		var isSame = playerId === id;
		if (isSame) {
			continue;
		}
		
		var isGone = ( (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" gone ") > -1 );
		if (isGone) {
			continue;
		}
		
		var isLow = ( (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" ht1 ") > -1 );
		if (isLow) {
			continue;
		}
		
		var jqEl = $(element);
		var elOffset = jqEl.offset();
		var elLeft = elOffset.left;
		var elTop = elOffset.top;
		var elHeight = jqEl.outerHeight();
		var elWidth = jqEl.outerWidth();
		var elRight = elLeft + elWidth;
		var elBottom = elTop + elHeight;
		
		isLeft = playerRight < elLeft;
		isRight = playerLeft > elRight;
		isAbove = playerTop > elBottom;
		isBelow = playerBottom < elTop;
		isOutX = isLeft || isRight;
		isOutY = isAbove || isBelow;
			
		if (isOutX || isOutY) {
			continue;
		}
		
		startAct(id);
		return false;
	}
	
	return true;
}

//button animation
$(".button").mousedown(function() {
	var button = $(this);
	button.addClass("pressed");
}).bind("mouseout mouseup touchend", function() {
	$(this).removeClass("pressed");
});

//handle repeating events
var goRightInterval;
var goLeftInterval;
var goDownInterval;
var goUpInterval;
var goInInterval;
var goOutInterval;
$("body").bind("mouseout mouseup touchend", function() {
	clearInterval(goRightInterval);
	clearInterval(goLeftInterval);
	clearInterval(goDownInterval);
	clearInterval(goUpInterval);
	clearInterval(goInInterval);
	clearInterval(goOutInterval);
});

var time = 25;

//right
function goRightPlayer1() {
	simulateKeyPress("D");
}
rightButton.mousedown(function() {
	goRightInterval = setInterval(goRightPlayer1, time);
});
function goRight(id, playerPace) {
	var playerElement = document.getElementById(id);
	var player = $(playerElement);
	var playerOffset = player.offset();
	var playerLeft = playerOffset.left;
	var newLeft = playerLeft+playerPace;
	player.removeClass("left");
	player.removeClass("down");
	player.removeClass("up");
	player.addClass("right");
	player.offset({ left: newLeft });
}

//left
function goLeftPlayer1() {
	simulateKeyPress("A");
}
leftButton.mousedown(function() {
	goLeftInterval = setInterval(goLeftPlayer1, time);
});
function goLeft(id, playerPace) {
	var playerElement = document.getElementById(id);
	var player = $(playerElement);
	var playerOffset = player.offset();
	var playerLeft = playerOffset.left;
	var newLeft = playerLeft-playerPace;
	player.removeClass("right");
	player.removeClass("down");
	player.removeClass("up");
	player.addClass("left");
	player.offset({ left: newLeft });
}

//down
function goDownPlayer1() {
	simulateKeyPress("S");
}
downButton.mousedown(function() {
	goDownInterval = setInterval(goDownPlayer1, time);
});
function goDown(id, playerPace) {
	var playerElement = document.getElementById(id);
	var player = $(playerElement);
	var playerOffset = player.offset();
	var playerTop = playerOffset.top;
	var newTop = playerTop+playerPace;
	player.removeClass("right");
	player.removeClass("left");
	player.removeClass("up");
	player.addClass("down");
	player.offset({ top: newTop });
}

//up
function goUpPlayer1() {
	simulateKeyPress("W");
}
upButton.mousedown(function() {
	goUpInterval = setInterval(goUpPlayer1, time);
});
function goUp(id, playerPace) {
	var playerElement = document.getElementById(id);
	var player = $(playerElement);
	var playerOffset = player.offset();
	var playerTop = playerOffset.top;
	var newTop = playerTop-playerPace;
	player.removeClass("right");
	player.removeClass("left");
	player.removeClass("down");
	player.addClass("up");
	player.offset({ top: newTop });
}

//in
function goIn() {
	simulateKeyPress("+");
}
$("#in-button").mousedown(function() {
	goInInterval = setInterval(goIn, time);
});

//out
function goOut() {
	simulateKeyPress("-");
}
$("#out-button").mousedown(function() {
	goOutInterval = setInterval(goOut, time);
});