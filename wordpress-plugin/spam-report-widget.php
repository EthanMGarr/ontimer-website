<?php
/**
 * Plugin Name: Spam Report Widget
 * Description: Embeds the National Spam Reporting Center widget via [spam_report_widget] shortcode.
 * Version: 1.0.0
 * Author: YouMail
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// ── Shortcode ─────────────────────────────────────────────────────────────────

function spam_report_widget_shortcode() {
    ob_start();
    ?>
    <div id="spam-report-root" style="max-width:720px;margin:0 auto;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;"></div>
    <script>
        (function() {
            if (document.getElementById('spam-widget-script')) return;
            var s = document.createElement('script');
            s.id  = 'spam-widget-script';
            s.src = 'https://www.ontimer.app/spam-widget.iife.js';
            s.async = true;
            document.body.appendChild(s);
        })();
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode( 'spam_report_widget', 'spam_report_widget_shortcode' );
