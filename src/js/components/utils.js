import {data as google_data} from '../pages/instruction';
import {get_all_post} from '../pages/init';

export function show_error_message(message)
{
    $('#error-msg').html(message);
    $('#error-msg').hide();
    $('#error-msg').show();
    return;
}

export function hide_error_message()
{
    $('#error-msg').hide();
    return;
}

// Check existing email for register
export function check_existing_email(email)
{
    for (let i = 0; i < google_data.length; ++i) {
        if (email === google_data[i].email) {
            return true;
        }
    }

    return false;
}

export function get_new_user_id()
{
    let current_id = parseInt(google_data[google_data.length - 1].id.split('_')[1]) + 1;
    return "user_" + current_id;
}

export function add_to_current_data(new_data)
{
    google_data.push(new_data);
    return google_data;
}

export function get_current_user(email) {
    for (let i = 0 ; i < google_data.length; ++i) {
        if (google_data[i].email === email) {
            return google_data[i];
        }
    }

    return undefined;
}

export function get_all_post_like()
{
    var like = 0;
    let all_post = get_all_post();
    for (var key in all_post) {
        let post = all_post[key][0];
        if (post.photo.like) {
            like += post.photo.like;
        }
    }

    return like;
}
