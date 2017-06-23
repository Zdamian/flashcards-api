var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var flashCardSchema = new Schema({
    category: { type: String, required: true },
    words: [
        {
            english: { type: String, required: true },
            polish: { type: String, required: true },
            known: Boolean
        }
    ]
});

// on every save, add the date
flashCardSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

var FlashCard = mongoose.model('FlashCard', flashCardSchema);

module.exports = FlashCard;
