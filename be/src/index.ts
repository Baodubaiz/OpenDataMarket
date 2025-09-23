import express from 'express';
import loginRouter from './routes/login.route';
import register from './routes/register.route';
import cors from 'cors';



const app = express();
const port = 3001;
app.use(cors({
    origin: 'http://localhost:3000', // 👈 Cho phép frontend truy cập
    credentials: true,               // 👈 Nếu bạn dùng cookie thì bật cái này
}));

app.use(express.json());
app.use('/', loginRouter);
app.use('/', register);


app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
