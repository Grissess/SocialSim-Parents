import {get_day_1, get_day_2, get_day_3, get_day_4, get_day_5} from '../components/data';
import { start_photo_selection } from './photo';
import { get_all_post } from './init';
import sentiment from 'sentiment';
import {show_error_message, hide_error_message, get_all_post_like} from '../components/utils';
import {summarize_score} from './summary';
import { current_user_data } from './instruction';
import { profile_like } from '../components/user';

// Maximum photo
export var maximum_photo = 0;

// Post data
export var allPost = undefined;
export var currentPost = undefined;

// Day and Post number data
export var current_day = undefined;
export var current_post_num = undefined;
export var optout = false;

// Start a new day
export function start_day(number_of_day, number_of_post)
{
    // Show current like here
    $('.user-like').html("Your Likes: " + parseInt(profile_like + get_all_post_like()));
    console.log(current_user_data);


    // Set current day and post number
    current_day = number_of_day;
    current_post_num = number_of_post;

    allPost = get_all_post();
    console.log(allPost)
    currentPost = get_current_post();
    console.log(currentPost);

    maximum_photo = 0;

    $('#page-2').hide();
    $('#page-4').show();

    var data = get_current_data(number_of_day);

    // Set title
    set_day_title();
    // Set scenario
    set_scenario(data.scenario);
    // Set sharing button
    set_sharing_button();

    // Set post buttons
    set_post_button();

    // Set photo
    if (currentPost.photo.path) {
        $('#photo-button').hide();
        // Show selected image
        let image = $('<img/>', {
            src: currentPost.photo.path,
            alt: ''
        }).css({ width: '30%', height: '100%'});

        $('#current-post-photo').empty();
        $('#current-post-photo').append(image);
        $('#current-post-photo').show();
        go_back(data.photos);

    } else {
        $('#current-post-photo').hide();
        // reset here
        game_reset();
        set_photo_button(data.photos);

    }
}

// Get new data base on current day number
function get_current_data(day_num)
{
    switch (day_num) {
        case 1: return get_day_1(); break;
        case 2: return get_day_2(); break;
        case 3: return get_day_3(); break;
        case 4: return get_day_4(); break;
        case 5: return get_day_5(); break;
        default: return undefined;
    }
}

// Set day headers
function set_day_title()
{
    let current_day_container = $('#current-day');
    current_day_container.html('<h1><font color="#1f78b4">Step: '+ current_day);
    return;
}

// Set a new scenario
function set_scenario(scenario)
{
    let scenario_container = $('#scenario');
    scenario_container.html('<strong>SCENARIO:</strong> ' + scenario);
    return;
}

// Set photo buttons
function set_photo_button(photos)
{
    let photo_button = $('#photo-button');

    photo_button.off().on('click', () => {
        start_photo_selection(photos);
        $('#page-4').hide();
        $('#page-5').show();
    });

    return;
}

// Go Back Button
function go_back(photos)
{
	let go_back = $('#go-back');

	go_back.off().on('click', () => {
    start_photo_selection(photos);
    $('#page-4').hide();
    $('#page-5').show();
	});

  return

}

// Get maximum photo of players
export function get_maximum_photo()
{
    return maximum_photo;
}

// Set maximum photo
export function set_maximum_photo(number)
{
    maximum_photo = number;
}

// Get current day number
export function get_current_day()
{
    return current_day;
}

// Get current post number
export function get_current_post_num()
{
    return current_post_num;
}

// Set current day number
export function set_current_day(num)
{
    return current_day = num;
}

// Set current post number
export function set_current_post_num(num)
{
    return current_post_num = num;
}

// Get current post depending on number of day and post
export function get_current_post()
{
    let day_num = current_day;
    let post_num = current_post_num;

    switch (day_num) {
        case 1:
            return allPost.day1[post_num];
        case 2:
            return allPost.day2[post_num];
        case 3:
            return allPost.day3[post_num];
        case 4:
            return allPost.day4[post_num];
        case 5:
            return allPost.day5[post_num];
    }

    return current_post;
}

// Reset all dom elements in the game
export function game_reset()
{
    $('#photo-button').show();
    $('.sharing-button').removeClass('select');
    $('#public-share').addClass('select');
    $('#current-post-photo').empty();
    $('#post-text').val('');

    $('#reasons').empty();
    $('#reasons').html('<h3>Why this photo? (this is not a post and will not show on your feed)</h3>');

    hide_error_message();

    return;
}

// Set sharing button event
export function set_sharing_button()
{
    $('.sharing-button').click( function () {
        $('.sharing-button').removeClass('select');
        $(this).addClass('select');
    });

    return;
}

// Set post button event
export function set_post_button()
{
    $('#post-button').off().on('click', function () {

        let current_post = currentPost;

        let post_message = $('#post-text').val();
        let sharing = $('.sharing-button.select').attr('id');
        if (is_empty(post_message) || !current_post.photo.path) {
            show_error_message("Please put post some message or select any photo");
        } else {

            // Calculate post sentiment
            currentPost.post.text = post_message;
            var Sentiment = new sentiment();
            currentPost.post.score = Sentiment.analyze(post_message).score;

            // Set sharing score base on privacy buttons
            if (sharing === "public-share") {
                // Public
                currentPost.privacy.mode = "public";
                currentPost.privacy.score = -5;
            } else if (sharing === "friend-share") {
                // Friends
                currentPost.privacy.mode = "friends";
                currentPost.privacy.score = -3;
            } else {
                // Only me
                currentPost.privacy.mode = "onlyme";
                currentPost.privacy.score = -1;
            }

            // This is to check number of post and number of day
            // and apply to a new day or new post

            if (current_day < 5) {
                current_post_num = 0;
                current_day += 1;
                start_day(current_day, 0);
            } else {
                // Summarize score if it's a last day
                // Detect opt out page .....
                start_opt_out();
            }
        }
    });
}

// Check string is null or empty
function is_empty(str)
{
    return str === null || str.match(/^ *$/) !== null;
}

function start_opt_out()
{
    $('#page-4').hide();
    $('#page-7').show();
    $('.optout-check').on('click', () => {
        optout = true;
        console.log('optout');
    });
    $('#done-btn').off().on('click', () => {
        summarize_score();
    });
}
