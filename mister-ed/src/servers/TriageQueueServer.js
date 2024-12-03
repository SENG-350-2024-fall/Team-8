const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3003;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Allow all origins (for development purposes)

// In-memory queues (keyed by hospitalID)
const hospitalQueues = {};

// Helper to get or create a queue for a hospital
const getOrCreateQueue = (hospitalID) => {
    if (!hospitalQueues[hospitalID]) hospitalQueues[hospitalID] = [];
    return hospitalQueues[hospitalID];
};

// Endpoint to add (push) an item to the queue for a specific hospital
app.post('/queue/:hospitalID', (req, res) => {
    const { hospitalID } = req.params; // Get hospitalID from URL parameters
    const { item } = req.body; // Expecting JSON body like { "item": "some value" }

    if (item === undefined) {
        return res.status(400).json({ error: 'No item provided' });
    }

    const queue = getOrCreateQueue(hospitalID);
    queue.push(item); // Add item to the end of the queue
    res.json({ message: 'Item added to queue', item });
});

// Endpoint to remove (pop) an item from the queue for a specific hospital
app.delete('/queue/:hospitalID', (req, res) => {
    const { hospitalID } = req.params; // Get hospitalID from URL parameters
    const queue = getOrCreateQueue(hospitalID);
    if (queue.length === 0) {
        return res.status(400).json({ error: 'Queue is empty', message: 'Queue is empty' });
    }

    const item = queue.shift(); // Remove item from the front of the queue
    res.json({ item });
});

// Endpoint to view the queue for a specific hospital
app.get('/queue/:hospitalID', (req, res) => {
    const { hospitalID } = req.params; // Get hospitalID from URL parameters
    const queue = getOrCreateQueue(hospitalID);
    res.json({ queue });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
