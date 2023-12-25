import BaseRepository from "./BaseRepository.js";

export default class ProductRepository extends BaseRepository {
    
    constructor(model) {
        super(model)
    }

    async productExist(code) {
        return await this.model.findOne({ code }); 
    }

    async getProducts(query, options){
        return await this.model.paginate(query, options);
    }

    async getCategories(){
        return await this.model.distinct("category");
    }

    async updateStock(id, quantity){
        return await this.model.updateOne(
            { _id: id, stock: { $gte: -quantity } },
            { $inc: { stock: quantity } }
        );
    }
}

