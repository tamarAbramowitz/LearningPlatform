import { generateLearningContent } from '../services/promptService';

describe('Prompt Service', () => {
  it('should return a valid response from OpenAI logic', async () => {
    const mockData = { title: "Test Prompt", category: "Math" };
    const result = await generateLearningContent(mockData.title, mockData.category);
    
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});