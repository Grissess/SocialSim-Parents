/**
 * Bootstrap
 */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * CSS
 */
import './css/main.css';
import './css/page-3.css';
import './css/page-4.css';
import './css/page-5.css';
import './css/summary.css';

/**
 * JS
 */
import {start_game} from './js/pages/init';

$(window).on('load', function () {
    $('#error-msg').hide();
    return start_game();
});