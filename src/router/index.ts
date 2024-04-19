import { login, register } from "../controllers/authentication";

const express = require('express');
const router = express.Router();

router.post('/auth/authenticate',register);
router.post('/auth/login',login);

module.exports = router;