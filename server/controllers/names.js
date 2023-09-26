// Handles data configuration
const getPokemonNames = (req, res, next) => {
  try {
    res.send("all saved pokemon names.");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getPokemonNames;
