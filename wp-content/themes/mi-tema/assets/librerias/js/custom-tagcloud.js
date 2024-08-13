jQuery(document).ready(function($) {
    $('.Sphere').on('click', 'span', function() {
        var competencia = $(this).text();
        
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'get_competencia_info',
                competencia: competencia
            },
        });
    });
});



