import mongoose, { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: {
        type:String,
        unique:true,
    },
    purchase_datetime:{
        type:Date,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    purchaser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
});

export const TicketModel = model('tickets', ticketSchema);;