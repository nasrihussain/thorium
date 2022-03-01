const { count } = require("console")
const BookModel= require("../models/bookModel")

const createBook = async (request, response)=>{
    const data = request.body; 
    const dataRes = await BookModel.create(data); 
    response.send({
        msg: dataRes
    }); 
}

const bookList = async (request, response)=>{
    const dataRes = await BookModel.find().select({
        'bookName': 1,
        'authorName': 1,
        '_id': 0
    }); 
    response.send({
        msg: dataRes
    }); 
}

const getBooksInYear = async (request, response)=>{
    const year = request.body.year; 
    const dataRes = await BookModel.find({
        'year': year
    }).select({
        'bookName': 1,
        '_id': 0
    }); 
    response.send({
        msg: dataRes
    });
}

const getParticularBooks = async (request, response)=>{
    const data = request.body; 
    const dataRes = await BookModel.find(data).select({
        'bookName': 1,
        '_id': 0
    }); 
    response.send({
        msg: dataRes
    });
}

const getXINRBooks = async (request, response)=>{
    const dataRes = await BookModel.find({
        $or: [
            {
                "prices.indianPrice": "100 INR"
            },
            {
                "prices.indianPrice": "200 INR"
            },
            {
                "prices.indianPrice": "500 INR"
            },
        ]
    }); 
    response.send({
        msg: dataRes
    });
}

const getRandomBooks = async (request, response)=>{
    const dataRes = await BookModel.find({
        $and: [
            {
                'totalPages':{
                    $gt: 500
                }
            },
            {
                'stockAvailable': true
            }
        ]
    }); 
    response.send({
        msg: dataRes
    });
}



module.exports = {
    createBook: createBook,
    bookList: bookList,
    getBooksInYear: getBooksInYear,
    getParticularBooks: getParticularBooks,
    getXINRBooks: getXINRBooks,
    getRandomBooks: getRandomBooks
}