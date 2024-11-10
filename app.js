import express from 'express';
import morgan from 'morgan';
import path from 'path';
import employees from './employees.json' assert { type: 'json' };

const dirname = path.resolve();
const app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(dirname, '/public')));

app.get('/employees', (req, res) => res.status(200).json(employees));
app.delete('/employees/:id', (req, res) => {
  const index = employees.findIndex((el) => el.id === Number(req.params.id));
  if (index === -1) return res.status(404).end();
  employees.splice(index, 1);
  res.status(200).end();
});

app.listen(3000, () => console.log('server running on port 3000'));
