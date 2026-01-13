import { getAIContent } from './promptController';
import IPrompt from '../models/prompt';
import Category from '../models/category';
import SubCategory from '../models/subCategory';

jest.mock('../models/prompt');
jest.mock('../models/category');
jest.mock('../models/subCategory');
jest.mock('../services/promptService', () => ({
    generateLearningContent: jest.fn().mockResolvedValue({ topic: 'Test', explanation: 'Test Exp' })
}));

describe('Prompt Controller Tests', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        req = {
            body: {
                category_id: '65a123456789012345678901',
                sub_category_id: '65a123456789012345678902',
                prompt: 'הסבר לי על פייתון',
                user_id: 'user123'
            },
            user: { _id: 'user123' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should return 401 if user_id is missing', async () => {
        req.user = null;
        req.body.user_id = null;

        await getAIContent(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "משתמש לא מזוהה" });
    });

    it('should create a new prompt and return 201', async () => {
        // דימוי מציאת קטגוריה במסד הנתונים
        (Category.findById as jest.Mock).mockResolvedValue({ name: 'Programming' });
        (SubCategory.findById as jest.Mock).mockResolvedValue({ name: 'Python' });

        // דימוי שמירה מוצלחת
        (IPrompt.prototype.save as jest.Mock).mockResolvedValue(true);

        await getAIContent(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        // expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        //     success: true
        // }));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ success: true })
        );
    });

    it('should return 503 if AI generation fails and no mock is available', async () => {
        (Category.findById as jest.Mock).mockRejectedValue(new Error('DB Error'));

        await getAIContent(req, res);

        expect(res.status).toHaveBeenCalledWith(503);
    });
});