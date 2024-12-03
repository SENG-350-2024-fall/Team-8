class TriageQueueClient {
    #port = null;
    #hospitalID = null;

    constructor(hospitalID, port = 3003) {
        if (!hospitalID) {
            throw new Error('Hospital ID is required to create a TriageQueueClient instance.');
        }
        this.#hospitalID = hospitalID;
        this.#port = port;
    }

    get hospitalID() {
        return this.#hospitalID;
    }

    get port() {
        return this.#port;
    }

    // POST request
    async push(item) {
        if (!this.#hospitalID) throw new Error('Hospital ID is not set.');
        const response = await fetch(`http://localhost:${this.#port}/queue/${this.#hospitalID}`, {
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
        if (!this.#hospitalID) throw new Error('Hospital ID is not set');
        const response = await fetch(`http://localhost:${this.#port}/queue/${this.#hospitalID}`, {
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

export default TriageQueueClient;