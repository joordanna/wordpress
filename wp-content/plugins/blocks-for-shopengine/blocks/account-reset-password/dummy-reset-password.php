<?php

defined('ABSPATH') || exit;

do_action( 'woocommerce_before_reset_password_form' );
?>

<form method="post" class="woocommerce-ResetPassword lost_reset_password">

    <p class="woocommerce-form-row woocommerce-form-row--first form-row form-row-first">
        <label for="password_1"><?php esc_html_e( 'New password', 'shopengine-gutenberg-addon' ); ?>&nbsp;<span class="required">*</span></label>
        <input type="password" class="woocommerce-Input woocommerce-Input--text input-text" name="password_1" id="password_1" autocomplete="new-password" />
    </p>
    <p class="woocommerce-form-row woocommerce-form-row--last form-row form-row-last">
        <label for="password_2"><?php esc_html_e( 'Confirm Password', 'shopengine-gutenberg-addon' ); ?>&nbsp;<span class="required">*</span></label>
        <input type="password" class="woocommerce-Input woocommerce-Input--text input-text" name="password_2" id="password_2" autocomplete="new-password" />
    </p>

    <input type="hidden" name="reset_key" value="<?php echo esc_attr( $args['key'] ); ?>" />
    <input type="hidden" name="reset_login" value="<?php echo esc_attr( $args['login'] ); ?>" />

    <div class="clear"></div>

    <?php do_action( 'woocommerce_resetpassword_form' ); ?>

    <p class="woocommerce-form-row form-row">
        <input type="hidden" name="wc_reset_password" value="true" />
        <button type="submit" class="woocommerce-Button button" value="<?php esc_attr_e( 'Save', 'shopengine-gutenberg-addon' ); ?>"><?php esc_html_e( 'Save', 'shopengine-gutenberg-addon' ); ?></button>
    </p>

    <?php wp_nonce_field( 'reset_password', 'woocommerce-reset-password-nonce' ); ?>

</form>
<?php
do_action( 'woocommerce_after_reset_password_form' );