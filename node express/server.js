const mongoose = require('mongoose');
const app = require('./app');

const uri = 'mongodb://localhost:27017/to-do-app';
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, 'localhost', () =>
  console.log(`App runing on port ${port}...`)
);
