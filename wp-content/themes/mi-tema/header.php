<?php

/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package miTema
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">

    <!-- Enlace al archivo CSS de Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">


    <!-- Enlace al archivo CSS personalizado -->
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/style/style.css">


    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>



    <?php wp_body_open(); ?>

    <header id="masthead" class="site-header">
        
    <div class="f-section"></div>

    <nav>
        <div class="hamburger-menu">
            <i class="fa-solid fa-bars"></i>
        </div>
        <ul class="nav-links">
            <li class="link"><a href="#inicio">Home</a></li>
            <li id="pyc" class="link"><a href="#perfil-competencias">Perfil</a></li>
            <li id="Link2" class="link"><a href="#proyectos">Proyectos</a></li>
            <li id="Link3" class="link"><a href="#main-footer">Contacto</a></li>
        </ul>
    </nav>

    <section id="inicio" class="inicio-container">
        <div class="content">
            <h2>
                Hola, soy <br />
                <span class="auto-type"></span>
            </h2>
            <p>
                Descubre cómo transformo código en experiencias digitales impactantes
            </p>
            <button class="btn"><a href="#perfil-competencias">&#161;Vamos&#33;</a></button>
        </div>
    </section>
        
    </header><!-- #masthead -->

    <div id="page" class="site">
        <a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e('Skip to content', 'mi-tema'); ?></a>