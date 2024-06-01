const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Your email is required"],
        unique: true,
    },
    username:{
        type: String,
        required: [true, "Your username is required"]
    },
    password:{
        type: String,
        required: [true, "Your password is required"]
    },
    createdAt:{
        type: Date,
        default: new Date(),
    },
    phoneNumber:{
        type: String,
    },
    dateOfBirth:{
        type: Date,
    },
    gender:{
        type: String,
    },
    profilePicture:{
        type: String,
    }
});

// A pre-save middleware that hashes the password before saving it to the database.
userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);

/* 
Middleware: Executes functions before certain events (like saving a document) or during the request-response cycle.
Router: Defines routes and associates them with specific controller functions.
Controller: Handles the logic for each route, interacts with the database, and sends responses to the client. 
*/