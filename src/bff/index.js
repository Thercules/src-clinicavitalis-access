require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'BFF is running!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`BFF running on port ${PORT}`);
});
