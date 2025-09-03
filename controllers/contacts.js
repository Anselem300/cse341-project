const { ObjectId } = require("mongodb");
const mongodb = require("../database/mongodb");

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts)
    })
}

const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(String(req.params.id)); // ensures string usage
    const result = await mongodb.getDatabase().collection("contacts").findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getAll, getSingle
}
