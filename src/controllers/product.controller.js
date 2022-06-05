const create = async (req, res) => {
  try {
    res.status(201).json({url: req.file?.location});
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = { create };
