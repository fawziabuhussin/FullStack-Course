const mongoose = require('mongoose')
const dotenv = require('dotenv'); // or require('dotenv').config()

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

dotenv.config();
// console.log(process.env) // remove this after you've confirmed it is working

// const password = encodeURIComponent("swfVoym0wpKpjeG2");
// console.log(password)
// // const url =
//   // `mongodb+srv://fawziabu:swfVoym0wpKpjeG2@cluster0.pafonph.mongodb.net/Test?retryWrites=true&w=majority`

const url = process.env.MONGODB_CONNECTION_URL

console.log(`The url is : ${url}`)
mongoose.set('strictQuery',false)

mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

const noteSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: {
    name: String,
    email: String,
  },
  content: String,
});


const Note = mongoose.model('Note', noteSchema)

/* Code for fetching objecst FOR ALL */ 
// Note.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })

console.log(`#Debugging: important objects : `)
/* Code for fetching objecst FOR import : true */ 
// Note.find({ important: true }).then(result => {
//         result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })



/* Code for creating new notes. */
const note = new Note({
  id: 1, // Add an id if needed
  title: 'HTML Basics', // Add a title if needed
  author: {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  content: 'HTML is easy',
  important: true,
});

note.save().then(result => {
  console.log('note saved!');
  mongoose.connection.close();
}).catch(error => {
  console.error('Error saving the note:', error);
  mongoose.connection.close();
});

