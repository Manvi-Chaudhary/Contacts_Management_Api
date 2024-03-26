const express = require("express");
const router = express.Router();
const controller = require("../controllers/contactsControllers");
const validateToken = require("../middlewares/validateToken");

router.use(validateToken)

router.route("/").get(controller.getAllContacts).post(controller.createContact)

router.route("/:id").get(controller.getContactWithID).put(controller.updateContact).delete(controller.deleteContact)



module.exports = router
