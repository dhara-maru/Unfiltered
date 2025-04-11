const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://rekhta-mern:rekhtamerndhara@cluster0.s3zyd.mongodb.net/notesDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.use(cors({
  origin: 'https://unfilteredfrontend2.onrender.com',
  methods: ['GET', 'POST'],
}));

app.use(bodyParser.json());
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});