class GetNotifications {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async execute(usuId) {
        return await this.notificationRepository.findUser(usuId);

    }
}

module.exports = GetNotifications;