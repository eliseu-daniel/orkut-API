class CreateAction {
    constructor(actionRepository) {
        this.actionRepository = actionRepository;
    }

    async execute(data) {
        const { descricao, imagem } = data;
        const url = await blobStorageService.saveImage(imagem, id);

        if (!descricao) throw new Error('Descrição é obrigatória');

        const id = Date.now().toString().padStart(20, '0');

        await this.actionRepository.create({ id, descricao, imagem });
        return { id, descricao };
    }
}

module.exports = CreateAction;