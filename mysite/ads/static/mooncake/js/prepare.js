function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        
        $('.modal-title').html('Login with');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
}

function openLoginModal(id){
    showLoginForm();
    setTimeout(function(){
        $(id).modal('show');    
    }, 230);
    
}
function shakeModal(){
    $('#loginModal .modal-dialog').addClass('shake');
            // $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
            setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}




var collect_time_1 = '2017-10-1 19:00 - 21:00'
var collect_time_2 = '2017-10-2 19:00 - 21:00'
var collect_time_3 = '2017-10-3 19:00 - 21:00'
$(document).ready(function(){


$.fn.preBind = function (type, data, fn) {
    this.each(function () {
        var $this = $(this);

        $this.bind(type, data, fn);

        var currentBindings = $._data(this, 'events')[type];
        if ($.isArray(currentBindings)) {
            currentBindings.unshift(currentBindings.pop());
        }
    });
    return this;
};

loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 100 } );
// 
$('#_next').preBind('click', function() {
    loader.show();
    // loader.delay(5000).hide();
    setTimeout( function() {
        loader.hide();
    }, 5000 );
});
$('#_prev').preBind('click', function() {
    loader.show();
    setTimeout( function() {
        loader.hide();
    }, 5000 );
});
    // start exp
    ads=[8,9,17,18]
    exp_data={}
    myVar=0;
    isToggled=false;
    $.ajax({
        url: '/mooncake/initializeExp/',
        dataType: 'json'
    }).done(function(data){
        // console.log(data);
        // console.log(data['img_seq']);
        exp_data = data;
        myVar = setTimeout(function(){ toggleAdsModal("ads_modal_"+exp_data['img_seq'][7]); isToggled=true}, 3000);
        if(data['collect_group'] != 1){
            $('#water-select').hide();
        }
        generateImg(data['img_seq'].slice(0,7));
        if(exp_data['exp_group'] == 1 || exp_data['exp_group']==3){
            generateAdsModal(exp_data['img_seq'].slice(7,9));
        }
        
        // if(data['exp_group'] === 1 ||  data['exp_group'] === 3){
        //     generateAds(data['img_seq'],data['words']);
        // }else{
        //     generateSoc(data['img_seq'],data['words']);
        // }
        // generateForm();
        generateFormPop();
        // submitting the form
        
        $('#tipsSubmit').click(function(){
            $.ajax({
                url: '/mooncake/beforerecog/',
                type: 'POST',
                dataType: "json",
                data : exp_data
            });
            $('#recogTipsModal').modal('hide');
            openLoginModal('#recogModal');
        })
        
        $('#signup').click(function(){
            openLoginModal('#loginModal');
            if(exp_data['exp_group'] == 1 || exp_data['exp_group']==3){
                toggleAdsModal("ads_modal_"+exp_data['img_seq'][8]);
            }

        })
        $('#fake_submit').click(function(){

            if(exp_data['collect_group'] == 1){
                $("#loginModal").modal('hide');
                openLoginModal('#recogTipsModal');

            }
            else{
                formData = getFormData($("#myform"));
                formData['access_time'] = exp_data['access_time']
                formData['img_seq'] = exp_data['img_seq'].toString()
                formData['collect_group'] = exp_data['collect_group']
                formData['exp_group'] = exp_data['exp_group']
                formData['recog'] = $('#recogForm :input').eq(1).val()
                $.ajax({
                    url: '/mooncake/register/',
                    type: 'POST',
                    dataType: "json",
                    data : formData
                }).done(function(callback){
                    console.log(callback['myStatus']);
                    openLoginModal('#loginModal');
                    if(callback['myStatus']==2){
                        // $("#exampleModalLabel").text('');
                        // $("#exampleModalLabel").text('Registration Failed!');
                        // $("#exampleModalBody").text('');
                        // $("#exampleModalBody").text(callback['message']);
                        // $('#myModal').modal('toggle');
                        $('.error').attr('class', 'error alert alert-danger').html(callback['message']);
                        shakeModal();
                    }else if(callback['myStatus']==0){
                        var collect_time;
                        switch(callback['collect_group']){
                            case '1':
                                collect_time = collect_time_1
                                break;
                            case '2':
                                collect_time = collect_time_2
                                break;
                            case '3':
                                collect_time = collect_time_3
                                break;
                        }
                        // $("#exampleModalLabel").text('');
                        // $("#exampleModalLabel").text('Registration Failed!');
                        // $("#exampleModalBody").text('');
                        // $("#exampleModalBody").text(callback['message']);
                        // $("#exampleModalBody").append('<p>You are assigned to claim on: '+collect_time+'.</p>');
                        // $('#myModal').modal('toggle');
                        $('.error').attr('class', 'error alert alert-danger').html('SID has been registered, claim on: '+collect_time);
                        shakeModal();
                    }else{
                        var collect_time;
                        switch(callback['collect_group']){
                            case '1':
                                collect_time = collect_time_1
                                break;
                            case '2':
                                collect_time = collect_time_2
                                break;
                            case '3':
                                collect_time = collect_time_3
                                break;
                        }
                        // $("#exampleModalLabel").text('');
                        // $("#exampleModalLabel").text('Registration Successfully!');
                        // $("#exampleModalBody").text('');
                        // $("#exampleModalBody").text('You are assigned to claim on: '+collect_time+'.');
                        // $('#myModal').modal('toggle');
                        $('.error').attr('class', 'error alert alert-success').html('You are assigned to claim on: '+collect_time);
                        shakeModal();
                    }

                });

            }
            
        })
        $('#submit').click(function(){
                $('#recogModal').modal('hide'); 
                // submit the form to the server
                formData = getFormData($("#myform"));
                formData['access_time'] = exp_data['access_time']
                formData['img_seq'] = exp_data['img_seq'].toString()
                formData['collect_group'] = exp_data['collect_group']
                formData['exp_group'] = exp_data['exp_group']
                formData['recog'] = $('#recogForm :input').eq(1).val()
                $.ajax({
                    url: '/mooncake/register/',
                    type: 'POST',
                    dataType: "json",
                    data : formData
                }).done(function(callback){
                    console.log(callback['myStatus']);
                    openLoginModal('#loginModal');
                    if(callback['myStatus']==2){
                        // $("#exampleModalLabel").text('');
                        // $("#exampleModalLabel").text('Registration Failed!');
                        // $("#exampleModalBody").text('');
                        // $("#exampleModalBody").text(callback['message']);
                        // $('#myModal').modal('toggle');
                        $('.error').attr('class', 'error alert alert-danger').html(callback['message']);
                        shakeModal();
                    }else if(callback['myStatus']==0){
                        var collect_time;
                        switch(callback['collect_group']){
                            case '1':
                                collect_time = collect_time_1
                                break;
                            case '2':
                                collect_time = collect_time_2
                                break;
                            case '3':
                                collect_time = collect_time_3
                                break;
                        }
                        // $("#exampleModalLabel").text('');
                        // $("#exampleModalLabel").text('Registration Failed!');
                        // $("#exampleModalBody").text('');
                        // $("#exampleModalBody").text(callback['message']);
                        // $("#exampleModalBody").append('<p>You are assigned to claim on: '+collect_time+'.</p>');
                        // $('#myModal').modal('toggle');
                        $('.error').attr('class', 'error alert alert-danger').html('SID has been registered, claim on: '+collect_time);
                        shakeModal();
                    }else{
                        var collect_time;
                        switch(callback['collect_group']){
                            case '1':
                                collect_time = collect_time_1
                                break;
                            case '2':
                                collect_time = collect_time_2
                                break;
                            case '3':
                                collect_time = collect_time_3
                                break;
                        }
                        // $("#exampleModalLabel").text('');
                        // $("#exampleModalLabel").text('Registration Successfully!');
                        // $("#exampleModalBody").text('');
                        // $("#exampleModalBody").text('You are assigned to claim on: '+collect_time+'.');
                        // $('#myModal').modal('toggle');
                        $('.error').attr('class', 'error alert alert-success').html('You are assigned to claim on: '+collect_time);
                        shakeModal();
                    }

                });
                
            
            
        });
    });




    $('#_prev').hide();
    $('#_next').click(function(){
        if($('div.carousel-item.active').index() === 0){
            if(exp_data['exp_group']==1||exp_data['exp_group']==3){
                if(!isToggled){
                    toggleAdsModal("ads_modal_"+exp_data['img_seq'][7]);
                    clearTimeout(myVar);
                }
                // myVar = setTimeout(function(){ toggleAdsModal("ads_modal_"+exp_data['img_seq'][7]); isToggled=true}, 3000);
                              
            }

        }

        
        if($('div.carousel-item.active').index() === $('div.carousel-item').length-2){
            $('#_next').hide();
            // if(ads.indexOf(exp_data['img_seq'][exp_data['img_seq'].length-1])!=-1){
            //     toggleAdsModal("ads_modal_"+exp_data['img_seq'][exp_data['img_seq'].length-1]);
            // }
        }else{
            // autoType(".type-js",10, $('div.carousel-item.active').index()+1);
            $('#_next').show();
            $('#_prev').show();
        }
        // if(ads.indexOf(exp_data['img_seq'][$('div.carousel-item.active').index()+1])!=-1){
        //     toggleAdsModal("ads_modal_"+exp_data['img_seq'][$('div.carousel-item.active').index()+1]);
        // }

    });
    $('#_prev').click(function(){
        if($('div.carousel-item.active').index() === 1){
            if(exp_data['exp_group']==1||exp_data['exp_group']==3){
                isToggled=false;
                myVar = setTimeout(function(){ toggleAdsModal("ads_modal_"+exp_data['img_seq'][7]); isToggled=true}, 3000);
            }
        }
        if($('div.carousel-item.active').index() === 1){
            $('#_prev').hide();
        }else{
            // autoType(".type-js",10, $('div.carousel-item.active').index()-1);
            $('#_next').show();
            $('#_prev').show();
        }
    });  





});

