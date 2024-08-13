<?php

/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package miTema
 */

get_header();
?>

<main id="primary" class="site-main">

<div class="container">
    <section id="perfil-competencias" class="pyc-section">
        <h2>Perfil y competencias</h2>

        <div class="pyc container">
            <div class="row">
                <div class="perfil col-12 col-lg-6 order-lg-2">
                    <p>¡Hola! Soy Alejandro, apasionado del desarrollo web y el diseño frontend. Siempre estoy explorando nuevas ideas y tendencias. Me encanta crear sitios increíbles.</p>
                    <button class="btn"><a href="http://localhost/Portafolio/wp-content/uploads/2024/06/CV-ALEJANDRO-MARQUEZ-FRONTEND.pdf" target="_blank">Visualizar CV</a></button>
                </div>
                <div class="habilidades col-12 col-lg-6 order-lg-1">
                    <span class="Sphere"></span>

                    <!-- Modal -->
                    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modal-title"></h5>
                                </div>
                                <div class="modal-body" id="modal-body"></div>
                                <div class="modal-footer">
                                    <button type="button" class="btn" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="proyectos" class="proyectos-container">
    <h2>Proyectos</h2>

    <div class="wrapper">
        <div class="proy-container">
            <?php
            global $wpdb;

            $table_name = $wpdb->prefix . 'wp_proyectos';

            $query = "SELECT * FROM wp_proyectos";

            $proyectos = $wpdb->get_results($query);

            if ($proyectos) :
                $count = 1;
                foreach ($proyectos as $proyecto) :
                    $image_url = $proyecto->imagen;
            ?>
                    <input type="radio" name="slide" id="c<?php echo $count; ?>" class="gallery-input" <?php echo $count === 1 ? 'checked' : ''; ?>>
                    <label for="c<?php echo $count; ?>" class="card" style="background-image: url('<?php echo $image_url; ?>');">
                        <div class="row">
                            <div class="icon"><?php echo $count; ?></div>
                            <div class="description">
                                <h4 class="project-title" data-image="<?php echo $image_url; ?>" data-description="<?php echo $proyecto->descripcion; ?>" data-icons="<?php echo $proyecto->iconos; ?>">
                                    <?php echo $proyecto->nombre; ?>
                                </h4>
                            </div>
                        </div>
                    </label>
                <?php
                    $count++;
                endforeach;
            else : ?>
                <p>No hay proyectos para mostrar.</p>
            <?php endif; ?>
        </div>
    </div>

    <!-- Nueva Modal -->
    <div class="modal fade" id="projectModal" tabindex="-1" aria-labelledby="projectModalLabel" aria-hidden="true">
        <div class="modal-dialog project-modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content project-modal-content">
                <div class="modal-body project-modal-body">
                    <div class="project-modal-image-container">
                        <img id="projectModalImage" src="" alt="Project Image" class="img-fluid">
                    </div>
                    <div class="project-modal-overlay-content">
                        <div class="project-modal-title" id="projectModalTitle"></div>
                        <p class="project-modal-text" id="projectModalDescription"></p>
                        <div class="project-modal-icons" id="projectModalIcons"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

    </div>

    <?php
    while (have_posts()) :
        the_post();

        get_template_part('template-parts/content', 'page');

    // If comments are open or we have at least one comment, load up the comment template.
    // if ( comments_open() || get_comments_number() ) :
    // 	comments_template();
    // endif;

    endwhile; // End of the loop.
    ?>

</main><!-- #main -->

<?php
get_footer();
