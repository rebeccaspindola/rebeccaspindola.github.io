$(document).ready(function() {
  //validate using jQuery validation function
  $('#input-form').validate({

    rules: {
      xFirst: {
        required: true, //requires input. Applies to all form input values
        number: true, //verifies input is a number. Applies to all form input values
        range: [-100,100] //make sure input is between -100 and 100. Applies to all form input values
      },
      xEnd: {
        required: true,
        number: true,
        greaterThan: '#xFirst', //verifies that xEnd is greater than xFirst
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
        greaterThan: '#yFirst', //verifies that xEnd is greater than yFirst
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
        greaterThan: "Please enter a value greater than the Minimum Column Value",
      },
      yFirst: {
        required: "Please enter a value between -100 to 100",
        number: "Error: Input must be a number",
        //lessThan: "Please enter a value less than the Maximum Row Value"
      },
      yEnd: {
        required: "Please enter a value between -100 to 100",
        number: "Error: Input must be a number",
        greaterThan: "Please enter a value less than the Minimum Column Value",
      }
    },

    //add class that turns an invalid form input box red
    highlight: function (input) {
      $(input).removeClass('is-valid').addClass('is-invalid');
    },

    //once error is fixed and input is valid, add a class that turns valid input box green
    unhighlight: function (input) {
      $(input).removeClass('is-invalid').addClass('is-valid');
    }
  });
});

//Did not end up using
$.validator.addMethod( "greaterThan", function (value, element, param) {
    var target = $(param);
    return value > target.val();
}, "Please enter a greater value.");

//add a custon jQuery validation that returns true in case of greater than input
$.validator.addMethod( "lessThan", function (value, element, param) {
    var target = $(param);
    return value < target.val();
}, "Please enter a value less than");