// function generateAds(seq,words){
//     // place mooncakes first
//     Array.prototype.diff = function(a) {
//         return this.filter(function(i) {return a.indexOf(i) < 0;});
//     };
//     // Fixed: images with index 8,9,12,13 would be ads
//     ads=[8,9,17,18]
//     mooncakes=seq.diff(ads)
//     var strVar="";
//     strVar += "<div class=\"carousel-item active\" style=\"background-image: url('\/static\/mooncake\/media\/img\/"+mooncakes[0]+".jpg')\">";
//     strVar += " <div class=\"carousel-caption d-none d-md-block\">";
//     // strVar += "     <h3>Third Slide<\/h3>";
//     strVar += "<div class=\"type-js headline\">";
//     // strVar += "     <p class='text-js'>" + words[mooncakes[0]] + "<\/p>";
//     strVar += " <\/div>";
//     strVar += " <\/div>";
//     strVar += "<\/div>  "; 
//     $('.carousel-inner').append(strVar);
//     for (var i = 1, len = mooncakes.length; i < len; i++) {
//         var strVar="";
//         strVar += "<div class=\"carousel-item\" style=\"background-image: url('\/static\/mooncake\/media\/img\/"+mooncakes[i]+".jpg')\">";
//         strVar += " <div class=\"carousel-caption d-none d-md-block\">";
//         // strVar += "     <h3>Third Slide<\/h3>";
//         strVar += "<div class=\"type-js headline\">";
//         // strVar += "     <p class='text-js'>" + words[mooncakes[i]] + "<\/p>";
//         strVar += " <\/div>";
//         strVar += " <\/div>";
//         strVar += "<\/div>  "; 
//         $('.carousel-inner').append(strVar);    
//     }
//     thisAds = ads.diff(ads.diff(seq));
//     generateAdsModal(thisAds);
//     // generateAdsModalWithCountDown(thisAds);
//     // if the first images is ads, toggle it
//     if(ads.indexOf(seq[0])!=-1){
//         toggleAdsModal("ads_modal_"+seq[0]);
//     }
// }
// function generateSoc(seq, words){

