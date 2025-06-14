import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
    _id: String,
    title: String,
    course: String,
    description: String,
    availableFrom: String,
    dueDate: String,
    points: Number,
},
    { collection: "assignments" }
);
export default assignmentSchema;