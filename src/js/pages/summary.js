import { get_all_post } from './init';
import { get_score, profile_like, profile_score } from '../components/user';
import { current_user_data} from './instruction';
import { get_day_1, get_day_2, get_day_3, get_day_4, get_day_5 } from '../components/data';
import {Query_spread_sheets} from '../components/Query';
import {optout} from './game';

export var google_data = undefined;

export function summarize_score()
{
    google_data = Query_spread_sheets();
    $('#page-7').hide();
    $('#page-6').show();

    var post_score = 0;
    let current_score = get_score();
    let posts = get_all_post();
    let risk = "none";

    // This is for summary details
    $('#summary-detail').empty();

    for (var key in posts) {
        // Get total post score and calculate the risks
        current_score.total_score += posts[key][0].photo.score + posts[key][0].post.score + posts[key][0].privacy.score;
    }


    if (current_score.total_score >= 50) {
        if (current_score.total_score > 70) {
            risk = "low";
        } else {
            risk = "medium";
        }
    } else {
        risk = "high";
    }

    // Summary score
    $('#summary-detail').html('Score Report: ' + current_score.total_score + '/100 | Like: ' + current_score.total_like + ' | Risk: ' + risk + '<br><br>');

    let table = $('<table/>', { border: "1" }).css({
        width: '100%',
        height: 'auto',
        'font-size': '16px'
    });

    // Add headers
    let thead = $('<thead/>').css({ background: 'yellow' }).html('<tr><th> </th><th>Posts</th><th>Post Scores</th><th>Photos</th><th>Photo Scores</th><th>Reasons</th><th>Total Likes</th></th><th>Total Scores</th><th>Privacy Risks</th></tr>');
    table.append(thead);


    let columns = ['', 'posts', 'post scores', 'photos', 'photo scores', 'reasons', 'Total likes', 'total scores', 'privacy risks'];

    // Profile
    let tbody = $('<tbody/>');

    var profile_reasons = "";
    var profile_risk = "Low";

    if (current_user_data.password.length < 8) {
        profile_reasons = "Password should be at least 8 characters : secure";
    } else {
        profile_reasons = "";
    }
    if (profile_score < 50) { profile_risk = "High" }

    let profile_tr = $('<tr/>').html('<td>Profile</td><td></td><td></td><td></td><td></td><td>' + profile_reasons + '</td>'+
    '<td>' + profile_like + '</td><td>' + profile_score + '</td><td>' + profile_risk + '</td>');
    tbody.append(profile_tr);


    let count = 0;
    for (var key in posts) {

        let tr = $('<tr/>');
        // 1. step number
        let step = $('<td/>').html("Step " + parseInt(count + 1));
        // 2. post text
        let post = $('<td/>').html(posts[key][0].post.text);
        // 3. post score
        let post_score = $('<td/>').html(posts[key][0].post.score);
        // 4. photos
        let photo = $('<td/>').html('<img src="' + posts[key][0].photo.path + '" alt="" height="80" width="120">');
        // 5. photo score
        let photo_score = $('<td/>').html(posts[key][0].photo.score);
        // 6. reasons
        let reason = $('<td/>').html(posts[key][0].photo.reason);
        // 7. likes
        let like = $('<td/>').html(posts[key][0].photo.like);
        // 8. total score
        let score = $('<td/>').html(posts[key][0].photo.score + posts[key][0].post.score + posts[key][0].privacy.score);
        // 9. privacy risk
        let risk = $('<td/>').html(posts[key][0].photo.risk);

        tr.append(step).append(post).append(post_score).append(photo).append(photo_score).append(reason).append(like).append(score).append(risk);
        tbody.append(tr);
        count++;
    }

    table.append(tbody);
    $('#summary-detail').append(table);
    update_final_data(current_user_data, posts, current_score, risk);
    // The end!
    $('#summary-detail').append('Thank you! please give us your <strong><a href="https://forms.gle/TRaFhF2J6bhwB7oa7">SURVEY</a></strong>');
    return;
}

// Get all photo data retrieved by the current day
function get_photo_data(day)
{
    switch (day) {
        case 'day1': return get_day_1();
        case 'day2': return get_day_2();
        case 'day3': return get_day_3();
        case 'day4': return get_day_4();
        case 'day5': return get_day_5();
    }

    return;
}

function update_final_data(user_data, posts, score, risk)
{
    for (let i = 0; i < google_data.length; ++i) {
        if (user_data.id === google_data[i].id) {

            // Collect post data with its sentiment score
            google_data[i].post1 = posts['day1'][0].post.text;
            google_data[i].post2 = posts['day2'][0].post.text;
            google_data[i].post3 = posts['day3'][0].post.text;
            google_data[i].post4 = posts['day4'][0].post.text;
            google_data[i].post5 = posts['day5'][0].post.text;
            google_data[i].semantic1 = posts['day1'][0].post.score;
            google_data[i].semantic2 = posts['day2'][0].post.score;
            google_data[i].semantic3 = posts['day3'][0].post.score;
            google_data[i].semantic4 = posts['day4'][0].post.score;
            google_data[i].semantic5 = posts['day5'][0].post.score;
            google_data[i].reason1 = posts['day1'][0].photo.why;
            google_data[i].reason2 = posts['day2'][0].photo.why;
            google_data[i].reason3 = posts['day3'][0].photo.why;
            google_data[i].reason4 = posts['day4'][0].photo.why;
            google_data[i].reason5 = posts['day5'][0].photo.why;
            google_data[i].risk = risk;
            google_data[i].score = score.total_score;
            google_data[i].like = score.total_like;
            google_data[i].optout = (optout) ? "Yes" : "No";
        }
    }

    $.ajaxSetup({ async: false });
    $.ajax({
        type: 'POST',
        url: '/addNewUser',
        contentType: "application/json",
        data: JSON.stringify(google_data),
        complete: function () {
            console.log("update success");
        },
        error: function () {
            console.log("update error!");
        }
    });
    $.ajaxSetup({ async: true });

    return;
}
