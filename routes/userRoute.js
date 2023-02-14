var express = require("express");
const {
  loginUser,

  getUserDetails,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");
var router = express.Router();

/* POST /login */
router.post("/login", loginUser);

/*GET /userdetails */
router.get("/getuser", isAuthenticated, getUserDetails);

module.exports = router;
