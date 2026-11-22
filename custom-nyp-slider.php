<?php
/**
 * Plugin Name: Custom NYP Slider
 * Plugin URI: https://condixia.com
 * Author: Mahim Zaman (Condixia)
 * Author URI: https://mahimzaman.com
 * Description: Adds a slider for WooCommerce Name Your Price products.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
	exit;
}

class Custom_NYP_Slider {

	public function __construct() {
		add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
	}

	public function enqueue_assets() {
		if (!function_exists('is_product') || !is_product()) {
			return;
		}

		wp_enqueue_style(
			'custom-nyp-slider-style',
			plugin_dir_url(__FILE__) . 'assets/style.css',
			array(),
			'1.0.0'
		);

		wp_enqueue_script(
			'custom-nyp-slider-script',
			plugin_dir_url(__FILE__) . 'assets/script.js',
			array('jquery'),
			'1.0.0',
			true
		);
	}
}

new Custom_NYP_Slider();