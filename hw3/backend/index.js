// import
const User = require('./models/User'); // Ensure this is correctly imported


const express = require('express');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const cors = require('cors');
const dotenv = require('dotenv'); 
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');


// express.
const app = express();
app.use(express.json());
// doteenv.
dotenv.config();
// cors : 
app.use(cors());

const logStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });
const logger = (req, res, next) => {
  const log = `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}\n`;
  logStream.write(log);
  next();
};
app.use(logger);


/*
monogos login : 
mongodb+srv://fawziabu:<password>@cluster0.pafonph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
username : fawziabu
password : swfVoym0wpKpjeG2
*/

/* Mongos code & connection. */
// const password = encodeURIComponent("swfVoym0wpKpjeG2");
/** To check which is better to use : the first or : */
// mongoose.connect(process.e nv.MONGODB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Failed to connect to MongoDB', err));

const url = process.env.MONGODB_CONNECTION_URL
mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  id : Number,
  title: String,
  author: {
    name: String,
    email: String,
  },
  content: String,
});

const Note = mongoose.model('Note', noteSchema);



const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


// Routes
app.get('/notes', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    console.log(`GET /notes request received to get page : ${page}`);

    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalNotes = await Note.countDocuments();

    const notes = await Note.find().skip(skip).limit(limit);
    res.status(200).json({
      totalNotes,
      currentPage: page,
      totalPages: Math.ceil(totalNotes / limit),
      notes,
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/notes/:id', async (req, res) => {
  console.log(`GET /notes/${req.params.id} request received`);
  try {
    const note = await Note.findOne({ id: req.params.id });
    if (!note) {
      console.log(`Note with ID ${req.params.id} not found`);
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/notes', authenticateToken, async (req, res) => {
  console.log('POST /notes request received');
  try {
    const { title, content } = req.body;
    const author = { name: req.user.username, email: req.user.email };
    const lastNote = await Note.findOne().sort({ id: -1 });
    const note = new Note({
      id: lastNote ? lastNote.id + 1 : 1,
      title,
      author,
      content,
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.put('/notes/:id', authenticateToken, async (req, res) => {
  console.log(`PUT /notes/${req.params.id} request received`);
  try {
    const { content } = req.body;
    const note = await Note.findOne({ id: req.params.id });
    if (!note) {
      console.log(`Note with ID ${req.params.id} not found`);
      return res.status(404).json({ error: 'Note not found' });
    }
    if (note.author.name !== req.user.username) {
      console.log(`User ${req.user.username} is not authorized to edit note with ID ${req.params.id}`);
      return res.status(403).json({ error: 'Forbidden' });
    }
    note.content = content;
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/notes/:id', authenticateToken, async (req, res) => {
  console.log(`DELETE /notes/${req.params.id} request received with user:`, req.user);
  try {
    const note = await Note.findOne({ id: req.params.id });
    if (!note) {
      console.log(`Note with ID ${req.params.id} not found`);
      return res.status(404).json({ error: 'Note not found' });
    }
    console.log(`Found note:`, note);
    if (note.author.name !== req.user.username) {
      console.log(`User ${req.user.username} is not authorized to delete note with ID ${req.params.id}`);
      return res.status(403).json({ error: 'Forbidden' });
    }
    await Note.deleteOne({ id: req.params.id });
    console.log(`Note with ID ${req.params.id} deleted successfully`);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Register route
app.post('/users', async (req, res) => {
  console.log('POST /users request received');
  const { name, email, username, password } = req.body;
  if (!name || !email || !username || !password) {
    console.log('Missing fields in the request');
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, username, passwordHash });

    const savedUser = await user.save();
    console.log('User registered successfully:', savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ error: 'User creation failed' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  console.log('POST /login request received');
  const { username, password } = req.body;
  if (!username || !password) {
    console.log('Missing fields in the request');
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Unauthorized: the user is unknown, and needs to authenticate to get a response or incorrect credentials.' });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Unauthorized: the user is unknown, and needs to authenticate to get a response or incorrect credentials.' });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' });
    console.log('User logged in successfully:', userForToken);

    res.status(200).send({ token, username: user.username, name: user.name, email: user.email });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Listening to PORT 3001...");
});



