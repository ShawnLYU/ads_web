function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}
$(document).ready(function(){
    // start exp
    ads=[8,9,12,13]
    exp_data={}
    $.ajax({
        url: '/initializeExp/',
        dataType: 'json'
    }).done(function(data){
        // console.log(data);
        // console.log(data['img_seq']);
        exp_data = data;
        if(data['exp_group'] === 1 ||  data['exp_group'] === 3){
            generateAds(data['img_seq']);
        }else{
            generateSoc(data['img_seq']);
        }
        generateForm();
        // submitting the form
        $('#submit').click(function(){
            if($('#sid').val() == ''){
                $("#exampleModalLabel").text('');
                $("#exampleModalLabel").text('Registration Failed!');
                $("#exampleModalBody").text('');
                $("#exampleModalBody").text('Please fill in your SID!!');
                $('#myModal').modal('toggle');
            }else if($('#name').val() == ''){
                $("#exampleModalLabel").text('');
                $("#exampleModalLabel").text('Registration Failed!');
                $("#exampleModalBody").text('');
                $("#exampleModalBody").text('Please fill in your NAME!!');
                $('#myModal').modal('toggle');
            }else{
                // submit the form to the server
                formData = getFormData($("#myForm"));
                formData['access_time'] = exp_data['access_time']
                formData['img_seq'] = exp_data['img_seq']
                formData['collect_group'] = exp_data['collect_group']
                formData['exp_group'] = exp_data['exp_group']
                $.ajax({
                    url: '/register/',
                    type: 'POST',
                    dataType: "json",
                    data : formData
                }).done(function(callback){
                    if(callback['myStatus']==2){
                        $("#exampleModalLabel").text('');
                        $("#exampleModalLabel").text('Registration Failed!');
                        $("#exampleModalBody").text('');
                        $("#exampleModalBody").text(callback['message']);
                        $('#myModal').modal('toggle');
                    }else if(callback['myStatus']==0){
                        var collect_time;
                        switch(callback['collect_group']){
                            case '1':
                                collect_time = '2017-10-1 19:00 - 21:00'
                                break;
                            case '2':
                                collect_time = '2017-10-2 19:00 - 21:00'
                                break;
                            case '3':
                                collect_time = '2017-10-3 19:00 - 21:00'
                                break;
                        }
                        $("#exampleModalLabel").text('');
                        $("#exampleModalLabel").text('Registration Failed!');
                        $("#exampleModalBody").text('');
                        $("#exampleModalBody").text(callback['message']);
                        $("#exampleModalBody").append('<p>You are assigned to claim on: '+collect_time+'.</p>');
                        $('#myModal').modal('toggle');
                    }else{
                        var collect_time;
                        switch(callback['collect_group']){
                            case '1':
                                collect_time = '2017-10-1 19:00 - 21:00'
                                break;
                            case '2':
                                collect_time = '2017-10-2 19:00 - 21:00'
                                break;
                            case '3':
                                collect_time = '2017-10-3 19:00 - 21:00'
                                break;
                        }
                        $("#exampleModalLabel").text('');
                        $("#exampleModalLabel").text('Registration Successfully!');
                        $("#exampleModalBody").text('');
                        $("#exampleModalBody").text('You are assigned to claim on: '+collect_time+'.');
                        $('#myModal').modal('toggle');
                    }

                });
                
            }
            
        });
    });




    $('#_prev').hide();
    $('#_next').click(function(){
        if($('div.carousel-item.active').index() === $('div.carousel-item').length-2){
            $('#_next').hide();
            if(ads.indexOf(exp_data['img_seq'][exp_data['img_seq'].length-1])!=-1){
                toggleAdsModal("ads_modal_"+exp_data['img_seq'][exp_data['img_seq'].length-1]);
            }
        }else{
            $('#_next').show();
            $('#_prev').show();
        }
        if(ads.indexOf(exp_data['img_seq'][$('div.carousel-item.active').index()+1])!=-1){
            toggleAdsModal("ads_modal_"+exp_data['img_seq'][$('div.carousel-item.active').index()+1]);
        }

    });
    $('#_prev').click(function(){
        if($('div.carousel-item.active').index() === 1){
            $('#_prev').hide();
        }else{
            $('#_next').show();
            $('#_prev').show();
        }
    });  





});

