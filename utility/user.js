let users = [];


function userJoin(id ,username,channel) {
    const user = {id , username ,channel};

    users.push(user);

    return user;
}

function getCurrentUser(id) {
    return users.find((user) => user.id === id);
}

function userLeave(id){
    const myuser = users.find((user) => user.id === id);
    users = users.filter((user) => user.id !== myuser?.id && user.username)
    return myuser;
}

function getRoomUsers(channel){
    return users.filter(user => user.channel === channel)
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}