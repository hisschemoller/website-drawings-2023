<?php
/**
 * Plugin Name: drawings-app
 * Plugin URI: https://github.com/hisschemoller/website-drawings
 * Description: Drawings on Openstreetmap.
 * Version: 1.0.0
 * Text Domain: drawings-app
 * Author: Wouter Hisschemöller
 * Author URI: https://www.hisschemoller.com
 */

/**
 * First register resources with init.
 */
function drawings_app_init() {
  wp_register_script("drawings_app_js", plugins_url("/dist/js/app.js", __FILE__), array(), "1.0", false);
  wp_register_script("drawings_vendors_js", plugins_url("/dist/js/chunk-vendors.js", __FILE__), array(), "1.0", false);
  wp_register_style("drawings_app_css", plugins_url("/dist/css/app.css", __FILE__), array(), "1.0", "all");
  wp_register_style("drawings_chunk_css", plugins_url("/dist/css/chunk-vendors.css", __FILE__), array(), "1.0", "all");
}

add_action( 'init', 'drawings_app_init' );

/**
 * Function for the short code that call this app.
 */
function drawings_app() {
  wp_enqueue_script("drawings_app_js", '1.0', true);
  wp_enqueue_script("drawings_vendors_js", '1.0', true);
  wp_enqueue_style("drawings_app_css");
  wp_enqueue_style("drawings_chunk_css");
  return '<div id="drawings-app"></div>';
}

add_shortcode('drawings_app', 'drawings_app');
?>
