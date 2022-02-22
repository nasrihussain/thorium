//current date
const currentDate = new Date()
const date = currentDate.toDateString();

//current month
const month = currentDate.getMonth() + 1;

//print batch
const batchName = "thorium"
const batchWD = "W3D1"
const topic = 'the topic for today is Nodejs module system'
const batch = batchName + ', ' + batchWD + ', ' + topic


module.exports.printDate = date;
module.exports.printMonth = month;
module.exports.prinBatch = batch;