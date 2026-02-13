import mongoose from "mongoose";

let refereeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 60
    },
    licenseNumber: {
        type: Number,
        unique: true,
        required: true,
    }
})

let Referee = mongoose.model('referees', refereeSchema);
export default Referee;