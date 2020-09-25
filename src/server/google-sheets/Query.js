import fs from "fs";
import readline from "readline";
import { google } from "googleapis";

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Get current user id
export function Query_all_data(req, response, err)
{
    let columns = ['id','email','password','firstname','lastname','dob','address','gender',
    'childs','privacy','post1','semantic1','post2','semantic2','post3','semantic3',
    'post4','semantic4','post5','semantic5','reason1','reason2','reason3','reason4',
    'reason5','optout','risk','like','score'];

    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        authorize(JSON.parse(content), (auth) => {
          const sheets = google.sheets({version: 'v4', auth});
          sheets.spreadsheets.values.get({
            spreadsheetId: '1Uu4KQQH3b_16AUR9GeGtdWvmmOx03sbtXx6YHbHlmbQ',
            range: 'Sheet1!A2:AC',
          }, (err, res) => {
            if (err) return response.send('The API returned an error: ' + err);
            const rows = res.data.values;
            if (rows.length) {
              let data = [];
              rows.map((row) => {
                // Create new user
                let user = {};
                // Reading all data for every columns
                for (let i = 0; i < columns.length; ++i) {
                  user[columns[i]] = row[i];
                }
                data.push(user);
              });
              let result = JSON.parse(JSON.stringify(data));
              response.send(result);
            } else {
              response.send('No data found.');
            }
          });
        });
    });
}

export function Query_write_test(request, response, error)
{
  let columns = ['id','email','password','firstname','lastname','dob','address','gender',
                  'childs','privacy','post1','semantic1','post2','semantic2','post3','semantic3',
                  'post4','semantic4','post5','semantic5','reason1','reason2','reason3','reason4',
                  'reason5','optout','risk','like','score'];
  
  let values = [];
  for (let i = 0; i < request.body.length; ++i) {
    let user = request.body[i];
    let value = [];
    for (let i = 0; i < columns.length; ++i) {
      if (columns[i] in user) {
        value[i] = user[columns[i]];
      } else {
        // Set empty values
        value[i] = "";
      }
    }
    values.push(value);
  }

  console.log(values);
  
  fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Sheets API.
      authorize(JSON.parse(content), (auth) => {

        const sheets = google.sheets({version: 'v4', auth});
        sheets.spreadsheets.values.update({
          spreadsheetId: '1Uu4KQQH3b_16AUR9GeGtdWvmmOx03sbtXx6YHbHlmbQ',
          range: 'Sheet1!A2:AC', //!A2:S
          valueInputOption: "RAW",
          resource: {values},
        }, (err, result) => {
          if (err) {
            // Handle error
            response.send(err);
          } else {
            console.log('%d cells updated.', result.updatedCells);
            response.send("done");
          }
        });
      });
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */

function get_current_user(auth, request, response) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1Uu4KQQH3b_16AUR9GeGtdWvmmOx03sbtXx6YHbHlmbQ',
    range: 'Sheet1!A2:H',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      let data = [];
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {

        let item = {
          id: row[0],
          next: row[5]
        }
        
        data.push(item);
      });
      let result = JSON.parse(JSON.stringify(data));
      console.log(result);
    } else {
      console.log('No data found.');
    }
  });
}