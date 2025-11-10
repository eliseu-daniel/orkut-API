const CreateComment = require('../../../app/comments/createComment');
const CommentRepository = require('../../../infra/repositories/CommentRepository');

const createComment = new CreateComment(CommentRepository);

const createCommentHandler = async (req, res) => {
    try {
        const result = await createComment.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createComment: createCommentHandler };