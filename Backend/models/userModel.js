
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    security_ques: {
        type: String,
        required: true
    },
    security_ans: {
        type: String,
        required: true
    }

}, { collection: 'users' })

userSchema.statics.signup = async function (username, password, name, dob, security_ques, security_ans) {
    
    if (!username || !password || !name || !dob || !security_ques || !security_ans) {  
        throw Error(JSON.stringify({ error: 'All fields must be filled' }))
    }

    if (!validator.isEmail(username) && !validator.isMobilePhone(username, ['en-IN'])) {
        throw Error(JSON.stringify({ error_field: ['username'], error: 'Please enter a valid email/phone nummber' }))
    }

    if (!validator.isStrongPassword(password)) {
        throw Error(JSON.stringify({error_field:['password'],error:'Password is not strong enough'}))
    }

    const exists = await this.findOne({ username })
    if (exists) {
        throw Error(JSON.stringify({error_field: ['username'], error:`This email/phone number already exists`}))
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash, name, dob , security_ques, security_ans })
        .catch(err => {
            throw Error(JSON.stringify({error:`Cannot create an account: ${err}`}))
        })
    return user
}

userSchema.statics.login = async function (username, password) {
    
    if (!username || !password) {
        let error_field = [] ;
        if(!username){
            error_field =  ['username' ];
        }
        if(!password){
            error_field =  [...error_field,'password' ];
        }    
        throw Error(JSON.stringify({error_field ,error:'All fields must be filled'}))
    }

    const user = await this.findOne({ username })
    if (!user) {
        throw Error(JSON.stringify({ error_field: ['username'] ,  error:`This email/phone number is incorrect`}))
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error(JSON.stringify({error_field: ['password'], error:`The password is incorrect`}))
    }

    return user
}

userSchema.statics.resetPassword = async function (username, password) {
    
    if (!username || !password ) { 
        throw Error(JSON.stringify({ error: 'All fields must be filled' }))
    }

    if (!validator.isStrongPassword(password)) {
        throw Error(JSON.stringify({error_field:['password'],error:'Password is not strong enough'}))
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    const user = await this.findOneAndUpdate({username},{password:hash})
        .catch(err => {
            throw Error(JSON.stringify({error:`Cannot update the password: ${err.message}`}))
        })
    return user
}

module.exports = mongoose.model('user', userSchema)
