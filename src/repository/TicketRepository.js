import BaseRepository from './BaseRepository.js'

export default class ticketRepository extends BaseRepository {
    constructor(model) {
        super(model)
    }

    async findLastFive() {
        return await this.model.find({})
        .sort({ purchase_datetime: -1})
        .limit(5);
    }
}