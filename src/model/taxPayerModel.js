const mongoose = require("mongoose");

const taxPayerSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'Tax Payer',
            enum: ["Tax Payer"]
        },
        income: {
            type: Number,
            required: true
        },
        state :{
            type: String,
            required:true,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("taxPayer", taxPayerSchema);