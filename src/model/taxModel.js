const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const taxSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
        unique: true,
        ref: 'taxPayer'
    },
    date: {
        type: Date
    },
    CGST: {
        type: Number
    },
    SGST: {
        type: Number
    },
    totalTax: {
        type: Number
    },
    taxStatus: {
        type: String,
        enum: ['InProcess','Paid', 'Delayed'],
        default: 'InProcess'
    },
    taxDue: {
        type: String,
        enum: ["New","Delayed"]
    }
}, { timestamps: true })


module.exports = new mongoose.model('tax', taxSchema)