import Sentiment from 'sentiment';

export default function ()
{
    console.log("start");
    setEvents();
}

function setEvents()
{
    // Start page 2
    $('#start-btn').on('click', () => {
        $('#page1').hide();
        $('#page2').show();
    });

    $('#continue-btn').on('click', () => {
        $('#page2').hide();
        $('#page3').show();
    });

    $('#postInput').on('keyup', () => {
        var post = $('#postInput').val();
        var sentiment = new Sentiment();
        var result = sentiment.analyze(post);
        $('#score').html('Current Score: ' + result.score);
    });
}