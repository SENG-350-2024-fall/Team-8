const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3003;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Allow all origins (for development purposes)

// In-memory queue (stored as an array)
let queue = [];

// Endpoint to add (push) an item to the queue
app.post('/queue', (req, res) => {
    const { item } = req.body; // Expecting JSON body like { "item": "some value" }

    if (item === undefined) {
        return res.status(400).json({ error: 'No item provided' });
    }

    queue.push(item); // Add item to the end of the queue
    res.json({ message: 'Item added to queue', item });
});

// Endpoint to remove (pop) an item from the queue
app.delete('/queue', (req, res) => {
    if (queue.length === 0) {
        return res.status(200).json({ message: 'Queue is empty' });
    }

    const item = queue.shift(); // Remove item from the front of the queue
    res.json({ item });
});

// Endpoint to view the queue
app.get('/queue', (req, res) => {
    res.json({ queue });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
