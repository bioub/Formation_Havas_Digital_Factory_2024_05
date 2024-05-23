import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('<p>Home</p>')
});

app.get('/api/hello/:prenom/:nom', (req, res) => {
  res.json({msg: 'Hello ' + req.params.prenom + ' ' + req.params.nom})
});

app.post('/send-email', express.json(), (req, res) => {
  res.json({ msg: 'Email sent to ' + req.body.dest  });
});

app.listen(3000, () => {
  console.log('Server started');
});