//     var strVar="";
//     strVar += "<div class=\"carousel-item active\" style=\"background-image: url('\/static\/mooncake\/media\/img\/"+seq[0]+".jpg')\">";
//     strVar += " <div class=\"carousel-caption d-none d-md-block\">";
//     // strVar += "     <h3>Third Slide<\/h3>";
//     strVar += "<div class=\"type-js headline\">";
//     // strVar += "     <p class='text-js'>" + words[seq[0]] + "<\/p>";
//     strVar += " <\/div>";
//     strVar += " <\/div>";
//     strVar += "<\/div>  "; 
//     $('.carousel-inner').append(strVar);
//     for (var i = 1, len = seq.length; i < len; i++) {
//         var strVar="";
//         strVar += "<div class=\"carousel-item\" style=\"background-image: url('\/static\/mooncake\/media\/img\/"+seq[i]+".jpg')\">";
//         strVar += " <div class=\"carousel-caption d-none d-md-block\">";
//         // strVar += "     <h3>Third Slide<\/h3>";
//         strVar += "<div class=\"type-js headline\">";
//         // strVar += "     <p class='text-js'>" + words[seq[i]] + "<\/p>";
//         strVar += " <\/div>";
//         strVar += " <\/div>";
//         strVar += "<\/div>  "; 
//         $('.carousel-inner').append(strVar);    
//     }
// }

