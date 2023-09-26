const router = require("express").Router();
const getPokemonNames = require("../controllers/names");

// Handles diff route names with diff data
router.get("/names", getPokemonNames);

module.exports = router;
