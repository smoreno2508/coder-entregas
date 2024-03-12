import { validateObjectId } from "../helpers/utils.js"; 
export default class BaseRepository {
    
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async findAll() {
        return await this.model.find();
    }
    

    async findById(id) {
        return await this.model.findById(id);
    }

    async update(id, data) {
        validateObjectId(id);
        return await this.model.findByIdAndUpdate(id, data, { new: true});
    }

    async delete(id){
        validateObjectId(id);
        return await this.model.findByIdAndDelete(id);
    }

    async deleteMany(data){
        return await this.model.deleteMany(data);
    }

}