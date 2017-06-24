var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: { type: String, required: true },
    createdAt: Date,
    updatedAt: Date
});

// on every save, add the date
categorySchema.pre('save', function(next) {
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

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
