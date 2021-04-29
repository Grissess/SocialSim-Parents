const sqlite3 = require('sqlite3').verbose();

export const DB_PATH = './results.db';
export const COLUMNS = ['id','email','password','firstname','lastname','dob','address','gender',
'childs','privacy','post1','semantic1','post2','semantic2','post3','semantic3',
'post4','semantic4','post5','semantic5','reason1','reason2','reason3','reason4',
'reason5','optout','risk','like','score'];
export const TABLE = 'data';

const type_column = name => {
	if(name == "id") {
		return "id TEXT PRIMARY KEY";
	}
	return name;
};

let init_user = {
	id: "user_0", email: "root@localhost", password: "test", firtsname: "", lastname: "Root",
	dob: null, address: null, gender: null, childs: 0, privacy: "public",
	optout: "Yes", risk: "low", like: 0, score: 0
};
for(let i = 1; i <= 5; i++) {
	init_user[`post${i}`] = "none";
	init_user[`semantic${i}`] = 0;
	init_user[`reason${i}`] = "";
}

let _db = null;
const get_db = () => {
	if(_db != null) { return _db; }

	_db = new sqlite3.Database(DB_PATH, (err) => {
		if(err) throw err;
	});

	_db.serialize(() => {
		_db.run(`CREATE TABLE IF NOT EXISTS ${TABLE} (${COLUMNS.map(type_column).join(", ")});`);
		Query_insert_user_obj(init_user);
	});

	return _db;
};

export const Query_insert_user_obj = user => {
	let template = {};
	COLUMNS.forEach(name => {
		template["$" + name] = user[name] || "";
	});
	get_db().run(`INSERT OR REPLACE INTO ${TABLE} (${COLUMNS.join(", ")}) VALUES (${COLUMNS.map(x => "$"+x).join(", ")});`, template);
};

export const Query_all_data = (req, response, err) => {
	get_db().all(`SELECT * FROM ${TABLE};`, [], (err, rows) => {
		if(err) throw err;
		if(rows.length == 0) {
			response.send('No data found.');
		} else {
			response.send(rows);
		}
	});
};

export const Query_write_test = (request, response, error) => {
	request.body.forEach(Query_insert_user_obj);
	response.send('done');
};
