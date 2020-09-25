export var user_score = {
    total_score: 100,
    total_like: 0
}

export var profile_like = 0;
export var profile_score = 0;

// 0, 50, 100 = low risks

export var user_data = {

    email: {
        value: undefined,
        score: -3,
        like: 1
    },

    password: {
        value: undefined,
        like: 0,
        score: 0
    },

    firstname: {
        value: undefined,
        like: 1,
        score: 0
    },

    lastname: {
        value: undefined,
        score: -5,
        like: 0
    },

    date: {
        value: undefined,
        score: -3,
        like: 1
    },

    month: {
        value: undefined,
        score: -1,
        like: 1,
    },

    year: {
        value: undefined,
        score: -3,
        like: 0
    },

    streetnum: {
        value: undefined,
        score: -5,
        like: 1
    },

    streetname: {
        value: undefined,
        score: -3,
        like: 1
    },

    city: {
        value: undefined,
        score: -1,
        like: 0
    },

    state: {
        value: undefined,
        score: -1,
        like: 0
    },

    country: {
        value: undefined,
        score: -1,
        like: 0
    },

    zipcode: {
        value: undefined,
        score: -5,
        like: 0
    },

    gender: {
        value: undefined,
        score: -3,
        like: 1
    },

    children: {
        value: undefined,
        score: -3,
        like: 1
    },

    privacy: {
        value: undefined,
        score: 0,
        like: 0
    }
}

export function get_user_data ()
{
    return user_data;
}

export function get_score ()
{
    return user_score;
}

export function recompute_score()
{
    for (var key in user_data) {
        if (user_data[key].value) {
            if (key === 'password') {
                if (user_data[key].value.length < 8) {
                    user_score.total_score -= 5;
                    user_score.total_like += 0;
                } else {
                    user_score.total_score += 5;
                    user_score.total_like += 0;
                }
            } else if (key === 'gender') {
                console.log(user_data[key].value);
                if (user_data[key].value === 'none') {
                    user_score.total_score += 0;
                    user_score.total_like += 0;
                } else {
                    // Minus 2 if gender specify
                    user_score.total_score -= 3;
                    user_score.total_like += 1;
                }

            } else if (key === 'privacy') {
                if (user_data[key].value === "onlyme") {
                    user_score.total_score -= 0;
                    user_score.total_like += 0;
                } else if (user_data[key].value === "public") {
                    user_score.total_score -= 5;
                    user_score.total_like += 1;
                } else {
                    // friend
                    user_score.total_score -= 3;
                    user_score.total_like += 1;
                }
            }else {

                user_score.total_score += user_data[key].score;
                user_score.total_like += user_data[key].like;

            }
        }
    }

    profile_like = user_score.total_like;
    profile_score = user_score.total_score;
    return;
}