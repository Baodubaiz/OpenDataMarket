import express from 'express';


const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
