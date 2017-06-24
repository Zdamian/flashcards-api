var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wordSchema = new Schema({
    english: { type: String, required: true },
    polish: { type: String, required: true },
    known: Boolean,
    createdAt: Date,
    updatedAt: Date,
    category: [{type: Schema.Types.ObjectId, required: true, ref: 'Category'}]
});

// on every save, add the date
wordSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updatedAt field to current date
    this.updatedAt = currentDate;

    // if createdAt doesn't exist, add to that field
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});

var Word = mongoose.model('Word', wordSchema);

module.exports = Word;
