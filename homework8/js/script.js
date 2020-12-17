/*
  Assignment: Drag and Drop Scrabble
  Rebecca S. Silva Alves, UMass Lowell Computer Science, ralves1@cs.uml.edu Copyright (c) 2020 by Rebecca S. Silva Alves. All rights reserved.
  May be freely copied or excerpted for educational purposes with credit to the author.
*/
//array for scrabble tiles from graphics_data folder

var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

//ScrabbleTiles global index
var key ="ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
var remaining;
var classList = "ui-draggable tile";
//keep track of active rack
var activeRack = [];

function generateHand() {
  //clear previous images
  $("div#tiles > img").remove();
  //set a var to the max hand size
  var maxHand= 7;
  var available = tilesAvailable();
  //return a random bumber between 0 and 26
  //source: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
  for(var i = 0; i < maxHand; i++){
    //return a random bumber between 0 and 26
    //source: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    var randomNum = Math.floor(Math.random() * (26 - 0 + 1)) + 0;

    //check if letter is available
    if(ScrabbleTiles[key[randomNum]]["number-remaining"] === 0) {
      //loop through until key is found.
      while (ScrabbleTiles[key[randomNum]]["number-remaining"] === 0) {
        var randomNum = Math.floor(Math.random() * (26 - 0 + 1)) + 0;
      }
    }

    //add new tile to active rack
    activeRack[i] = {"letter": ScrabbleTiles[key[randomNum]], "value" : ScrabbleTiles[key[randomNum]]["value"]} ;

    //decrement number remaining
    ScrabbleTiles[key[randomNum]]["number-remaining"]--;
    //console.log(Remaining")

    //build <img> tag and prepend
    var id = "t"+i;
    var src = "srcimg/tiles/Scrabble_Tile_" + key[randomNum] + ".jpg";
    console.log("Scabble:"+key[randomNum])
    $("#tiles").prepend($('<img>', {id:id, class:classList, src:src }))
  }
}

//grab number of remaining tiles
function tilesAvailable() {
  var remaining = 0;
  var i = 0;
  while(i < 27) {
    remaining += ScrabbleTiles[key[i]]["number-remaining"];
    i++;
  }

  return remaining;
}

$(document).ready(function() {
  generateHand();
  //drop onto board
  $(".tile").draggable({revert:"invalid"});
  $(".board").droppable({
    accept: ".ui-draggable",
    revert: "invalid",
    tolerance: "pointer",
    drop: function (ev, ui){
      //snap element to drop location
      //source https://stackoverflow.com/questions/1254665/jquery-draggable-droppable-how-to-snap-dropped-element-to-dropped-on-element
      $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
      $(this).droppable('option', 'accept', ui.draggable);
    },
    out: function(event, ui){
        $(this).droppable('option', 'accept', '.board');
    }
  });

  $("button").click(function() {
    location.reload(true);
  });
});
