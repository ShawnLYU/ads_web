function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}
// function showLoginForm(){
//     $('#loginModal .registerBox').fadeOut('fast',function(){
//         $('.loginBox').fadeIn('fast');
//         $('.register-footer').fadeOut('fast',function(){
//             $('.login-footer').fadeIn('fast');    
//         });
        
//         $('.modal-title').html('Login with');
//     });       
//      $('.error').removeClass('alert alert-danger').html(''); 
// }

// function openLoginModal(id){
//     showLoginForm();
//     setTimeout(function(){
//         $(id).modal('show');    
//     }, 230);
    
// }
// function shakeModal(){
//     $('#loginModal .modal-dialog').addClass('shake');
//             // $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
//             setTimeout( function(){ 
//                 $('#loginModal .modal-dialog').removeClass('shake'); 
//     }, 1000 ); 
// }
function CheckRequired(event) {
    var $form = $(this);

	console.log('1');

	if($('#sid').val().replace(/\s/g, '') == ''){
        $('.error').addClass('alert alert-danger').html("Invalid SID");
        shakeModal();
        return false;
    }else if($('#name').val().replace(/\s/g, '') == ''){
        $('.error').addClass('alert alert-danger').html("Invalid name");
        shakeModal();
        return false;
    }
}
$(document).ready(function () {
    $('#_prev').hide();
    $('#_next').hide();
    // openLoginModal('#loginModal');
    // $('#myform').on('submit', CheckRequired);
    $('input#sid').on('input',function(e){
        formData = getFormData($("#myform"));
        $.ajax({
            url: '/mooncake/checkSidEid/',
            type: 'POST',
            dataType: "json",
            data : formData
        }).done(function(callback){
            // console.log(callback['myStatus']);
            if(callback['myStatus']==1){
                // $.notify("SID and EID not match! Please contact Shawn if needed", "error");
                $('.error').removeClass('alert-danger alert-success').addClass('alert alert-danger').html("SID and EID not match! Please contact Shawn if needed");
                shakeModal();
                $("#submit").attr("disabled", true);
            }else{
                $('.error').removeClass('alert-danger alert-success').html('');
                $("#submit").removeAttr("disabled");
            }
        });
    });
    $('input#name').on('input',function(e){
        formData = getFormData($("#myform"));
        $.ajax({
            url: '/mooncake/checkSidEid/',
            type: 'POST',
            dataType: "json",
            data : formData
        }).done(function(callback){
            // console.log(callback['myStatus']);
            if(callback['myStatus']==1){
                // $.notify("SID and EID not match! Please contact Shawn if needed", "error");
                $('.error').removeClass('alert-danger alert-success').addClass('alert alert-danger').html("SID and EID not match! Please contact Shawn if needed");
                shakeModal();
                $("#submit").attr("disabled", true);
            }else{
                $('.error').removeClass('alert-danger alert-success').html('');
                $("#submit").removeAttr("disabled");
            }
        });
    });
    // $('#submit').click(function(){
    //     if($('#sid').val().replace(/\s/g, '') == ''){
    //         $('.error').addClass('alert alert-danger').html("Invalid SID");
    //         shakeModal();
    //         return false;
    //     }else if($('#name').val().replace(/\s/g, '') == ''){
    //         $('.error').addClass('alert alert-danger').html("Invalid name");
    //         shakeModal();
    //         return false;
    //     }else{
    //         formData = getFormData($("#myform"));
    //         $.ajax({
    //             url: '/mooncake/home/',
    //             type: 'POST',
    //             dataType: "json",
    //             data : formData
    //         }).done(function(callback){
    //             console.log(callback['myStatus']);
    //             if(callback['myStatus']==1){
    //                 $.notify("BOOM!", "error");
    //             }else{
    //                 location.href = "/mooncake/home/"
    //             }
    //         });
    //     }
    //     // submit the form to the server

    // });
    $('#myform').on('submit', CheckRequired);
});
