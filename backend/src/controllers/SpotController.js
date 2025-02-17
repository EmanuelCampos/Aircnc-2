const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { technology } = req.query;
    
    const spots = await Spot.find({ technologies: technology });

    return res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, technologies, price } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      technologies: technologies.split(',').map(tech => tech.trim()),
      price
    });

    return res.json(spot);
  }
}