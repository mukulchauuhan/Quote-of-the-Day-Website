document.addEventListener('DOMContentLoaded', function() {
    const quoteText = document.querySelector('.quote-text');
    const quoteAuthor = document.querySelector('.quote-author');
    const randomQuoteBtn = document.getElementById('randomQuoteBtn');
    const searchForm = document.getElementById('searchForm');
    const addQuoteForm = document.getElementById('addQuoteForm');

    // Fetch a random quote on page load
    fetchRandomQuote();

    // Event listeners
    randomQuoteBtn.addEventListener('click', fetchRandomQuote);
    searchForm.addEventListener('submit', searchQuotes);
    addQuoteForm.addEventListener('submit', addQuote);

    // Function to fetch a random quote from backend API
    function fetchRandomQuote() {
        fetch('http://localhost:5000/api/quotes/random') // Ensure the URL matches your backend configuration
            .then(response => response.json())
            .then(data => {
                if (data.message === 'No quotes found!') {
                    quoteText.textContent = 'No quotes found!';
                    quoteAuthor.textContent = '';
                } else {
                    displayQuote(data.quote);
                }
            })
            .catch(error => console.error('Error fetching random quote:', error));
    }

    // Function to search quotes by author
    function searchQuotes(event) {
        event.preventDefault();
        const author = document.getElementById('authorInput').value.trim();
        if (author === '') {
            return; // Prevent empty searches
        }

        fetch(`http://localhost:5000/api/quotes/search?author=${author}`) // Ensure the URL matches your backend configuration
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    quoteText.textContent = 'No quotes found!';
                    quoteAuthor.textContent = '';
                } else {
                    displayQuote(data[0]); // Display the first quote found
                }
            })
            .catch(error => console.error('Error searching quotes:', error));
    }

    // Function to add a new quote
    function addQuote(event) {
        event.preventDefault();
        const quoteTextValue = document.getElementById('quoteText').value.trim();
        const quoteAuthorValue = document.getElementById('quoteAuthor').value.trim();
        if (quoteTextValue === '' || quoteAuthorValue === '') {
            alert('Please enter both quote text and author.');
            return;
        }

        fetch('http://localhost:5000/api/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: quoteTextValue, author: quoteAuthorValue }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // Clear input fields
            document.getElementById('quoteText').value = '';
            document.getElementById('quoteAuthor').value = '';
            // Optionally fetch a new random quote after adding
            fetchRandomQuote();
        })
        .catch(error => console.error('Error adding quote:', error));
    }

    // Function to display a quote
    function displayQuote(quote) {
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `- ${quote.author}`;
    }
});