function generateAds(seq){
    // place mooncakes first
    Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
    };
    ads=[8,9,12,13]
    mooncakes=seq.diff(ads)
    var strVar="";
    strVar += "<div class=\"carousel-item active\" style=\"background-image: url('\/static\/media\/img\/"+mooncakes[0]+".jpg')\">";
    strVar += " <div class=\"carousel-caption d-none d-md-block\">";
    strVar += "     <h3>Third Slide<\/h3>";
    strVar += "     <p>This is a description for the third slide.<\/p>";
    strVar += " <\/div>";
    strVar += "<\/div>  "; 
    $('.carousel-inner').append(strVar);
    for (var i = 1, len = mooncakes.length; i < len; i++) {
        var strVar="";
        strVar += "<div class=\"carousel-item\" style=\"background-image: url('\/static\/media\/img\/"+mooncakes[i]+".jpg')\">";
        strVar += " <div class=\"carousel-caption d-none d-md-block\">";
        strVar += "     <h3>Third Slide<\/h3>";
        strVar += "     <p>This is a description for the third slide.<\/p>";
        strVar += " <\/div>";
        strVar += "<\/div>  "; 
        $('.carousel-inner').append(strVar);    
    }
    thisAds = ads.diff(ads.diff(seq));
    generateAdsModal(thisAds);
    if(ads.indexOf(seq[0])!=-1){
        toggleAdsModal("ads_modal_"+seq[0]);
    }
}
function generateSoc(seq){

    var strVar="";
    strVar += "<div class=\"carousel-item active\" style=\"background-image: url('\/static\/media\/img\/"+seq[0]+".jpg')\">";
    strVar += " <div class=\"carousel-caption d-none d-md-block\">";
    strVar += "     <h3>Third Slide<\/h3>";
    strVar += "     <p>This is a description for the third slide.<\/p>";
    strVar += " <\/div>";
    strVar += "<\/div>  "; 
    $('.carousel-inner').append(strVar);
    for (var i = 1, len = seq.length; i < len; i++) {
        var strVar="";
        strVar += "<div class=\"carousel-item\" style=\"background-image: url('\/static\/media\/img\/"+seq[i]+".jpg')\">";
        strVar += " <div class=\"carousel-caption d-none d-md-block\">";
        strVar += "     <h3>Third Slide<\/h3>";
        strVar += "     <p>This is a description for the third slide.<\/p>";
        strVar += " <\/div>";
        strVar += "<\/div>  "; 
        $('.carousel-inner').append(strVar);    
    }
}
function generateForm(){
    var strVar="";
    strVar += "          <div class=\"carousel-item\" style=\"background-image:url('\/static\/media\/legend-of-midautumn-1.jpg')\">";
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
function generateAdsModal(ads){
    for (var i = 0, len = ads.length; i < len; i++) {
        var strVar="";
        strVar += "<div id=\"ads_modal_"+ads[i]+"\" class=\"modal\">";
        strVar += "    <span class=\"close\" onclick=\"document.getElementById('ads_modal_"+ads[i]+"').style.display='none'\">&times;<\/span>";
        strVar += "    <img class=\"modal-content\" src=\"\/static\/media\/img\/"+ads[i]+".jpg\">";
        // strVar += "    <div id=\"caption\"><\/div>";
        strVar += "<\/div>";
        $('#ads_modals').append(strVar);  
    }


}
function toggleAdsModal(modal_id){
    // Get the modal
    var modal = document.getElementById(modal_id);
    modal.style.display = "block";
}