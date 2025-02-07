const bcrypt = require('bcryptjs');
const Contact = require('../modals/contact-modal');  
const createContact = async (req, res) => {
  const { name, email, password, mobilenumber, message } = req.body;
  if (!name || !email || !password || !mobilenumber || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newContact = new Contact({
      name,
      email,
      password: hashedPassword, 
      mobilenumber,
      message,
    });
    await newContact.save();
    res.status(201).json({ message: 'Contact message saved successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    const contactResponses = contacts.map(contact => {
      const { password, ...contactWithoutPassword } = contact.toObject();
      return contactWithoutPassword;
    });
    res.status(200).json(contactResponses);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createContact, getAllContacts, deleteContact };