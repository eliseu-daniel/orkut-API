const CreateComment = require('../../../app/comments/createComment');
const GetComments = require('../../../app/comments/getComments');
const CommentRepository = require('../../../infra/repositories/CommentRepository');

const createComment = new CreateComment(CommentRepository);
const getComments = new GetComments(CommentRepository);

const createCommentHandler = async (req, res) => {
    try {
        const result = await createComment.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCommentsHandler = async (req, res) => {
    try {
        const comments = await getComments.getAllComments();
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createComment: createCommentHandler, getComments: getCommentsHandler };