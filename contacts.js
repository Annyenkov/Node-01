const fs = require('fs/promises');
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./db/contacts.json")


const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts() 
  const contact = contacts.find(item => item.id === contactId);
  return contact
}

const removeContact = async (contactId) => {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.filter(contact => {
      if (contact.id !== contactId) {
        return contact;
      }
    });
  return contact
}

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = {
    id: uid(2),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}