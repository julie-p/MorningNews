var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true, 
    useUnifiedTopology: true
};

mongoose.connect('mongodb+srv://admin:0tJdyYI0eSn08hf4@cluster0-qrl6v.mongodb.net/morningnews?retryWrites=true&w=majority',
    options,
    function(err) {
        console.log(err)
    }
);

module.exports = mongoose;