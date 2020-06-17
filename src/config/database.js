const mongoose = require('mongoose');

mongoose.connect(process.env.DB_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(resp => console.log('BD corriendo'))
  .catch(err => console.log(err));