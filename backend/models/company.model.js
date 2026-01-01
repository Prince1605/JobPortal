import mongoose from 'mongoose';

const compnaySchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    location:{
        type:String,
        
    },
    logo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    
},{timestamps:true})

export const Company= mongoose.model('Company',compnaySchema);