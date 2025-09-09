const { ObjectId } = require("mongodb");
const mongodb = require("../database/mongodb");

const getAll = async (req, res) => {
    // swagger.tags=['contacts']
    const result = await mongodb.getDatabase().collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts)
    })
}

const getSingle = async (req, res) => {
  // swagger.tags=['contacts']
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

const createContact = async (req, res) => {
  // swagger.tags=['contacts']
  const contact = {
    firstName: req.body.firstName, 
    lastName: req.body.lastName, 
    email: req.body.email, 
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  } 

  const response = await mongodb.getDatabase().collection("contacts").insertOne(contact);
  if(response.acknowledged){
    res.status(201).send();
  } else{
    res.status(500).json(response.error || "Some error occured while updating the contact.")
  }
}

const updateContact = async (req, res) => {
  // swagger.tags=['contacts']
  const contactId = new ObjectId(String(req.params.id));
  const contact = {
    firstName: req.body.firstName, 
    lastName: req.body.lastName, 
    email: req.body.email, 
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  } 
  const response = await mongodb.getDatabase().collection("contacts").replaceOne({_id: contactId}, contact);
  if(response.modifiedCount > 0){
    res.status(201).send();
  } else{
    res.status(500).json(response.error || "Some error occured while updating the contact.")
  }
}

const deleteContact = async (req, res) => {
  // swagger.tags=['contacts']
  try {
    const contactId = new ObjectId(String(req.params.id));
    const response = await mongodb
      .getDatabase()
      .collection("contacts")
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      return res.status(200).json({ message: "Contact deleted successfully" });
    } else {
      return res.status(404).json({ error: "Contact not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || "Some error occurred while deleting the contact." });
  }
};

module.exports = {
    getAll, getSingle, createContact, updateContact, deleteContact
}
