import express from 'express';
import {Query_all_data, Query_write_test} from '../google-sheets/Query';

// Initialize router
const router = express.Router();

router.route("/getAllData").get(Query_all_data);
router.route("/addNewUser").post(Query_write_test);

export default router;