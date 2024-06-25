const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookMarkedSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    saved: [{
        type: Schema.Types.ObjectId,
        ref: 'Work'
    }],
});

const BookModel = mongoose.model('Bookmark', BookMarkedSchema);
module.exports = BookModel;