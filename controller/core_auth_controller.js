const fs = require("fs");

let registerUser = (user) => {
    return new Promise ((resolve, reject) => {
        const {username, password} = user;
        const databaseString = `${username},${password}\n`
    
        fs.appendFile("fakeDatabase.txt", databaseString, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(user)
            }
        })
    })
}

let loginUser = (username, password) => {
    return new Promise ((resolve, reject) => {
        fs.readFile("fakeDatabase.txt", {encoding: 'utf8'}, (err, databaseData) => {
            if (err) {
                reject(err)
            }
            else {
                let arr = databaseData.split("\n");
                credentials = []
                for (i=0; i < arr.length; i++) {
                    userCredentials = {}
                    storedCredentials = arr[i].split(',');
                    userCredentials['username'] = storedCredentials[0];
                    if (typeof storedCredentials[1] == 'undefined') {
                        userCredentials['password'] = storedCredentials[1];
                    }
                    else {
                        userCredentials['password'] = storedCredentials[1].replace('\r',"");
                    }
                    credentials.push(userCredentials)
                }

                for (i=0; i< credentials.length; i++) {
                    if (username == credentials[i]['username']){
                        if (password == credentials[i]['password']) {
                            resolve("You are logged in!")
                        }
                    }
                }
            }
        })
    })
}

module.exports = {registerUser, loginUser}