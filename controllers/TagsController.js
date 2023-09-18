const Tag = require("../models/Tag");

//!-----------create-------------------
exports.create = async (req, res) => {
  res.render("tags");
};
//!-----------store--------------------
exports.store = async (req, res) => {
  let data = await req.body;
  try {
    const post = await Tag.create(data);
    res.redirect("..");
  } catch (erreur) {
    const errors = handleError(erreur);
    res.render("errorPage", { errors });
  }
};