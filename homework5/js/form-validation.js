$(document).ready(function() {
  $('#input-form').validate({

    rules: {
      xFirst: {
        required: true,
        number: true
      },
      xEnd: {
        required: true,
        number: true,
        greaterThan: '#xFirst'
      },
      yFirst: {
        required: true,
        number: true,
      },
      yEnd: {
        required: true,
        number: true,
        greaterThan: '#yFirst'
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

    highlight: function (input) {
      $(input).removeClass('is-valid').addClass('is-invalid');
    },

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

$.validator.addMethod( "lessThan", function (value, element, param) {
    var target = $(param);
    return value < target.val();
}, "Please enter a value less than");
