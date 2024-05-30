const mongoose=require('mongoose')

const LoginSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true,
    },
    gmail:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
});
LoginSchema.statics.userAlreadyInUse= async function(username){
    try {
        const user= await this.findOne({username})
        if(user) return false;
        else return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const User= mongoose.model("User",LoginSchema)

module.exports=User;