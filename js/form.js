var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycbyvxFiTQQZ3qxhZicjTvxmeJ7TAd0M9uQ6uM5QMbv2hHVTKJg/exec'

$('#submit-form').on('click', function(e) {
	NProgress.start();
	 $("#submit-form").prop('disabled', true);
  e.preventDefault();
  var name = $('#name').val();
  var phone_number = $('#phone_number').val();
  var diet = $('#diet').val();
  var remarks = $('#remarks').val();
  
  $('#name').removeClass('borderClass');
  $('#phone_number').removeClass('borderClass');
  $('#diet').removeClass('borderClass');
  $('#name').nextAll().remove();
  $('#phone_number').nextAll().remove();
  $('#diet').nextAll().remove();
  
  if (name == ''){
	  $('#name').addClass('borderClass');
	  $('#name').after('<span class="help-block">Please enter your name</span>');
  }
  if (phone_number == ''){
	  $('#phone_number').addClass('borderClass');
	  $('#phone_number').after('<span class="help-block">Please enter your phone number</span>');
  }else if (!$.isNumeric(phone_number)){
	  $('#phone_number').addClass('borderClass');
	  $('#phone_number').after('<span class="help-block">Please enter only numbers e.g. 9123 4567</span>');
  }else if (phone_number.length < 8){
	  $('#phone_number').addClass('borderClass');
	  $('#phone_number').after('<span class="help-block">Please enter a valid phone number e.g. 9123 4567</span>');
  }
  if (diet == null){
	  $('#diet').addClass('borderClass');
	  $('#diet').after('<span class="help-block">Please select an option</span>');
  }
  
  if (($.isNumeric(phone_number)) && phone_number.length >= 8 && name != '' && diet != ''){
	var data = $form.serializeObject();
	var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject(),
	success: function(data) {
		NProgress.done();
		$("#submit-form").prop('disabled', false);
		if(data.result == 'success'){
			iziToast.success({
				position: 'topCenter',
				message: 'You have successful registered. See you there.',
			})
		}		
		if(data.result == 'error'){
		NProgress.done();
		$("#submit-form").prop('disabled', false);
			iziToast.error({
				position: 'topCenter',
				message: 'You have already registered.',
			})
		}
		
	},
    error: function() {
		$("#submit-form").prop('disabled', false);
		NProgress.done();
        iziToast.error({
			position: 'topCenter',
			message: 'Oops, something went wrong',
		})
    }
	  });
  }else{
	  $('#submit-form').blur();
	  iziToast.error({
			position: 'topCenter',
			message: 'Oops, something went wrong.',
		})
  }
  
})
