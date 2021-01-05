const jwt = require("jsonwebtoken");

const middleware = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    request.jwtData = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return response.sendStatus(401);
  }
};

module.exports = middleware;
