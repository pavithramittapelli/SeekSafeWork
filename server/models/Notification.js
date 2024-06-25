const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationsSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    viewed: [{
        type: Schema.Types.ObjectId,
        ref: 'Work'
    }],
    unviewed: [{
        type: Schema.Types.ObjectId,
        ref: 'Work'
    }],
});

const NotificationModel = mongoose.model('Notificatoin', NotificationsSchema);
module.exports = NotificationModel;