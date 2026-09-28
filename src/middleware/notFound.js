const notFoundImage = require("../../public/404.svg");

const notFound = (_req, res) => {
  return res.status(404).json({ message: "Route not found.", image: notFoundImage });
};

module.exports = { notFound };
