import { start_register } from './register';
import { start_day } from './game';
import { get_user_data, get_score } from '../components/user';
import { show_error_message, get_current_user} from '../components/utils';
import {Query_spread_sheets} from '../components/Query';

export var data = undefined;
export var current_user_data = undefined;

export function start_instruction()
{
    data = Query_spread_sheets();

    console.log(get_score());

    // Hide error message
    $('#error-msg').hide();
    initialize_button_events();
}

export function initialize_button_events()
{
    
    let loginBtn = $('#login-btn');
    let signupBtn = $('#signup-btn');

    // Login button events
    loginBtn.off().on('click', (e) => {
        e.stopPropagation();

        let email = $('#login-email').val();
        let password = $('#login-password').val();

        if (check_login_user(email, password)) {
            // set current user id
            current_user_data = get_current_user(email);
            start_day(1, 0); // start day index 1, post number 1
        } else {
            show_error_message('User not found in our system. Please signup or refresh this page');
        }

    });

    // Login button events
    signupBtn.on('click', (e) => {
        e.stopPropagation();

        // Show register page
        $('#page-2').hide();
        $('#page-3').show();
        start_register();
    });
}

function check_login_user(email, password)
{
    for (let i = 0; i < data.length; ++i) {
        if (email === data[i].email && password === data[i].password) {
            return true;
        }
    }

    return false;
}