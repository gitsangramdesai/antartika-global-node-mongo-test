var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/user');

var userSchema = new Schema({
    firstName:  { type: String, required: true ,minlength: 2, maxlength: 50 },
    lastName:  { type: String, required: true ,minlength: 2, maxlength: 50 },
    employeeId: { type: String, required: true, unique: true ,minlength: 2, maxlength: 150  },
    organization: { type: String, required: true,minlength: 2, maxlength: 100  },
    emailId: { type: String, required: true,minlength: 5, maxlength: 100  },
    password: { type: String, required: true,minlength: 8, maxlength: 150  },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
});

var User = mongoose.model('User', userSchema);

module.exports = {
   "User": User,
   "UserSchema":userSchema
}