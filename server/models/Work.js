const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const { isValidPhoneNumber } = require('libphonenumber-js');

const WorkSchema = new Schema({
    workTitle: {
        type: String,
        required: [true, 'Please enter Work title'],
    },
    category: {
        type: String,
        required: [true, 'Please select the Category'],
    },
    location: {
        type: String,
        required: [true, 'Please enter location'],
    },
    majorCity: {
        type: String,
        required: [true, 'Please enter the major city name'],
    },
    pincode: {
        type: String,
        required: [true, 'Please enter the area pincode'],
        validate: {
            validator: function (value) {
                return /^[0-9]{6}$/.test(value); // Validates pincode format
            },
            message: props => `${props.value} is not a valid pin code`
        }
    },
    workingHours: {
        type: Number,
        required: [true, 'Please enter no of hours to work'],
        min: [1, 'Hours per day must be at least 1'],
        max: [24, 'Hours per day cannot exceed 24'],
    },
    numOfWorkers: {
        type: Number,
        required: [true, 'Please enter no of workers'],
        min: [1, 'Total workers must be at least 1'],
    },
    duratoionOfWork: {
        type: Number,
        required: [true, 'Please Select no of months work provided'],
        min: [1, 'Duration of work must be at least 1 month'],
    },
    salary: {
        type: Number,
        required: [true, 'Please Enter the salary'],
        min: [500, 'Salary must be a non-negative value'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please enter phone number'],
        validate: {
            validator: function (value) {
                // Regular expression to match Indian phone numbers starting with 6, 7, 8, or 9
                return /^[6-9]\d{9}$/.test(value); // Validates Indian phone number
            },
            message: props => `${props.value} is not a valid Indian phone number`
        }
    },
    description:
    {
        type: String,
    },
    author:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
},
    {
        timestamps: true,
    });

const WorkModel = mongoose.model('Work', WorkSchema);
module.exports = WorkModel;
