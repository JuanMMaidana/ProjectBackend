function User (username, password, email, firstName, lastName, liked_ids, watch_later_ids) {
    let user = {
            username : username,
            password : password,
            email : email,
            firstName : firstName,
            lastName : lastName,
            liked_ids : liked_ids,
            watch_later_ids : watch_later_ids,
        }
        return user;
    }
module.exports = {
    User: User
}
