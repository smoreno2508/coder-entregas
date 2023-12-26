export default class MessageService {

    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }

    async addMessage(user, message) {
        return await this.messageRepository.addMessage(user, message);
    }

    async getRecentMessages(limit = 20) {
        return await this.messageRepository.getRecentMessages(limit);
    }
}