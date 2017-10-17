
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}
$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});
var collect_time_1 = '2017-10-1 19:00 - 21:00'
var collect_time_2 = '2017-10-2 19:00 - 21:00'
var collect_time_3 = '2017-10-3 19:00 - 21:00'
$(".submit").click(function(){
	formData = getFormData($("#msform"));
	if('mooncake' in formData == false){
		$.notify("You have not selected your mooncake", "error");
		return false;
	}else{
        formData = getFormData($("#msform"));
        $.ajax({
            url: '/mooncake/register/',
            type: 'POST',
            dataType: "json",
            data : formData
        }).done(function(callback){
            
            console.log(callback['myStatus']);
            
            if(callback['myStatus']==2){
                // $.notify(callback['message'], "error");
                alert(callback['message']);
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
                alert('SID has been registered, claim on: '+collect_time+' You can close the window now.');
                // $('.error').attr('class', 'error alert alert-danger').html('SID has been registered, claim on: '+collect_time);
                // shakeModal();
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
                alert('Success! You are assigned to claim on: '+collect_time+' You can close the window now.');
                // $('.error').attr('class', 'error alert alert-success').html('You are assigned to claim on: '+collect_time);
                // shakeModal();
            }

        });
		return false;
	}
	
})