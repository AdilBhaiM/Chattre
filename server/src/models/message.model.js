import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
    },
    text: {
        type: String,
    }
}, {timestamps: true}

)

const Message = mongoose.model("Message", userSchema);

export default Message