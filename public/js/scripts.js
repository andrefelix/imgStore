$(function() {
	$('#post-comment').hide();

	$('#btn-comment').on('click', function(event) {
		event.preventDefault();

		$('#post-comment').show();
	});

	$('#btn-like').on('click', function(event) {
		event.preventDefault();

		let imgId = $(this).data('id');
		
		$.post('/images/' + imgId + '/like').done(function(data) {
			$('.likes-count').text(data.likes);
		});
	});

	$('#btn-delete').on('click', function(event) {
		event.preventDefault();

		const response = confirm('You are sure that delete this image?');

		if (response) {
			const $this = $(this);
			const imgId = $(this).data('id');

			$.ajax({
				url: '/images/' + imgId,
				type: 'DELETE'
			}).done(function(deleted) {
				if (deleted) {
					$this.removeClass('btn-danger').addClass('btn-success');
					$this.find('i').removeClass('fa-times').addClass('fa-checked');
					$this.append('<span> Deleted!</span>');
				}
			});
		}
	});
});