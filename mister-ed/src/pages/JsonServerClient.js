class JsonServerClient {
  
  static #instance = null; // Private static instance variable

  // Constructor ensures only one instance can exist
  constructor() {
    if (JsonServerClient.#instance) {
      throw new Error("JsonServerClient is a singleton class. Use JsonServerClient.getInstance() to access the instance.");
    }
  }

  // Global point of access
  static getInstance() {
    // Creation policy
    if (!JsonServerClient.#instance) {
      JsonServerClient.#instance = new JsonServerClient();
    }
    return JsonServerClient.#instance;
  }

  // Fetch method
  async fetch(endpoint, options = {}) {
    try {
      const response = await fetch(`http://localhost:3001/${endpoint}`, options);
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
    return fetch(`http://localhost:3001/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

}

// Export the singleton instance immediately upon import to enforce single-instance usage and prevent direct instantiation (calling the constructor directly will throw an error)
export default JsonServerClient.getInstance();
