<?php 
/*assets scripts*/
function comercio_script() {

    if (!is_admin()){

wp_register_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js', false, false);
// wp_register_scrip('MI-ARCHIVO-JS', get_bloginfo('template_directory') . '/assets/libreria/js/MIARCHIVO.js', false, false);
    /*encolamos los JS*/
    wp_enqueue_script('bootstrap-js');

//    wp_enqueue_script('MI-ARCHIVO-JS', array('jquery'), true);
    }
}
add_action("wp_enqueue_scripts", "comercio_script", 1);