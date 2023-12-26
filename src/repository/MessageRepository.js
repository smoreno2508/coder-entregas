import BaseRepository from "./BaseRepository.js";

export default class MessageRepository extends BaseRepository {
    
    constructor(model) {
        super(model);
    }

    async addMessage(user, message){
        return await this.model.create({ user, message });
    }

    async getRecentMessages(limit = 20){
        return await this.model.find().sort({ createdAt: -1 }).limit(limit);
    }


}