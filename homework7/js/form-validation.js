$(document).ready(function() {
  //Initialize tabs
  $("#tabs").tabs();
  slides();
  formValidation();
  $("#submitButton").click(function() {
    //prevent tab from immedietaley disapearing after save
    event.preventDefault();
    createTabs();
  });

});

//INPUT VALIDATION FUNCTION
function formValidation() {
  $('#input-form').validate({

    rules: {
      xFirst: {
        required: true,
        number: true,
        range: [-100,100]
      },
      xEnd: {
        required: true,
        number: true,
        greaterThan: '#xFirst',
        range: [-100,100]
      },
      yFirst: {
        required: true,
        number: true,
        range: [-100,100]
      },
      yEnd: {
        required: true,
        number: true,
        greaterThan: '#yFirst',
        range: [-100,100]
      }
    },

    //replace default jQuery error message with custom error messages
    messages: {
      xFirst: {
        required: "Please enter a value between -100 to 100",
        number: "Error: Input must be a number",
        //lessThan: "Please enter a value less than the Maximum Column Value"
      },
      xEnd: {
        required: "Please enter a value between -100 to 100",
        number: "Error: Input must be a number",
        greaterThan: "Please enter a value greater than the Minimum Column Value"
      },
      yFirst: {
        required: "Please enter a value between -100 to 100",
        number: "Error: Input must be a number",
        //lessThan: "Please enter a value less than the Maximum Row Value"
      },
      yEnd: {
        required: "Please enter a value between -100 to 100",
        number: "Error: Input must be a number",
        greaterThan: "Please enter a value less than the Minimum Column Value"
      }
    },

    //add is invalid class to invalid inputs for styling removes invalid class
    highlight: function (input) {
      $(input).removeClass('is-valid').addClass('is-invalid');
    },

      //add is valid class to valid inputs for styling. removes invalid class
    unhighlight: function (input) {
      $(input).removeClass('is-invalid').addClass('is-valid');
    }
  });
};

//adjusted greater than function based on https://stackoverflow.com/questions/14347177/how-can-i-validate-that-the-max-field-is-greater-than-the-min-field
//deals with bugs that would cause negative numbers to read correctly
$.validator.addMethod("greaterThan", function (value, element, param) {
    var $min = $(param);
    if (this.settings.onfocusout) {
        $min.off(".validate-greaterThan").on("blur.validate-greaterThan", function () {
            $(element).valid();
        });
    }
    return parseInt(value) >= parseInt($min.val());
}, "Max must be greater than min");


function onSubmit() {
  //assign variables.
  var minCol = Number(document.getElementById('xFirst').value);
  var maxCol = Number(document.getElementById('xEnd').value);
  var minRow = Number(document.getElementById('yFirst').value);
  var maxRow = Number(document.getElementById('yLast').value);

  //make a default table if input is invalid
  if(document.getElementById('xFirst').value == '' || document.getElementById('xEnd').value == ''
    || document.getElementById('yFirst').value == '' || document.getElementById('yLast').value == '') {
    minCol = 1;
    maxCol = 10;
    minRow = 1;
    maxRow = 10
  }

  var startX = minCol;
  var startY = minRow;

  var x;
  //Create Table
  var table = document.createElement('table');
  table.classList.add('newTable');

  //Start table loop. First for loop is for rows. Second is for columns
  for (let i = 0; i <= getXBounds(minRow,maxRow); i++){
    const row = document.createElement('tr'); // Create first Row

    startX = minCol; //set X to starting value since we are creating a new column

    for (let j = 0; j <= getYBounds(minCol,maxCol); j++){

      const col = document.createElement('td'); // Create first column

      if ((i == 0) && (j == 0))  { // first square in table is empty
        val = ''
        col.classList.add('firstCell');

      } else if(i == 0) {  // First row
        val = startX;
        startX++;
        col.classList.add('firstRow');

      } else if(j == 0) { // New Column
        val = startY;
        col.classList.add('firstCol');
      }

      else { //Multiply
        val = startX * startY
        startX++;
      }
      col.innerHTML = val;
      row.appendChild(col);

    }

    if(i != 0) {
      startY++;
    }

    table.appendChild(row);
  }
  document.getElementById('initTable').innerHTML = '';
  document.getElementById('initTable').appendChild(table);


  return false;
}

