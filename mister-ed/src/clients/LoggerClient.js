class LoggerClient {
    static #instance = null; // Use a protected static instance
    static #port = null; // Use a protected static port property

    constructor(port) {
        if (LoggerClient.#instance) {
            throw new Error(
                `${new.target.name} is a singleton class. Use ${
                    new.target.name
                }.getInstance() to access the instance.`
            );
        }

        if (port !== undefined) {
            LoggerClient.#port = port; // Set the port in the static property
        }
    }

    static getInstance(port) {
        if (!this.#instance) {
            this.#instance = new this(port); // Calls the constructor of the subclass with the port
        }
        return this.#instance;
    }

    get port() {
        return LoggerClient.#port; // Access the static protected port property
    }

    // Fetch method
    async fetch(endpoint, options = {}) {
        try {
            const response = await fetch(
                `http://localhost:${this.port}/${endpoint}`,
                options
            );
            if (!response.ok) {
                throw new Error(`Network response was not OK`);
            }
            return await response.json();
        } catch (error) {
            console.error('API fetch error:', error);
            throw error;
        }
    }

    // POST method
    async post(endpoint, data) {
        return fetch(`http://localhost:${this.port}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    }
}

export default LoggerClient.getInstance(3002);
