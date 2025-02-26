const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://zakashisenpai:6ukagHDEaUgMYbtZ@database.aguif.mongodb.net/?retryWrites=true&w=majority&appName=DataBase'; // Replace with your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const connectToDatabase = async () => {
  try {
    await client.connect();
    db = client.db('portfolio'); // Replace with your database name
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

module.exports = { connectToDatabase, getDb };