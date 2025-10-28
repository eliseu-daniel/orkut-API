class CreateNotification {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async execute(data) {
        const { usuId, tipo, mensId, status = 'N' } = data;

        const id = Date.now();
        await this.notificationRepository.create({ id, usuId, tipo, mensId, status });
        return { id };
    }
}

module.exports = CreateNotification;