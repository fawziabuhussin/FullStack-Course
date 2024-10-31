const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); // or require('dotenv').config()
const fs = require('fs');
const path = require('path');



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


// Routes
app.get('/notes', async (req, res) => {
  //DEBUGGING
  
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalNotes = await Note.countDocuments();    

    const notes = await Note.find().skip(skip).limit(limit);
    res.status(200).json({
      totalNotes,
      currentPage: page,
      totalPages: Math.ceil(totalNotes / limit),
      notes
    });
    } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findOne({ id: req.params.id });
    if (!note){ 
      console.log(`Entered this section. 404`)
      return res.status(404).json({ error: 'Note not found' });
    }
    console.log(`Entered this section. 202`)

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/notes/:id', async (req, res) => {
  try {
    const { content } = req.body;
    const updatedNote = await Note.findOneAndUpdate({ id: req.params.id }, { content }, { new: true });
    if (!updatedNote) {
      return res.status(404).send('Note not found');
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/notes', async (req, res) => {
  //DEBUGGING
  
  try {
    const { title, author, content } = req.body;
    const lastNote = await Note.findOne().sort({ id: -1 });
    let note = new Note({id: 1, title, author, content });

    if(lastNote != undefined){
      note = new Note({id: lastNote.id + 1, title, author, content });
    }
    
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error('Error saving the note:', error);
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.delete('/notes/:id', async (req, res) => {
  try {
    //DEBUGGING
    const note = await Note.findOneAndDelete({ id: req.params.id });

    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/** As instructed, using app.listen at the end of the code in the cors documentation. */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Listening to PORT 3001... \n")
})
