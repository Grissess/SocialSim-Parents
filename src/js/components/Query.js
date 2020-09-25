import { get_new_user_id, add_to_current_data } from '../components/utils';

export function Query_spread_sheets()
{
    console.log("testing");
    let result = undefined;
    $.ajaxSetup({ async: false });
    $.ajax({
        type: 'GET',
        url: 'https://ancient-earth-20794.herokuapp.com/getAllData',
        contentType: 'application/json',
        success: function (data) {
            result = data;
        },
        error: function (data) {
            console.log("error!");
        }
    });
    $.ajaxSetup({ async: true });

    return result;
}

export function Query_update_user(user)
{

    // new user data
    let user_data = {
        id: get_new_user_id(),
        email: user.email.value,
        password: user.password.value,
        firstname: user.firstname.value,
        lastname: user.lastname.value,
        dob: user.month.value + "-" + user.date.value + "-" + user.year.value,
        address: user.city.value + "," + user.state.value + " " + user.country.value,
        gender: user.gender.value,
        childs: user.children.value,
        privacy: user.privacy.value ,
        post1: "",
        semantic1: "",
        post2: "",
        semantic2: "",
        post3: "",
        semantic3: "",
        post4: "",
        semantic4: "",
        post5: "",
        semantic5: "",
        reason1: "",
        reason2: "",
        reason3: "",
        reason4: "",
        optout: "No",
        risk: "",
        like: 0,
        score: 0
    };

    let new_data = add_to_current_data(user_data);
    console.log(new_data);

    // update user
    $.ajaxSetup({ async: false });
    $.ajax({
        type: 'POST',
        url: 'https://ancient-earth-20794.herokuapp.com/addNewUser',
        contentType: "application/json",
        data: JSON.stringify(new_data),
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