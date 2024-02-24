const express = require('express')
const app = express();
const Transaction = require('./models/transaction')
require('dotenv').config()
const port = 4000
const cors = require('cors');
const { default: mongoose } = require('mongoose');

app.use(cors());
app.use(express.json())

app.get('/api/test', (req, res) => {
    res.json('test ok3')
});

app.post('/api/transaction', async (req, res) => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI);
        
        const { price, name, description, datetime } = req.body;
        const transaction = await Transaction.create({price, name, description, datetime})
        
        res.json(transaction)
    
    } catch (error) {
        res.status(401).json({error: error.message})
    }
})

app.get('/api/transactions', async (req, res) => {
    try {

        await mongoose.connect(process.env.MONGO_URI);
        const transactions = await Transaction.find()
        res.json(transactions);
        
    } catch (error) {
        res.status(401).json({error: error.message})
    }
})


app.listen(port, () => {
    console.log(`listeing on ${port}`)
});