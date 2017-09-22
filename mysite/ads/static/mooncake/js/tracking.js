$(document).ready(function(){
	$('#_next').click(function(){
		formData={};
		formData['img_index'] = $('div.carousel-item.active').index()+1;
		$.ajax({
	        url: '/mooncake/tracking/',
	        data:formData,
	        type: "POST",
	        dataType: "json",
	    }).done(function(data){
	    	console.log(data);
	    });
	});
});

