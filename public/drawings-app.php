<?php
/**
 * Plugin Name: drawings-app
 * Plugin URI: https://github.com/hisschemoller/website-drawings
 * Description: Drawings on Openstreetmap.
 * Version: 2.0.0
 * Text Domain: drawings-app
 * Author: Wouter Hisschemöller
 * Author URI: https://www.hisschemoller.com
 */

/**
 * First register resources with init.
 */
function drawings_app_init() {
  wp_register_script("drawings_app_js", plugins_url("/dist/js/bundle.js", __FILE__), array(), "1.0", false);
  wp_register_style("drawings_app_css", plugins_url("/dist/css/style.css", __FILE__), array(), "1.0", "all");
  wp_register_style("drawings_splide_css", plugins_url("/dist/css/splide.min.css", __FILE__), array(), "1.0", "all");
}

add_action( 'init', 'drawings_app_init' );

/**
 * Function for the short code that call this app.
 */
function drawings_app() {
  wp_enqueue_script("drawings_app_js", '1.0', true);
  wp_enqueue_style("drawings_app_css");
  wp_enqueue_style("drawings_splide_css");
  return '<div id="drawings-app">
    <div class="container"> 
      <div id="map" class="map"></div>
        <div id="popup" class="ol-popup">
          <a href="#" id="popup-closer" class="ol-popup-closer"></a>
          <div id="popup-content"></div>
        </div>
        <div id="thumbnail-carousel" class="splide" aria-label="Drawings overview">
          <div class="splide__track">
            <ul class="splide__list"></ul>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay">
      <div class="overlay-close"></div>
      <div id="image-slider" class="splide" role="group" aria-label="Drawings">
        <div class="splide__track">
          <ul class="splide__list"></ul>
        </div>
      </div>
    </div>
  </div>';
}

add_shortcode('drawings_app', 'drawings_app');
?>
