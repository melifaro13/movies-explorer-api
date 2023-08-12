const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { login, createUser } = require('./controllers/user');
const { validationLogin, validationCreateUser } = require('./middlewares/validations');
const auth = require('./middlewares/auth');
const extractJwt = require('./middlewares/extractJwt');
const handleError = require('./middlewares/handleError');
const NotFoundDocumentError = require('./errors/NotFoundDocumentError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const {
  PORT = 3000,
  // eslint-disable-next-line no-unused-vars
  MONGO_URL = 'mongodb://localhost:27017',
} = process.env;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// eslint-disable-next-line spaced-comment
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(extractJwt);

app.use(requestLogger);

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);

app.use(auth);
app.use(routes);

// eslint-disable-next-line no-template-curly-in-string
mongoose.connect(`${MONGO_URL}/bitfilmsdb`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
}).then(() => {
  console.log('Подключение к БД');
}).catch(() => {
  console.log('Не удалось подключиться к БД');
});

app.use('*', NotFoundDocumentError);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
