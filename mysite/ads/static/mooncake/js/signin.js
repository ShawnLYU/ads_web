function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}
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
    $('#myform').on('submit', CheckRequired);
});
