class TriageQueueClient {
    static #instance = null; // Use a protected static instance
    static #port = null; // Use a protected static port property

    constructor(port) {
        if (TriageQueueClient.#instance) {
            throw new Error(
                `${new.target.name} is a singleton class. Use ${
                    new.target.name
                }.getInstance() to access the instance.`
            );
        }

        if (port !== undefined) {
            TriageQueueClient.#port = port; // Set the port in the static property
        }
    }

    static getInstance(port) {
        if (!this.#instance) {
            this.#instance = new this(port); // Calls the constructor of the subclass with the port
        }
        return this.#instance;
    }

    get port() {
        return TriageQueueClient.#port; // Access the static protected port property
    }

    // POST request
    async push(item) {
        const response = await fetch(`http://localhost:${this.port}/queue`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to push item: ${errorData.error}`);
        }

        return await response.json(); // Return the response data for potential use
    }

    // DELETE request
    async pop() {
        const response = await fetch(`http://localhost:${this.port}/queue`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to pop item: ${errorData.error}`);
        }

        const responseData = await response.json();
        return responseData.item;
    }
}

export default TriageQueueClient.getInstance(3003);
