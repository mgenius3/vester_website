const verifyToken = require("../middleware/admin");
const router = require("express").Router();

const {
  AdminSignIn,
  fetchAllUsers,
  fetchAllReports,
  fetchAllStats
} = require("../controller/admin");
const { fetchAllDrivers } = require("../controller/driver");


router.post("/login", AdminSignIn);

router.use(verifyToken);
router.get("/all_drivers", fetchAllDrivers);
router.get("/all_users", fetchAllUsers);
router.get("/all_reports", fetchAllReports);
router.get("/all_stats", fetchAllStats);


module.exports = router;
