const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");
const { contactValidationRules, idValidationRules } = require("../utilities/validation")

router.get("/", contactsController.getAll);

router.get("/:id", idValidationRules, contactsController.getSingle);

router.post("/", contactValidationRules, contactsController.createContact)

router.put("/:id", idValidationRules, contactValidationRules, contactsController.updateContact)

router.delete("/:id", idValidationRules, contactsController.deleteContact)

module.exports = router;