//Next two functions gets the size of i and j in order to build table.
function getXBounds(xMin, xLast) {
  return Math.abs(xLast - xMin) + 1;
}

function getYBounds(yMin, yLast) {
  return Math.abs(yLast - yMin) + 1;
}

//Function to create a new tab after a table is created
function createTabs() {
  //grab total number of tabs and min/mac values for tab names
  var num_tabs = $("div#tabs ul li").length + 1;
  var minC = Number(document.getElementById('xFirst').value);
  var maxC = Number(document.getElementById('xEnd').value);
  var minR = Number(document.getElementById('yFirst').value);
  var maxR = Number(document.getElementById('yLast').value);

  var table = document.getElementById('initTable');
  var clone = table.cloneNode(true);
  clone.id = "tabTable";

  //create new tab
  $("div#tabs ul").append(
    "<li><a href='#tab" + num_tabs + "'>(" + minC + "," + maxC + ") x (" + minR + "," + maxR +
    ")</a><span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>"
  );

  $("div#tabs").append(
    "<div id='tab" + num_tabs + "'></div>"
  );

  //add table to new  tab
  document.getElementById('tab'+num_tabs).appendChild(clone);

  //refresh tabs
  $("div#tabs").tabs("refresh");

}

//Based on https://jqueryui.com/tabs/#manipulation
//Adds the x to the right of the new tab
$(function() {
  var tabs = $("#tabs").tabs();

  //just opens the dialog
  $("#add_tab")
      .button()
      .on( "click", function() {
        dialog.dialog( "open" );
      });

    // Close icon: removing the tab on click
    tabs.on( "click", "span.ui-icon-close", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });

    //closes
    tabs.on( "keyup", function( event ) {
      if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
      }
    });
});

//implementing slides per
function slides() {
  $(function() {
    var select = $( "#xFirst" );
    var slider = $( "<div id='xFirstSlider'></div>" ).insertAfter(select).slider({
      min: -100,
      max: 100,
      slide: function(event, ui ) {
         $("#xFirst").val(ui.value);
         //https://stackoverflow.com/questions/6658937/how-to-check-if-a-form-is-valid-programmatically-using-jquery-validation-plugin
         //Check that the form is valid as the slider moves. If so, call onSubmit to adjust the table
         if($("#input-form").valid()) {
           onSubmit();
         };
      }
    });
    $( "#xFirst" ).on("change", function() {
      slider.slider( "value", this.value);
    });
  });

  $(function() {
    var select = $("#xEnd");
    var slider = $( "<div id='xLastSlider'></div>" ).insertAfter(select).slider({
      min: -100,
      max: 100,
      slide: function( event, ui ) {
         $("#xEnd").val(ui.value);
         if($("#input-form").valid()) {
           //https://stackoverflow.com/questions/6658937/how-to-check-if-a-form-is-valid-programmatically-using-jquery-validation-plugin
           //Check that the form is valid as the slider moves. If so, call onSubmit to adjust the table
           onSubmit();
         };
      }
    });
    $("#xEnd").on( "change", function() {
      slider.slider( "value", this.value);
    });
  });

  $(function() {
    var select = $( "#yFirst") ;
    var slider = $( "<div id='yFirstSlider'></div>" ).insertAfter(select).slider({
      min: -100,
      max: 100,
      slide: function( event, ui ) {
         $("#yFirst").val(ui.value);
         if($("#input-form").valid()) {
           //https://stackoverflow.com/questions/6658937/how-to-check-if-a-form-is-valid-programmatically-using-jquery-validation-plugin
           //Check that the form is valid as the slider moves. If so, call onSubmit to adjust the table
           onSubmit();
         };
      }
    });
    $( "#yFirstSlider" ).on( "change", function() {
      slider.slider( "value", this.value);
    });
  });

  $(function() {
    var select = $( "#yLast" );
    var slider = $( "<div id='yEndSlider'></div>" ).insertAfter(select).slider({
      min: -100,
      max: 100,
      slide: function( event, ui ) {
         $("#yLast").val(ui.value);
         if($("#input-form").valid()) {
           //https://stackoverflow.com/questions/6658937/how-to-check-if-a-form-is-valid-programmatically-using-jquery-validation-plugin
           //Check that the form is valid as the slider moves. If so, call onSubmit to adjust the table
           onSubmit();
         };
      }
    });
    $( "#yLast" ).on( "change", function() {
      slider.slider( "value", this.value);
    });
  });
}
