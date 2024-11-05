import TriageQueueClient from '../TriageQueueClient';

global.fetch = jest.fn();

describe('Testing TriageQueueClient API', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('interfaces with the queue correctly', async () => {
        // Define the mock response you want fetch to return
        const item = 'John Doe';
        const expectedResponse = { item: 'John Doe' };

        // Make fetch return a successful response with mockData as JSON
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => expectedResponse,
        });

        await TriageQueueClient.push(item);

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => expectedResponse,
        });

        const data = await TriageQueueClient.pop();

        // Check that fetch was called correctly
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(data).toEqual(item); // Ensure the function returns the expected data
    });
});
