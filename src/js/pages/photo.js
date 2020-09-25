import {show_error_message, hide_error_message} from '../components/utils'
import {get_current_post, get_maximum_photo, set_maximum_photo, get_current_day, get_current_post_num, start_day} from './game';

export function start_photo_selection(photos)
{
    set_photos(photos);
    return;
}

function set_photos(photo_data)
{

    $('#photo-post-button').hide();

    let photos = $('#photos');
    let reasons = $('#reasons');
    // Reset all photos
    photos.empty();
    // Set all photos
    for (let i = 0; i < photo_data.length; ++i) {
        let photo = photo_data[i];

        let image_container = $('<div/>', { class: 'photo-container' });

        let image = $('<img/>', {
            class: 'post-photo',
            src: photo.path,
            alt: ''
        });

        let photo_number = $('<div/>').css({ 
            position: 'absolute',
            top: '5px',
            left: '5px',
            'z-index': '1000',
            color: '#fff',
            'text-shadow': '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
        }).html('#' + (i + 1));

        image_container.append(image).append(photo_number);
        photos.append(image_container);

        image_container.on('click', () => {

            if (image_container.hasClass('select')) {

                image_container.removeClass('select');
                image_container.css({ border: 'none' });
                $('#photo-input-' + i).remove();
                // Reduce maximum photo for this post
                set_maximum_photo(get_maximum_photo() - 1);
                hide_error_message();

                if (get_maximum_photo() == 0) {
                    $('#photo-post-button').hide();
                }

            } else {

                // Limit maximum 4 photos
                if (get_maximum_photo() < 1) {

                    hide_error_message();

                    image_container.addClass('select');
                    image_container.css({ border: '2px solid #000' });

                    let reason = $('<input/>', {
                        id: 'photo-input-' + i,
                        type: 'text', 
                        placeholder: 'Photo #' + (i + 1)
                    }).css({ float: 'left', width: '100%', height: 'auto', 
                        border: '2px solid #000',
                        'border-radius': '5px',
                        'background': '#fff',
                        'color': '#000',
                        'padding-left': '5px',
                        'margin-top': '5px'
                    });

                    reasons.append(reason);
                    // Increase maximum
                    set_maximum_photo(get_maximum_photo() + 1);

                    $('#photo-post-button').show();
                    $('#photo-post-button').off().on('click', () => {

                        // data here
                        let photo = photo_data[i];
                        // create data here
                        let post = get_current_post();
                        post.photo.path = photo.path;
                        post.photo.score = photo.score;
                        post.photo.like = photo.like;
                        post.photo.risk = photo.risk;
                        post.photo.reason = photo.reason;
                        post.photo.why = reason.val();

                        let post_num = get_current_post_num();
                        let day_num = get_current_day();
                        // Start day at cuurent post and day
                        start_day(day_num, post_num);

                        $('#page-5').hide();
                        $('#page-4').show();
                    });

                } else {
                    show_error_message("You can choose 1 photo at the time");
                }
            } 
        });
    }
    
    return;
}