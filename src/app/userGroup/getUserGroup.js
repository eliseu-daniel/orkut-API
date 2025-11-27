class GetUserGroup {
    constructor(userGroupRepository) {
        this.userGroupRepository = userGroupRepository;
    }

    async execute(userId) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        const groupData = await this.userGroupRepository.getByUserId(userId);
        return groupData;
    }
}

module.exports = GetUserGroup;