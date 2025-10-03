import express from 'express';
import loginRouter from './routes/login.route';
import register from './routes/register.route';
import dataset from './routes/dataset.route';
import category from './routes/category.route';
import user from './routes/user.route';
import tag from './routes/tag.route';
import transaction from './routes/transaction.route';
import order from './routes/order.route';
import review from './routes/review.route';
import cors from 'cors';

const app = express();
const port = 3001;

// ✅ Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse form-urlencoded

// ✅ Routes
app.use('/', loginRouter);
app.use('/', register);
app.use('/user', user);
app.use('/dataset', dataset);
app.use('/category', category);
app.use('/tag', tag);
app.use('/transaction', transaction);
app.use('/order', order);
app.use('/review', review);


// ✅ Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
