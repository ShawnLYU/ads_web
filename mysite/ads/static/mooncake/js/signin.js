function checkSidEid(sid,eid){
    
    formData = {'sid':sid,'eid':eid};
    $.ajax({
        url: '/mooncake/checkSidEid/',
        type: 'POST',
        dataType: "json",
        data : formData,
        async:false
    }).done(function(callback){
        // alert(callback['myStatus']);
        // console.log(callback['myStatus']);
        if(callback['myStatus']==1){
            isValid = true;
            window.location.replace("http://localhost:8000/mooncake/home");
        }else{
            isValid = false;
            $.notify("SID and EID not match! Please contact Shawn if needed", "error");
            
        }
    });
}
$(document).ready(function () {
    
    $('#myform').submit(function(e) {
        e.preventDefault();
        checkSidEid($('#sid').val().replace(/\s/g, ''),$('#name').val().replace(/\s/g, ''));

    });

    
});
