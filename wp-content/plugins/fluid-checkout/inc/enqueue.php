<?php
defined( 'ABSPATH' ) || exit;

/**
 * Enqueue scripts and styles
 */
class FluidCheckout_Enqueue extends FluidCheckout {

	/**
	 * Holds the flag to determine if the settings inline script has been output.
	 */
	private static $has_output_settings_inline_script = false;




	/**
	 * __construct function.
	 */
	public function __construct() {
		$this->hooks();
	}



	/**
	 * Initialize hooks.
	 */
	public function hooks() {
		// Replace WooCommerce scripts, need to run before WooCommerce registers and enqueues its scripts, priority has to be less than 10
		add_action( 'wp_enqueue_scripts', array( $this, 'maybe_replace_woocommerce_scripts' ), 5 );

		// Register assets
		add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ), 5 );
		add_action( 'admin_enqueue_scripts', array( $this, 'register_assets' ), 5 );

		// Enqueue assets
		add_action( 'wp_head', array( $this, 'maybe_output_settings_inline_script' ), 10 );
		add_action( 'wp_enqueue_scripts', array( $this, 'maybe_enqueue_custom_fonts' ), 1 );
		add_action( 'wp_enqueue_scripts', array( $this, 'maybe_enqueue_assets' ), 10 );
		add_action( 'wp_enqueue_scripts', array( $this, 'maybe_enqueue_assets_edit_address' ), 10 );
		add_action( 'wp_enqueue_scripts', array( $this, 'maybe_enqueue_assets_add_payment_method' ), 10 );

		// Theme and Plugin Compatibility
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_theme_compat_styles' ), 10 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_plugin_compat_styles' ), 10 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_theme_compat_edit_address_styles' ), 10 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_plugin_compat_edit_address_styles' ), 10 );
	}



	/**
	 * Undo hooks.
	 */
	public function undo_hooks() {
		// Replace WooCommerce scripts, need to run before WooCommerce registers and enqueues its scripts, priority has to be less than 10
		remove_action( 'wp_enqueue_scripts', array( $this, 'maybe_replace_woocommerce_scripts' ), 5 );

		// Register assets
		remove_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ), 5 );

		// Enqueue assets
		remove_action( 'wp_head', array( $this, 'maybe_output_settings_inline_script' ), 10 );
		remove_action( 'wp_enqueue_scripts', array( $this, 'maybe_enqueue_custom_fonts' ), 1 );
		remove_action( 'wp_enqueue_scripts', array( $this, 'maybe_enqueue_assets' ), 10 );
		remove_action( 'wp_enqueue_scripts', array( $this, 'maybe_enqueue_assets_edit_address' ), 10 );
		remove_action( 'wp_enqueue_scripts', array( $this, 'maybe_enqueue_assets_add_payment_method' ), 10 );

		// Theme and Plugin Compatibility
		// Should not remove theme and plugin compatibility hooks. Keep this comment here for future reference.
	}



	/**
	 * Remove replaced WooCommerce scripts.
	 */
	public function deregister_woocommerce_scripts() {
		wp_deregister_script( 'woocommerce' );
		wp_deregister_script( 'wc-country-select' );
		wp_deregister_script( 'wc-address-i18n' );
		wp_deregister_script( 'wc-checkout' );

		// Select2 / SelectWoo, will be replaced with TomSelect
		if ( 'yes' === FluidCheckout_Settings::instance()->get_option( 'fc_use_enhanced_select_components' ) ) {
			wp_deregister_script( 'selectWoo' );
			wp_deregister_script( 'select2' );
			wp_deregister_style( 'select2' );
		}
	}

	/**
	 * Pre-register WooCommerce scripts with modified version in order to replace them.
	 * This function is intended to be used with hook `wp_enqueue_scripts` at priority lower than `10`,
	 * which is the priority used by WooCommerce to register its scripts.
	 */
	public function pre_register_woocommerce_scripts() {
		// Deregsiter WooCommerce scripts if already registered
		$this->deregister_woocommerce_scripts();

		// Register WooCommerce scripts with modified version
		wp_register_script( 'woocommerce', self::$directory_url . 'js/woocommerce'. self::$asset_version . '.js', array( 'jquery', 'jquery-blockui', 'js-cookie' ), NULL, true );
		wp_register_script( 'wc-country-select', self::$directory_url . 'js/country-select'. self::$asset_version . '.js', array( 'jquery', 'fc-utils' ), NULL, true );
		wp_register_script( 'wc-address-i18n', self::$directory_url . 'js/address-i18n'. self::$asset_version . '.js', array( 'jquery', 'wc-country-select' ), NULL, true );
		wp_register_script( 'wc-checkout', self::$directory_url . 'js/checkout'. self::$asset_version . '.js', array( 'jquery', 'woocommerce', 'wc-country-select', 'wc-address-i18n', 'fc-utils' ), NULL, true );

		// Select2 / SelectWoo, replaced with TomSelect but keeping the same handle and dependencies
		// because many plugins and themes depend on `select2` or `selectWoo` scripts.
		if ( 'yes' === FluidCheckout_Settings::instance()->get_option( 'fc_use_enhanced_select_components' ) ) {
			wp_register_script( 'selectWoo', self::$directory_url . 'js/select2-empty'. self::$asset_version . '.js', array( 'jquery' ), NULL, true );
			wp_register_script( 'select2', self::$directory_url . 'js/select2-empty'. self::$asset_version . '.js', array( 'jquery' ), NULL, true );
			wp_register_style( 'select2', self::$directory_url . 'css/select2-empty'. self::$asset_version . '.css', array(), NULL );
		}
	}

	/**
	 * Replace WooCommerce scripts with modified version.
	 */
	public function maybe_replace_woocommerce_scripts() {
		// Bail if not on checkout page or address edit page
		if ( is_admin() || ! function_exists( 'is_checkout' ) || ( ! is_checkout() && ! is_wc_endpoint_url( 'edit-address' ) ) ) { return; }

		$this->pre_register_woocommerce_scripts();
	}



	/**
	 * Returns the JS settings.
	 *
	 * @return  array  JS settings.
	 */
	public function get_js_settings() {
		// Define settings
		$settings = array(
			'ver'                            => self::$version,
			'assetsVersion'                  => self::$asset_version,
			'cookiePath'                     => parse_url( FluidCheckout_Settings::instance()->get_option( 'siteurl' ), PHP_URL_PATH ),
			'cookieDomain'                   => parse_url( FluidCheckout_Settings::instance()->get_option( 'siteurl' ), PHP_URL_HOST ),
			'jsPath'                         => self::$directory_url . 'js/',
			'jsLibPath'                      => self::$directory_url . 'js/lib/',
			'cssPath'                        => self::$directory_url . 'css/',
			'ajaxUrl'                        => admin_url( 'admin-ajax.php' ),
			'wcAjaxUrl'                      => WC_AJAX::get_endpoint( '%%endpoint%%' ),
			'debugMode'                      => get_option( 'fc_debug_mode', 'no' ),
			'use_enhanced_select'            => FluidCheckout_Settings::instance()->get_option( 'fc_use_enhanced_select_components' ),
			'utils'                          => array(),
			'flyoutBlock'                    => array(
				'openAnimationClass'         => 'fade-in-up',
				'closeAnimationClass'        => 'fade-out-down',
			),
			'collapsibleBlock'               => array(),
			'stickyStates'                   => array(),
			'checkoutUpdateBeforeUnload'     => apply_filters( 'fc_checkout_update_before_unload', 'yes' ),
			'checkoutUpdateOnVisibilityChange' => apply_filters( 'fc_checkout_update_on_visibility_change', 'yes' ),
			'checkoutUpdateFieldsSelector'   => join( ',', apply_filters( 'fc_checkout_update_fields_selectors', array(
				'.address-field input.input-text',
				'.update_totals_on_change input.input-text',
			) ) ),
		);

		// Filter settings
		$settings = apply_filters( 'fc_js_settings', $settings );

		return $settings;
	}

	/**
	 * Register assets.
	 */
	public function register_assets() {
		// Maybe load RTL file
		$rtl_suffix = is_rtl() ? '-rtl' : '';

		// Register library scripts
		wp_register_script( 'fc-polyfill-inert', self::$directory_url . 'js/lib/inert'. self::$asset_version . '.js', array(), NULL );
		wp_register_script( 'fc-animate-helper', self::$directory_url . 'js/lib/animate-helper'. self::$asset_version . '.js', array(), NULL );
		wp_register_script( 'fc-collapsible-block', self::$directory_url . 'js/lib/collapsible-block'. self::$asset_version . '.js', array(), NULL );
		wp_add_inline_script( 'fc-collapsible-block', 'window.addEventListener("load",function(){CollapsibleBlock.init(fcSettings.collapsibleBlock);})' );
		wp_register_script( 'fc-flyout-block', self::$directory_url . 'js/lib/flyout-block'. self::$asset_version . '.js', array( 'fc-polyfill-inert', 'fc-animate-helper' ), NULL );
		wp_add_inline_script( 'fc-flyout-block', 'window.addEventListener("load",function(){FlyoutBlock.init(fcSettings.flyoutBlock);})' );
		wp_register_script( 'fc-sticky-states', self::$directory_url . 'js/lib/sticky-states'. self::$asset_version . '.js', array(), NULL );
		wp_add_inline_script( 'fc-sticky-states', 'window.addEventListener("load",function(){StickyStates.init(fcSettings.stickyStates);})' );

		// Enhanced select
		wp_register_script( 'tomselect', self::$directory_url . 'js/tom-select.complete'. self::$asset_version . '.js', array(), NULL );
		wp_register_script( 'fc-enhanced-select', self::$directory_url . 'js/fc-enhanced-select'. self::$asset_version . '.js', array( 'tomselect' ), NULL );
		wp_add_inline_script( 'fc-enhanced-select', 'window.addEventListener("load",function(){FCEnhancedSelect.init();})' );

		// Register script utilities
		wp_register_script( 'fc-utils', self::$directory_url . 'js/fc-utils'. self::$asset_version . '.js', array(), NULL );

		// Register custom fonts
		wp_register_style( 'fc-fonts', self::$directory_url . 'css/fonts' . self::$asset_version . '.css', array(), null );

		// Register styles
		wp_register_style( 'fc-edit-address-page', self::$directory_url . 'css/edit-address-page' . $rtl_suffix . self::$asset_version . '.css', array(), null );
		wp_register_style( 'fc-add-payment-method-page', self::$directory_url . 'css/add-payment-method-page' . $rtl_suffix . self::$asset_version . '.css', array(), null );
		wp_register_style( 'fc-flyout-block', self::$directory_url . 'css/flyout-block' . $rtl_suffix . self::$asset_version . '.css', array(), null );
		wp_register_style( 'fc-sticky-states', self::$directory_url . 'css/sticky-states' . $rtl_suffix . self::$asset_version . '.css', array(), null );

		// Enhanced select
		wp_register_style( 'tomselect', self::$directory_url . 'css/tom-select' . $rtl_suffix . self::$asset_version . '.css', array(), null );
	}



	/**
	 * Enqueue Require Bundle.
	 * @deprecated  Marked to be removed in version 3.0.0.
	 */
	public function enqueue_require_bundle() {
		// Add deprecation notice
		wc_doing_it_wrong( __FUNCTION__, 'Dependency on RequireBundle has been removed. This function will be removed in version 3.0.0.', '2.4.0' );
	}



	/**
	 * Output JS settings object.
	 */
	public function output_settings_inline_script() {
		// Bail if already output settings object
		if ( true === self::$has_output_settings_inline_script ) { return; }

		// Output settings object
		echo '<script type="text/javascript">var fcSettings = ' . wp_json_encode( $this->get_js_settings() ) . ';</script>';
	}

	/**
	 * Output JS settings object.
	 */
	public function maybe_output_settings_inline_script() {
		// Bail if not on checkout, address edit or add payment method pages
		if ( is_admin() || ! ( is_checkout() || ( is_account_page() && ( is_wc_endpoint_url( 'edit-address' ) || is_wc_endpoint_url( 'add-payment-method' ) )  ) ) || is_order_received_page() || is_checkout_pay_page() ) { return; }

		// Output settings object
		$this->output_settings_inline_script();
	}



	/**
	 * Enqueue assets.
	 */
	public function enqueue_assets() {
		// Scripts
		wp_enqueue_script( 'fc-utils' );
		wp_enqueue_script( 'fc-polyfill-inert' );
		wp_enqueue_script( 'fc-animate-helper' );
		wp_enqueue_script( 'fc-collapsible-block' );
		wp_enqueue_script( 'fc-flyout-block' );
		wp_enqueue_script( 'fc-sticky-states' );

		// Styles
		wp_enqueue_style( 'fc-flyout-block' );
		wp_enqueue_style( 'fc-sticky-states' );

		// Enhanced select
		if ( 'yes' === FluidCheckout_Settings::instance()->get_option( 'fc_use_enhanced_select_components' ) ) {
			wp_enqueue_script( 'tomselect' );
			wp_enqueue_script( 'fc-enhanced-select' );
			wp_enqueue_style( 'tomselect' );
		}
	}

	/**
	 * Dequeue enhanced select assets.
	 */
	public function dequeue_enhanced_select_assets() {
		wp_dequeue_script( 'tomselect' );
		wp_dequeue_script( 'fc-enhanced-select' );
		wp_dequeue_style( 'tomselect' );
	}

	/**
	 * Maybe enqueue assets.
	 */
	public function maybe_enqueue_assets() {
		// Bail if not on checkout page
		if ( is_admin() || ! is_checkout() || is_order_received_page() || is_checkout_pay_page() ) { return; }

		// Enqueue assets
		$this->enqueue_assets();
	}



	/**
	 * Maybe enqueue custom fonts.
	 */
	function maybe_enqueue_custom_fonts() {
		// Bail if not on checkout page
		if ( is_admin() || ! is_checkout() || is_order_received_page() || is_checkout_pay_page() ) { return; }

		$this->enqueue_custom_fonts();
	}

	/**
	 * Enqueue custom fonts.
	 */
	function enqueue_custom_fonts() {
		wp_enqueue_style( 'fc-fonts' );
	}



	/**
	 * Enqueue assets for the edit address page.
	 */
	function enqueue_assets_edit_address() {
		wp_enqueue_style( 'fc-edit-address-page' );
	}

	/**
	 * Maybe enqueue assets for the edit address page.
	 */
	function maybe_enqueue_assets_edit_address() {
		// Bail if not on account address edit page
		if ( is_admin() || ! function_exists( 'is_account_page' ) || ! is_account_page() || ! is_wc_endpoint_url( 'edit-address' ) ) { return; }

		// Enqueue assets
		$this->enqueue_custom_fonts();
		$this->enqueue_assets();

		// Enqueue assets for the edit address page
		$this->enqueue_assets_edit_address();
	}



	/**
	 * Enqueue assets for the add payment method page.
	 */
	function enqueue_assets_add_payment_method() {
		wp_enqueue_style( 'fc-add-payment-method-page' );
	}

	/**
	 * Maybe enqueue assets for the add payment method page.
	 */
	function maybe_enqueue_assets_add_payment_method() {
		// Bail if not on account payment methods page
		if ( is_admin() || ! function_exists( 'is_account_page' ) || ! is_account_page() || ! is_wc_endpoint_url( 'add-payment-method' ) ) { return; }

		// Enqueue assets
		$this->enqueue_custom_fonts();
		$this->enqueue_assets();

		// Enqueue assets for the add payment method page
		$this->enqueue_assets_add_payment_method();
	}



	/**
	 * Enqueue themes compatibility styles.
	 */
	public function enqueue_theme_compat_styles() {
		// Bail if not on checkout, address edit or add payment method pages
		if ( is_admin() || ! ( is_checkout() || ( is_account_page() && ( is_wc_endpoint_url( 'edit-address' ) || is_wc_endpoint_url( 'add-payment-method' ) )  ) ) || is_order_received_page() || is_checkout_pay_page() ) { return; }

		// Get currently active theme and child theme
		$theme_slugs = array( get_template(), get_stylesheet() );

		foreach ( $theme_slugs as $theme_slug ) {
			// Maybe skip compat file
			if ( apply_filters( 'fc_enable_compat_theme_style_' . $theme_slug, true ) === false ) { continue; }

			// Maybe load RTL file
			$rtl_suffix = is_rtl() ? '-rtl' : '';

			// Get current theme's compatibility style file name
			$theme_compat_file_path = 'css/compat/themes/compat-' . $theme_slug . $rtl_suffix . self::$asset_version . '.css';

			// Revert to default compat style file if RTL file does not exist
			if ( is_rtl() && ! file_exists( self::$directory_path . $theme_compat_file_path ) ) {
				$theme_compat_file_path = 'css/compat/themes/compat-' . $theme_slug . self::$asset_version . '.css';
			}

			// Maybe load theme's compatibility file
			if ( file_exists( self::$directory_path . $theme_compat_file_path ) ) {
				wp_enqueue_style( 'fc-theme-compat-'.$theme_slug, self::$directory_url . $theme_compat_file_path, array(), null );
			}
		}
	}

	/**
	 * Enqueue plugins compatibility styles.
	 */
	public function enqueue_plugin_compat_styles() {
		// Bail if not on checkout, address edit or add payment method pages
		if ( is_admin() || ! ( is_checkout() || ( is_account_page() && ( is_wc_endpoint_url( 'edit-address' ) || is_wc_endpoint_url( 'add-payment-method' ) )  ) ) || is_order_received_page() || is_checkout_pay_page() ) { return; }

		// Get all plugins installed
		$plugins_installed = get_plugins();

		foreach ( $plugins_installed as $plugin_file => $plugin_meta ) {
			// Skip plugins not activated
			if ( ! is_plugin_active( $plugin_file ) ) { continue; }

			// Get plugin slug
			$plugin_slug = strpos( $plugin_file, '/' ) !== false ? explode( '/', $plugin_file )[0] : explode( '.', $plugin_file )[0];

			// Maybe skip compat file
			if ( apply_filters( 'fc_enable_compat_plugin_style_' . $plugin_slug, true ) === false ) { continue; }

			// Maybe load RTL file
			$rtl_suffix = is_rtl() ? '-rtl' : '';

			// Get current plugin's compatibility style file name
			$plugin_compat_file_path = 'css/compat/plugins/compat-' . $plugin_slug . $rtl_suffix . self::$asset_version . '.css';

			// Revert to default compat style file if RTL file does not exist
			if ( is_rtl() && ! file_exists( self::$directory_path . $plugin_compat_file_path ) ) {
				$plugin_compat_file_path = 'css/compat/plugins/compat-' . $plugin_slug . self::$asset_version . '.css';
			}

			// Maybe load plugin's compatibility file
			if ( file_exists( self::$directory_path . $plugin_compat_file_path ) ) {
				wp_enqueue_style( 'fc-plugin-compat-'.$plugin_slug, self::$directory_url . $plugin_compat_file_path, array(), null );
			}
		}
	}



	/**
	 * Enqueue themes compatibility styles for the address edit page.
	 */
	public function enqueue_theme_compat_edit_address_styles() {
		// Bail if not on account address edit page
		if ( is_admin() || ! function_exists( 'is_account_page' ) || ! is_account_page() || ! is_wc_endpoint_url( 'edit-address' ) ) { return; }

		// Get currently active theme and child theme
		$theme_slugs = array( get_template(), get_stylesheet() );

		foreach ( $theme_slugs as $theme_slug ) {
			// Maybe skip compat file
			if ( apply_filters( 'fc_enable_compat_theme_edit_address_style_' . $theme_slug, true ) === false ) { continue; }

			// Maybe load RTL file
			$rtl_suffix = is_rtl() ? '-rtl' : '';

			// Get current theme's compatibility style file name
			$theme_compat_file_path = 'css/compat/themes/compat-edit-address-' . $theme_slug . $rtl_suffix . self::$asset_version . '.css';

			// Revert to default compat style file if RTL file does not exist
			if ( is_rtl() && ! file_exists( self::$directory_path . $theme_compat_file_path ) ) {
				$theme_compat_file_path = 'css/compat/themes/compat-edit-address-' . $theme_slug . self::$asset_version . '.css';
			}

			// Maybe load theme's compatibility file
			if ( file_exists( self::$directory_path . $theme_compat_file_path ) ) {
				wp_enqueue_style( 'fc-theme-compat-edit-address-'.$theme_slug, self::$directory_url . $theme_compat_file_path, array(), null );
			}
		}
	}



	/**
	 * Enqueue plugins compatibility styles for the address edit page.
	 */
	public function enqueue_plugin_compat_edit_address_styles() {
		// Bail if not on account address edit page
		if ( is_admin() || ! function_exists( 'is_account_page' ) || ! is_account_page() || ! is_wc_endpoint_url( 'edit-address' ) ) { return; }

		// Get all plugins installed
		$plugins_installed = get_plugins();

		foreach ( $plugins_installed as $plugin_file => $plugin_meta ) {
			// Skip plugins not activated
			if ( ! is_plugin_active( $plugin_file ) ) { continue; }

			// Get plugin slug
			$plugin_slug = strpos( $plugin_file, '/' ) !== false ? explode( '/', $plugin_file )[0] : explode( '.', $plugin_file )[0];

			// Maybe skip compat file
			if ( apply_filters( 'fc_enable_compat_plugin_edit_address_style_' . $plugin_slug, true ) === false ) { continue; }

			// Maybe load RTL file
			$rtl_suffix = is_rtl() ? '-rtl' : '';

			// Get current plugin's compatibility style file name
			$plugin_compat_file_path = 'css/compat/plugins/compat-edit-address-' . $plugin_slug . $rtl_suffix . self::$asset_version . '.css';

			// Revert to default compat style file if RTL file does not exist
			if ( is_rtl() && ! file_exists( self::$directory_path . $plugin_compat_file_path ) ) {
				$plugin_compat_file_path = 'css/compat/plugins/compat-edit-address-' . $plugin_slug . self::$asset_version . '.css';
			}

			// Maybe load plugin's compatibility file
			if ( file_exists( self::$directory_path . $plugin_compat_file_path ) ) {
				wp_enqueue_style( 'fc-plugin-compat-edit-address-'.$plugin_slug, self::$directory_url . $plugin_compat_file_path, array(), null );
			}
		}
	}

}

FluidCheckout_Enqueue::instance();
