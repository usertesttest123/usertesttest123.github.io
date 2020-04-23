$(document ).ready(function() {
    var form = $('form#contact-form');
    url = 'https://script.google.com/macros/s/AKfycbzhM1BhFV3TXBq6nT_kyy86GGP0xzHDF1r5rR54H0uMFWwbTxo/exec';

    $('#submit-form').on('click', function(e) {
    e.preventDefault();
        $(".error").remove();

        var validateForm = 0;
        
        if ($('input[type=text][name=Name]').val().length < 1) {
            $('#Name').after('<span class="error">This field is required</span>');
            validateForm += 1 ;
        }


        if ($('input[type=email][name=Email]').val().length < 1) {
            $('#Email').after('<span class="error">This field is required</span>');
            validateForm += 1;
        }
        else{
            var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var validEmail = regEx.test($('input[type=email][name=Email]').val());
            if (!validEmail) {
                $('#Email').after('<span class="error">Enter a valid email</span>');
                validateForm += 1;
            }
        }

        if ($('input[type=text][name=Fax]').val().length < 1){
            $('#Fax').after('<span class="error">This field is required</span>');
            validateForm += 1;
        }

        if ($('input[type=tel][name=PhoneNumber]').val().length < 1){
            $('#PhoneNumber').after('<span class="error">This field is required</span>');
            validateForm += 1;
        }
        else if ($('input[type=tel][name=PhoneNumber]').val().length > 10 || $('input[type=tel][name=PhoneNumber]').val().length < 10 ){
            $('#PhoneNumber').after('<span class="error">Enter a valid Phone Number</span>');
            validateForm += 1;
        }
        else{
            var regEx = /^\d+$/;
            var validPhone = regEx.test($('input[type=tel][name=PhoneNumber]').val());
            if (!validPhone){
                $('#PhoneNumber').after('<span class="error">Enter a valid Phone Number</span>');
                validateForm += 1;
            }
        }

        if(validateForm < 1){
            $.ajax({
                url: url,
                method: "GET",
                dataType: "json",
                data:({
                    Name : $('input[type=text][name=Name]').val(),
                    Email: $('input[type=email][name=Email]').val(),
                    Fax : $('input[type=text][name=Fax]').val(),
                    PhoneNumber: $('input[type=tel][name=PhoneNumber]').val(),
                    Message: $('#Message').val()
                }),
                success: function(response){
                    $("#success-alert").show();
                    form.hide();
                }
            });
        }
       
    })

    $("#back-button").on("click", function() {
        $("#success-alert").show();
        $("input[type=text][name=Name]").val("");
        $('input[type=email][name=Email]').val("");  
        $('input[type=tel][name=PhoneNumber]').val("");
        $('#Message').val("");
        form.show();
    });

});
