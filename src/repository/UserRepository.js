
import BaseRepository from "./BaseRepository.js";

export default class UserRepository extends BaseRepository {
    
    constructor(model) {
        super(model)
    }

    async findByEmail(email) {
        return await this.model.findOne({ email });
    }

    async getRole(id){
        return await this.model.findById(id, 'role');
    }

    async getUserByCart(cartId){
        return await this.model.findOne({ cartId });
    }
}