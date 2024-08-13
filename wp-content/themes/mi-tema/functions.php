<?php
/**
 * miTema functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package miTema
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function mi_tema_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on miTema, use a find and replace
		* to change 'mi-tema' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'mi-tema', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'mi-tema' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'mi_tema_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'mi_tema_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function mi_tema_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'mi_tema_content_width', 640 );
}
add_action( 'after_setup_theme', 'mi_tema_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function mi_tema_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'mi-tema' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'mi-tema' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'mi_tema_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function mi_tema_scripts() {
	wp_enqueue_style( 'mi-tema-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'mi-tema-style', 'rtl', 'replace' );

	wp_enqueue_script( 'mi-tema-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'mi_tema_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

include get_template_directory() . '/assets/assets.php';

function miTema_enqueue_styles() {
    // Encolar Bootstrap
    wp_enqueue_style( 'bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', array(), '5.3.3' );

    // Encolar el CSS personalizado
    wp_enqueue_style( 'miTema-style', get_stylesheet_directory_uri() . '/assets/librerias/css/estilos.css', array(), filemtime( get_stylesheet_directory() . '/assets/librerias/css/estilos.css' ) );
}

add_action( 'wp_enqueue_scripts', 'miTema_enqueue_styles' );


function enqueue_font_awesome() {
    wp_enqueue_script('font-awesome', 'https://kit.fontawesome.com/ddbfa3118e.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_font_awesome');


//Encolamiento de archivo scripts.js con el js del sitio web 
function enqueue_custom_scripts() {
    wp_enqueue_script('custom-scripts', get_template_directory_uri() . '/assets/librerias/js/scripts.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');

//Encolamiento auto-type
function enqueue_auto_type_script() {
    // El script en línea para el efecto "auto-type"
    $auto_type_script = "
        document.addEventListener('DOMContentLoaded', function() {
            var typed = new Typed('.auto-type', {
                strings: ['Alejandro', 'Desarrollador', 'Diseñador'],
                typeSpeed: 70,
                backSpeed: 70,
                loop: true,
            });
        });
    ";

    // Registrar y encolar Typed.js desde un CDN
    wp_register_script('typed-js', 'https://cdn.jsdelivr.net/npm/typed.js@2.0.12', array(), '2.0.12', true);
    wp_enqueue_script('typed-js');

    // Añadir el script en línea después de encolar Typed.js
    wp_add_inline_script('typed-js', $auto_type_script);
}
add_action('wp_enqueue_scripts', 'enqueue_auto_type_script');


//TagCloud competencias

function enqueue_tagcloud_scripts() {
    // Enqueue TagCloud.js
    wp_enqueue_script('tagcloud-js', 'https://cdn.jsdelivr.net/npm/TagCloud@2.2.0/dist/TagCloud.min.js', array(), null, true);

    // Obtener la instancia global de la base de datos de WordPress
    global $wpdb;

    // Consulta SQL para obtener las competencias con id, nombre, descripción y ejemplo
    $competencias = $wpdb->get_results("SELECT id, nombre, descripcion, ejemplo FROM wp_tecnologias");

    // Array para almacenar las competencias con id, nombre, descripción y ejemplo
    $competencias_texts = array();
    foreach ($competencias as $competencia) {
        // Agregar cada competencia como un objeto con id, nombre, descripción y ejemplo
        $competencias_texts[] = array(
            'id' => $competencia->id,
            'nombre' => $competencia->nombre,
            'descripcion' => htmlspecialchars($competencia->descripcion, ENT_QUOTES, 'UTF-8'),
            'ejemplo' => htmlspecialchars($competencia->ejemplo, ENT_QUOTES, 'UTF-8')
        );
    }

    // Convertir el array de competencias a JSON para pasarlo a JavaScript
    $competencias_json = json_encode($competencias_texts);

    // Enqueue custom-tagcloud-js
    wp_enqueue_script('custom-tagcloud-js', get_template_directory_uri() . '/assets/librerias/js/custom-tagcloud.js', array('jquery', 'tagcloud-js', 'bootstrap-js'), null, true);

    // Inyectar el script con los textos obtenidos
    wp_add_inline_script('custom-tagcloud-js', "
        const Competencias = $competencias_json;

        // Ejemplo de uso: iterar sobre cada competencia con id, nombre, descripción y ejemplo
        Competencias.forEach(competencia => {
            console.log('ID:', competencia.id);
            console.log('Nombre:', competencia.nombre);
            console.log('Descripción:', competencia.descripcion);
            console.log('Ejemplo:', competencia.ejemplo);
        });

        var tagCloud = TagCloud('.Sphere', Competencias.map(comp => comp.nombre), {
            radius: 230,
            maxSpeed: 'fast',
            initSpeed: 'fast',
            direction: 135,
            keep: true
        });

        var color = '#FF4900';
        document.querySelector('.Sphere').style.color = color;

        // Agregar evento de clic para cada elemento de la TagCloud
        document.querySelectorAll('.Sphere span').forEach((element, index) => {
            element.addEventListener('click', function() {
                var competencia = Competencias[index];
                document.getElementById('modal-title').innerText = competencia.nombre;
                document.getElementById('modal-body').innerHTML = 
                    '<strong>Descripción:</strong> ' + competencia.descripcion + '<br>' +
                    '<strong>Ejemplo:</strong> ' + competencia.ejemplo;
                var myModal = new bootstrap.Modal(document.getElementById('modal'), {
                    keyboard: true
                });
                myModal.show();
            });
        });
    ");
}
add_action('wp_enqueue_scripts', 'enqueue_tagcloud_scripts');


function enqueue_custom_modal_script() {
    wp_enqueue_script('custom-modal-js', get_template_directory_uri() . '/assets/librerias/js/custom-modal.js', array('jquery'), null, true);
}

add_action('wp_enqueue_scripts', 'enqueue_custom_modal_script');
