const router = require("express").Router();
const contacts = require("./contacts");
const swagger = require("./swagger")

router.use("/", swagger)

router.get("/", (req, res) => {
    // swagger.tags=['Hello World']
    res.send("Hello World!")
})

router.use("/contacts", contacts)

module.exports = router;