import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://hasnainnwl:8PkgdPI8gjQ0zCBg@cluster0.v4vv1.mongodb.net/store?retryWrites=true&w=majority&appName=Cluster0")
        console.log("MongoDB connected : "+ conn.connection.host);
    } catch (error) {
        console.log("MongoDB Connection error : "+ error);
    }
}