const express = require('express');
const dotenv = require('dotenv');
const indexRoutes = require('./src/routes/index');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api', indexRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
