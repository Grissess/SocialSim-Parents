import { start_instruction } from './instruction';
import { get_post } from '../components/post';
import {Query_spread_sheets} from '../components/Query';

export var all_post = {
    day1: [],
    day2: [],
    day3: [],
    day4: [],
    day5: []
};

// Initialize start game
export function start_game()
{
    // Reset all post scores and information
    reset_all_post();

    // Start game button
    let start_game_button = $('#startgame-btn');
    let next_button = $('#next-btn');

    // Start game button event
    start_game_button.on('click', (e) => {
        e.stopPropagation();

        // Hide page 1 and start IRB approval page
        $('#page-1').hide();
        $('#page-0').show();
    });

    next_button.on('click', (e) => {
        // Hide IRB approval and open instruction page
        $('#page-0').hide();
        $('#page-2').show();
        start_instruction();
    });

    return;
}

export function get_all_post()
{
    return all_post;
}

export function add_post(day, post)
{

    console.log('Add post at day: ' + day);

    switch (day) {
        case 1:
            all_post.day1.push(post);
            break;
        case 2:
            all_post.day1.push(post);
            break;
        case 3:
            all_post.day1.push(post);
            break;
        case 4:
            all_post.day1.push(post);
            break;
        case 5:
            all_post.day1.push(post);
            break;
        default:
            break;
    }

    return;
}

export function remove_post(day, post_number)
{
    console.log('Remove post at day: ' + day + ' post index: ' + post_number);

    switch (day) {
        case 1:
            all_post.day1.splice(post_index, 1);
            break;
        case 2:
            all_post.day2.splice(post_index, 1);
            break;
        case 3:
            all_post.day3.splice(post_index, 1);
            break;
        case 4:
            all_post.day4.splice(post_index, 1);
            break;
        case 5:
            all_post.day5.splice(post_index, 1);
            break;
        default:
            break;
    }

    return;
}

export function reset_all_post()
{
    //let postlimit = 2;
    // limit at 3 post
    for (var key in all_post) {
        all_post[key].push(get_post());
    }

    return;
}