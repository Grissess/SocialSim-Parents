/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server-dev.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/routes/router.js":
/*!*************************************!*\
  !*** ./src/server/routes/router.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _sqlite_Query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sqlite/Query */ \"./src/server/sqlite/Query.js\");\n\n\n\n// Initialize router\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\n\nrouter.route(\"/getAllData\").get(_sqlite_Query__WEBPACK_IMPORTED_MODULE_1__[\"Query_all_data\"]);\nrouter.route(\"/addNewUser\").post(_sqlite_Query__WEBPACK_IMPORTED_MODULE_1__[\"Query_write_test\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/server/routes/router.js?");

/***/ }),

/***/ "./src/server/server-dev.js":
/*!**********************************!*\
  !*** ./src/server/server-dev.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _webpack_dev_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../webpack.dev.config */ \"./webpack.dev.config.js\");\n/* harmony import */ var _webpack_dev_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_webpack_dev_config__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _routes_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/router */ \"./src/server/routes/router.js\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_1___default()(),\n      DIST_DIR = __dirname,\n      HTML_FILE = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(DIST_DIR, 'index.html'),\n      compiler = webpack__WEBPACK_IMPORTED_MODULE_2___default()(_webpack_dev_config__WEBPACK_IMPORTED_MODULE_4___default.a);\n\n// Parse incoming request\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static('asset'));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_6___default.a.json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_6___default.a.urlencoded({ extended: false }));\napp.use('/', _routes_router__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n\napp.use(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3___default()(compiler, {\n    publicPath: _webpack_dev_config__WEBPACK_IMPORTED_MODULE_4___default.a.output.publicPath\n}));\n\napp.get('*', (req, res, next) => {\n    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {\n\n        if (err) {\n            return next(err);\n        }\n\n        res.set('content-type', 'text/html');\n        res.send(result), res.end();\n    });\n});\n\nconst PORT = process.env.PORT || 3000;\n\napp.listen(PORT, () => {\n    console.log(`App listening to ${PORT} ...`);\n});\n\n//# sourceURL=webpack:///./src/server/server-dev.js?");

/***/ }),

/***/ "./src/server/sqlite/Query.js":
/*!************************************!*\
  !*** ./src/server/sqlite/Query.js ***!
  \************************************/
/*! exports provided: DB_PATH, COLUMNS, TABLE, Query_insert_user_obj, Query_all_data, Query_write_test */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DB_PATH\", function() { return DB_PATH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"COLUMNS\", function() { return COLUMNS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TABLE\", function() { return TABLE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Query_insert_user_obj\", function() { return Query_insert_user_obj; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Query_all_data\", function() { return Query_all_data; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Query_write_test\", function() { return Query_write_test; });\nconst sqlite3 = __webpack_require__(/*! sqlite3 */ \"sqlite3\").verbose();\n\nconst DB_PATH = './results.db';\nconst COLUMNS = ['id', 'email', 'password', 'firstname', 'lastname', 'dob', 'address', 'gender', 'childs', 'privacy', 'post1', 'semantic1', 'post2', 'semantic2', 'post3', 'semantic3', 'post4', 'semantic4', 'post5', 'semantic5', 'reason1', 'reason2', 'reason3', 'reason4', 'reason5', 'optout', 'risk', 'like', 'score'];\nconst TABLE = 'data';\n\nconst type_column = name => {\n\tif (name == \"id\") {\n\t\treturn \"id TEXT PRIMARY KEY\";\n\t}\n\treturn name;\n};\n\nlet init_user = {\n\tid: \"user_0\", email: \"root@localhost\", password: \"test\", firtsname: \"\", lastname: \"Root\",\n\tdob: null, address: null, gender: null, childs: 0, privacy: \"public\",\n\toptout: \"Yes\", risk: \"low\", like: 0, score: 0\n};\nfor (let i = 1; i <= 5; i++) {\n\tinit_user[`post${i}`] = \"none\";\n\tinit_user[`semantic${i}`] = 0;\n\tinit_user[`reason${i}`] = \"\";\n}\n\nlet _db = null;\nconst get_db = () => {\n\tif (_db != null) {\n\t\treturn _db;\n\t}\n\n\t_db = new sqlite3.Database(DB_PATH, err => {\n\t\tif (err) throw err;\n\t});\n\n\t_db.serialize(() => {\n\t\t_db.run(`CREATE TABLE IF NOT EXISTS ${TABLE} (${COLUMNS.map(type_column).join(\", \")});`);\n\t\tQuery_insert_user_obj(init_user);\n\t});\n\n\treturn _db;\n};\n\nconst Query_insert_user_obj = user => {\n\tlet template = {};\n\tCOLUMNS.forEach(name => {\n\t\ttemplate[\"$\" + name] = user[name] || \"\";\n\t});\n\tget_db().run(`INSERT OR REPLACE INTO ${TABLE} (${COLUMNS.join(\", \")}) VALUES (${COLUMNS.map(x => \"$\" + x).join(\", \")});`, template);\n};\n\nconst Query_all_data = (req, response, err) => {\n\tget_db().all(`SELECT * FROM ${TABLE};`, [], (err, rows) => {\n\t\tif (err) throw err;\n\t\tif (rows.length == 0) {\n\t\t\tresponse.send('No data found.');\n\t\t} else {\n\t\t\tresponse.send(rows);\n\t\t}\n\t});\n};\n\nconst Query_write_test = (request, response, error) => {\n\trequest.body.forEach(Query_insert_user_obj);\n\tresponse.send('done');\n};\n\n//# sourceURL=webpack:///./src/server/sqlite/Query.js?");

/***/ }),

/***/ "./webpack.dev.config.js":
/*!*******************************!*\
  !*** ./webpack.dev.config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const path = __webpack_require__(/*! path */ \"path\");\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\");\nconst htmlWebpackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\n\nmodule.exports = {\n    // Define entry point.\n    entry: {\n        main: './src/index.js'\n    },\n    // Define webpack built.\n    output: {\n        path: path.join(__dirname, 'dist'),\n        publicPath: '/',\n        filename: '[name].js'\n    },\n    // Development mode\n    mode: 'development',\n    // Targeting to frontend\n    target: 'web',\n\n    devtool: '#source-map',\n\n    module: {\n        rules: [{\n            test: /\\.js$/,\n            exclude: /node_modules/,\n            loader: 'babel-loader'\n        }, {\n            // Loads javascript into html template\n            // Entry point is set below\n            test: /\\.html$/,\n            use: [{\n                loader: 'html-loader'\n                // options: { minimize: true }\n            }]\n        }, {\n            test: /\\.css$/,\n            use: ['style-loader', 'css-loader']\n        }, {\n            test: /\\.(png|svg|jpg|gif)$/,\n            use: ['file-loader']\n        }]\n    },\n    plugins: [new htmlWebpackPlugin({\n        template: './src/html/index.html',\n        filename: './index.html',\n        excludeChunks: ['server']\n    }), new webpack.ProvidePlugin({\n        $: 'jquery',\n        jQuery: 'jquery'\n    }), new webpack.NoEmitOnErrorsPlugin()]\n};\n\n//# sourceURL=webpack:///./webpack.dev.config.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "sqlite3":
/*!**************************!*\
  !*** external "sqlite3" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sqlite3\");\n\n//# sourceURL=webpack:///external_%22sqlite3%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ })

/******/ });