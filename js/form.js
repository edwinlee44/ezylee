var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycbyvxFiTQQZ3qxhZicjTvxmeJ7TAd0M9uQ6uM5QMbv2hHVTKJg/exec'

function validEmail(email) { 
  var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  return re.test(email);
}


 
 
 

 


$('#submit-form').on('click', function(e) {
	
  $("#submit-form").prop('disabled', true);
  e.preventDefault();
  var name = $('#name').val();
  var who = $('#who').val();
  var diet = $('#diet').val();
  var remarks = $('#remarks').val();
  var email = $('#email').val();
  
  $('#name').removeClass('borderClass');
  $('#diet').removeClass('borderClass');
  $('#email').removeClass('borderClass');
  $('#name').nextAll().remove();
  $('#diet').nextAll().remove();
  $('#email').nextAll().remove();
  
  if (name == ''){
	  $('#name').addClass('borderClass');
	  $('#name').after('<span class="help-block">Please enter your name</span>');
  }/* 
  if (phone_number == ''){
	  $('#who').addClass('borderClass');
	  $('#who').after('<span class="help-block">Please enter your phone number</span>');
  }else if (!$.isNumeric(phone_number)){
	  $('#who').addClass('borderClass');
	  $('#who').after('<span class="help-block">Please enter only numbers e.g. 9123 4567</span>');
  }else if (phone_number.length < 8){
	  $('#who').addClass('borderClass');
	  $('#who').after('<span class="help-block">Please enter a valid phone number e.g. 9123 4567</span>');
  } */
  if (diet == null){
	  $('#diet').addClass('borderClass');
	  $('.styled-select').css('background-position','95% 27%');
	  $('#diet').after('<span class="help-block">Please select an option</span>');
  }
  if (email == ''){
	  $('#email').addClass('borderClass');
	  $('#email').after('<span class="help-block">Please enter your email address</span>');
  }else if (!validEmail(email)){
	  $('#email').addClass('borderClass');
	  $('#email').after('<span class="help-block">Please enter a correct email format eg. test@example.com</span>');
  }
  
  if (name != '' && diet != '' && email != '' && validEmail(email)){
	  NProgress.start();
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
			$('#test-form')[0].reset();
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
	  $("#submit-form").prop('disabled', false);
	  iziToast.error({
			position: 'topCenter',
			message: 'Oops, something went wrong.',
		})
  }
  
})
