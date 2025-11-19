class GetComments {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }

    async getAllComments() {
        return await this.commentRepository.getAll();
    }
}

module.exports = GetComments;