function generateImg(seq){

    // var strVar="";
    // strVar += "<div class=\"carousel-item active\" style=\"background-image: url('\/static\/mooncake\/media\/img\/"+seq[0]+".jpg')\">";
    // strVar += " <div class=\"carousel-caption d-none d-md-block\">";
    // // strVar += "     <h3>Third Slide<\/h3>";
    // strVar += "<div class=\"type-js headline\">";
    // // strVar += "     <p class='text-js'>" + words[seq[0]] + "<\/p>";
    // strVar += " <\/div>";
    // strVar += " <\/div>";
    // strVar += "<\/div>  "; 
    // $('.carousel-inner').append(strVar);
    for (var i = 0, len = seq.length; i < len; i++) {
        var strVar="";
        strVar += "<div class=\"carousel-item\" style=\"background-image: url('\/static\/mooncake\/media\/img\/"+seq[i]+".jpg')\">";
        strVar += " <div class=\"carousel-caption d-none d-md-block\">";
        // strVar += "     <h3>Third Slide<\/h3>";
        strVar += "<div class=\"type-js headline\">";
        // strVar += "     <p class='text-js'>" + words[seq[i]] + "<\/p>";
        strVar += " <\/div>";
        strVar += " <\/div>";
        strVar += "<\/div>  "; 
        $('.carousel-inner').append(strVar);    
    }
}
function generateFormPop(){
    var strVar="";
    strVar += "<div class=\"carousel-item\" style=\"background-image: url('\/static\/mooncake\/media\/legend-of-midautumn-1.jpg')\">";
    strVar += " <div class=\"carousel-caption d-md-block\" style=\"bottom:20%;\">";
    strVar += "     <button type=\"button\" id=\"signup\" class=\"btn btn-outline-warning btn-lg\" >Sign Up Now!<\/button>";
    strVar += "     <p>If the form is not available, please access this website using a PC.<\/p>"
    strVar += " <\/div>";
    strVar += "<\/div>  "; 
    $('.carousel-inner').append(strVar);
}
function generateForm(){
    var strVar="";
    strVar += "          <div class=\"carousel-item\" style=\"background-image:url('\/static\/mooncake\/media\/legend-of-midautumn-1.jpg')\">";
    strVar += "            <div class=\"carousel-caption d-none d-md-block\" style=\"bottom:25%;\">";
    strVar += "              <h3>Registration Form<\/h3>";
    strVar += "              <form class=\"\" method=\"post\" action=\"#\" id='myForm'>";
    strVar += "            ";
    strVar += "            <div class=\"form-group\">";
    strVar += "              <label for=\"sid\" class=\"cols-sm-2 control-label\">SID<\/label>";
    strVar += "              <div class=\"cols-sm-10\">";
    strVar += "                <div class=\"input-group\">";
    strVar += "                  <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-info-sign\" aria-hidden=\"true\"><\/i><\/span>";
    strVar += "                  <input type=\"text\" class=\"form-control\" name=\"sid\" id=\"sid\"  placeholder=\"Student ID\"\/>";
    strVar += "                <\/div>";
    strVar += "              <\/div>";
    strVar += "            <\/div>";
    strVar += "";
    strVar += "            <div class=\"form-group\">";
    strVar += "              <label for=\"name\" class=\"cols-sm-2 control-label\">Name<\/label>";
    strVar += "              <div class=\"cols-sm-10\">";
    strVar += "                <div class=\"input-group\">";
    strVar += "                  <span class=\"input-group-addon\"><i class=\"fa fa-user fa\" aria-hidden=\"true\"><\/i><\/span>";
    strVar += "                  <input type=\"text\" class=\"form-control\" name=\"name\" id=\"name\"  placeholder=\"Your Name\"\/>";
    strVar += "                <\/div>";
    strVar += "              <\/div>";
    strVar += "            <\/div>";
    strVar += "";
    strVar += "            <div class=\"form-group\">";
    strVar += "              <label for=\"mooncake\" class=\"cols-sm-2 control-label\">Moon Cake flavour<\/label>";
    strVar += "              <div class=\"cols-sm-10\">";
    strVar += "                <div class=\"input-group\">";
    strVar += "                  <select style='width:100%' form='myForm' id='cake' name='cake'>";
    strVar += "                    <option value='cake1'>cake1<\/option>";
    strVar += "                    <option value='cake2'>cake2<\/option>";
    strVar += "                    <option value='cake3'>cake3<\/option>";
    strVar += "                  <\/select>";
    strVar += "";
    strVar += "                <\/div>";
    strVar += "              <\/div>";
    strVar += "            <\/div>";
    strVar += "";
    strVar += "";
    strVar += "";
    strVar += "";
    strVar += "            <div class=\"form-group\">";
    strVar += "              <label for=\"username\" class=\"cols-sm-2 control-label\">Water (as we also provide for free)<\/label>";
    strVar += "              <div class=\"cols-sm-10\">";
    strVar += "                <div class=\"input-group\">";
    strVar += "                  <select style='width:100%' form='myForm' id='water' name='water'>";
    strVar += "                    <option value='water1'>water1<\/option>";
    strVar += "                    <option value='water2'>water2<\/option>";
    strVar += "                    <option value='water3'>water3<\/option>";
    strVar += "                  <\/select>";
    strVar += "";
    strVar += "                <\/div>";
    strVar += "              <\/div>";
    strVar += "            <\/div>";
    strVar += "";
    strVar += "            <div class=\"form-group \">";
    strVar += "              <a type=\"button\" id=\"submit\" class=\"btn btn-primary btn-lg btn-block login-button\" style=\"color:#04a3f5;\">Submit<\/a>";
    strVar += "            <\/div>";
    strVar += "            ";
    strVar += "          <\/form>";
    strVar += "";
    strVar += "";
    strVar += "            <\/div>";
    strVar += "          <\/div>";
    $('.carousel-inner').append(strVar);   
}
function generateAdsModalWithCountDown(ads){
    for (var i = 0, len = ads.length; i < len; i++){
        var strVar="";
        strVar += "<div id=\"ads_modal_"+ads[i]+"\" class=\"modal fade interstitialModal\" tabindex=\"-1\" role=\"dialog\" data-width=\"640\" aria-labelledby=\"interstitialLabel\" aria-hidden=\"true\">";
        strVar += "  <div class=\"modal-dialog\">";
        strVar += "    ";
        strVar += "    <p class=\"text-center\">Advertisement will run for 20 seconds. <a href=\"#\" data-dismiss=\"modal\">Continue to site »<\/a> <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">×<\/span><span class=\"sr-only text-muted\">Close<\/span><\/button><\/p>";
        strVar += "    <div class=\"modal-content\">";
        strVar += "      <div class=\"modal-body\">";
        strVar += "        ";
        strVar += "        <img src=\"http:\/\/placehold.it\/640X480\"><\/div>";
        strVar += "      ";
        strVar += "    <\/div>";
        strVar += "  <\/div>";
        strVar += "<\/div>";
        $('#ads_modals').append(strVar); 
    }
}

