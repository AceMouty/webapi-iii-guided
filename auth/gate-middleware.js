function gate(req, res, next) {
    const password = req.headers.password;
  
    if(password && password === "mellon") {
      next();
    } else {
      next("you shall not pass")
    }
  
  }

module.exports = gate;