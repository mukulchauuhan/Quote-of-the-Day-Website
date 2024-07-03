// backend/routes/quotes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Quote = require('../models/quote');

// Function to fetch a random quote from external API
async function fetchRandomQuoteFromAPI() {
    try {
        const response = await axios.get('https://type.fit/api/quotes');
        if (response.status === 200) {
            const quotes = response.data;
            const randomIndex = Math.floor(Math.random() * quotes.length);
            return { source: 'external', quote: quotes[randomIndex] };
        } else {
            throw new Error('Failed to fetch quotes from external API');
        }
    } catch (error) {
        console.error('Error fetching quotes:', error.message);
        throw error;
    }
}

// Getting a random Quote (including external API fetch)
router.get('/random', async (req, res) => {
    try {
        // Fetch all quotes from database
        const allQuotes = await Quote.find();

        // If no quotes found in database, fetch from external API
        if (allQuotes.length === 0) {
            const randomQuote = await fetchRandomQuoteFromAPI();
            return res.json(randomQuote);
        }

        // Combine local quotes and external API quotes
        const localQuotes = allQuotes.map(quote => ({ source: 'database', quote }));
        const externalQuote = await fetchRandomQuoteFromAPI();
        const combinedQuotes = [...localQuotes, externalQuote];

        // Select a random quote from combined list
        const randomIndex = Math.floor(Math.random() * combinedQuotes.length);
        res.json(combinedQuotes[randomIndex]);
    } catch (error) {
        console.error('Error fetching random quote:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Search quotes by author
router.get('/search', async (req, res) => {
    const { author } = req.query;
    const quotes = await Quote.find({ author: new RegExp(author, 'i') });
    res.json(quotes);
});

// Add a new quote
router.post('/', async (req, res) => {
    const { text, author } = req.body;
    try {
        const newQuote = new Quote({ text, author });
        await newQuote.save();
        res.status(201).json({ message: 'Quote Added', quote: newQuote });
    } catch (error) {
        console.error('Error adding quote:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