function generateAdsModal(ads){
    for (var i = 0, len = ads.length; i < len; i++) {
        var strVar="";
        strVar += "<div id=\"ads_modal_"+ads[i]+"\" class=\"modal\">";
        strVar += "<p class=\"text-center close\" style=\'color:#007bff;font-size: 3rem;\'><\/p>"
        // strVar += "    <span class=\"close\" onclick=\"document.getElementById('ads_modal_"+ads[i]+"').style.display='none'\">&times;<\/span>";
        strVar += "    <img class=\"modal-content\" src=\"\/static\/mooncake\/media\/img\/"+ads[i]+".jpg\">";
        // strVar += "    <div id=\"caption\"><\/div>";
        strVar += "<\/div>";
        $('#ads_modals').append(strVar);  
    }
}
function toggleAdsModal(modal_id){
    // Get the modal
    var modal = document.getElementById(modal_id);
    // $(modal_id).modal({show:true});
    // $(modal_id).toggle();
    modal.style.display = 'block';
    countdow = 5;
    var refreshIntervalId = setInterval(function() {
        $('.text-center.close').html('Skip Ads in ' + countdow);
        countdow -= 1;
    },1000);
    setTimeout(function(){ 
        // alert("Hello");
        $('.text-center.close').html('');
        $('#'+modal_id+ ' > p').before("    <span class=\"close\" style=\'color:#007bff;font-size: 3rem;\' onclick=\"document.getElementById('"+modal_id+"').style.display='none'\">&times;<\/span>")
        clearInterval(refreshIntervalId); 
    }, 6000);
}






