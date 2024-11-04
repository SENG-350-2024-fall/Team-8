class DatabaseClient {
    static #instance = null; // Use a protected static instance
    static #port = null; // Use a protected static port property

    constructor(port) {
        if (DatabaseClient.#instance) {
            throw new Error(
                `${new.target.name} is a singleton class. Use ${
                    new.target.name
                }.getInstance() to access the instance.`
            );
        }

        if (port !== undefined) {
            DatabaseClient.#port = port; // Set the port in the static property
        }
    }

    static getInstance(port) {
        if (!this.#instance) {
            this.#instance = new this(port); // Calls the constructor of the subclass with the port
        }
        return this.#instance;
    }

    get port() {
        return DatabaseClient.#port; // Access the static protected port property
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
    
    // PATCH method
		async update(endpoint, data) {
				return fetch(`http://localhost:${this.port}/${endpoint}`, {
						method: 'PATCH',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(data),
				});
		}

    // Toggle EMT availability
    async toggleAvailability(userId, isAvailable) {
            return fetch(`http://localhost:${this.port}/emts/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ available: isAvailable }),
            });
    }

        

}

export default DatabaseClient.getInstance(3001);
