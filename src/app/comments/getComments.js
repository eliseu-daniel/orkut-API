class GetComments {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }

    async execute(id) {
        return await this.commentRepository.getCommentIdPub(id);
    }
}

module.exports = GetComments;