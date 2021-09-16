import { start_instruction, data as google_data } from './instruction';
import { get_user_data, get_score, recompute_score } from '../components/user';
import { show_error_message, check_existing_email, get_new_user_id} from '../components/utils';
import { Query_update_user } from '../components/Query';

// Register page
export function start_register()
{
    console.log('register page');
    // Set current user id
    $('#user-id').html("USER #" + get_new_user_id().split('_')[1]);
    set_button_events();
}

export function set_button_events()
{
    let back_button = $('#back-btn');
    let optout_button = $('#opt-btn');
    let register_button = $('#register-btn');

    back_button.on('click', (e) => {
        $('#page-3').hide();
        $('#page-2').show();
        start_instruction();
    });

    $('.privacy-button').click( function () {
        $('.privacy-button').removeClass('select');
        $(this).addClass('select');
    });

    optout_button.on('click', () => {
        $('#page-3').hide();
        $('#page-7').show();
    });

    $('#done-btn').on('click', () => {
        $('#page-7').hide();
        $('#page-3').show();
    });

    register_button.on('click', (e) => {

        let email = $('#register-email').val();
        let password = $('#register-password').val();
        let firstname = $('#firstname').val();
        let lastname = $('#lastname').val();
        let month = $('#month').val();
        let date = $('#date').val();
        let year = $('#year').val();
        let streetnum = $('#street-num').val();
        let streetname = $('#street-name').val();
        let city = $('#city').val();
        let state = $('#state').val();
        let country = $('#country').val();
        let zipcode = $('#zipcode').val();
        let gender = $('#gender').val();
        let children = $('#child').val();
        let privacy = $('.privacy-button.select').attr('id');

        if (is_empty(email) || is_empty(password) || check_existing_email(email)) {
            show_error_message('This Email is already exist or please put new email and password');
        } else {

            // Calculate score here
            let user = get_user_data();

            // Assign all value
            if (!is_empty(email)) { user.email.value = email }
            if (!is_empty(password)) { user.password.value = password }
            if (!is_empty(firstname)) { user.firstname.value = firstname }
            if (!is_empty(lastname)) { user.lastname.value = lastname }
            if (!is_empty(month)) { user.month.value = month }
            if (!is_empty(date)) { user.date.value = date }
            if (!is_empty(year)) { user.year.value = year }
            if (!is_empty(streetnum)) { user.streetnum.value = streetnum }
            if (!is_empty(streetname)) { user.streetname.value = streetname }
            if (!is_empty(city)) { user.city.value = city }
            if (!is_empty(state)) { user.state.value = state }
            if (!is_empty(country)) { user.country.value = country }
            if (!is_empty(zipcode)) { user.zipcode.value = zipcode }
            if (!is_empty(gender)) { user.gender.value = gender }
            if (!is_empty(children)) { user.children.value = children }
            user.privacy.value = privacy;



            // Register user and update spreadsheets
            Query_update_user(user);

            // Calculate score
            recompute_score();

            $('#page-3').hide();
            $('#page-2').show();

            start_instruction();
            // disable
            $('#signup-btn').hide();
            $('#no-account').hide();
        }
    });
}

function is_empty(str)
{
    return str === null || str.match(/^ *$/) !== null;
}
