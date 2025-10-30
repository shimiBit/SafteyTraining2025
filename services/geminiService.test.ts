import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// This is the mock function we'll use to inspect calls
const mockGenerateContent = vi.fn();

// Mock the @google/genai module
vi.mock('@google/genai', () => ({
  // Provide a mock class for GoogleGenAI
  GoogleGenAI: class MockGoogleGenAI {
    constructor(...args: any[]) {
      // The constructor returns an object that matches the structure of the real class instance
      return {
        models: {
          generateContent: mockGenerateContent,
        },
      };
    }
  },
}));

describe('geminiService', () => {
  beforeEach(() => {
    // Set up the environment variable before each test
    process.env.API_KEY = 'test-api-key';
    // Provide a mock resolved value for our mock function
    mockGenerateContent.mockResolvedValue({
      text: 'Mocked training content',
    });
  });

  afterEach(() => {
    // Clean up mocks and the environment variable after each test
    vi.clearAllMocks();
    vi.resetModules(); // This is crucial to re-import the module in the next test
    delete process.env.API_KEY;
  });

  it('should pass because systemInstruction is a top-level property', async () => {
    // Dynamically import the service to ensure the mock is in place and the env var is set
    const { generateTrainingModule } = await import('./geminiService');

    // Call the function we are testing
    await generateTrainingModule('Test Topic');

    // Assert that our mock function was called
    expect(mockGenerateContent).toHaveBeenCalledOnce();

    // Get the payload that was sent to the mock function
    const payload = mockGenerateContent.mock.calls[0][0];

    // This is the key assertion that proves the bug is fixed.
    expect(payload).toHaveProperty('systemInstruction');
  });
});
