const chatMessageBox = document.querySelector(".chat__messagebox")
const chatBox = document.querySelector(".chat__messagebox__messages");
const chatSideBar = document.querySelector(".chat__sidebar");
const LogInButton = document.querySelector("#enterchatbutton");
const usernameinput = document.querySelector("#usernameinput");
const channelnameinput = document.querySelector("#channelnameinput");
const LogOutButton = document.querySelector("#logout");
const ChannelName = document.querySelector(".chat__sidebar__channel__channelname");
const ChannelUsers = document.querySelector(".chat__sidebar__users__users");

const {username, channel} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})
const socket = io();
socket.emit('JoinRoom', {username ,channel})
socket.on('roomUsers' , ({channel , users}) => {
    console.log(channel , users)
    outputChannelName(channel);
    outputUsers(users)
})
socket.on('message', message => {
    outputMessage(message);
    chatBox.scrollTop = chatBox.scrollHeight;

})


LogOutButton?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location = `/`;
    ChannelName.innerText = ""
    ChannelUsers.innerHTML=""
})

LogInButton?.addEventListener('click',(e) => {
    e.preventDefault();
    const username = usernameinput.value;
    const channel = channelnameinput.value;
    window.location = `chat.html?username=${username}&channel=${channel}`
    chatMessageBox.innerHTML= `
        <div class="chat__messagebox__messages"></div>
        <form
            class="chat__messages__actions"
            >
                <input
                    id="message"
                    class="chat__messages__actions__input"
                    placeholder="متن پیام"
                />
                <button
                    class="chat__messages__action__button"
                >
                    ارسال
                </button>
            </form>
        `
} )

const DOM_form = document.querySelector(".chat__messages__actions");
DOM_form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    socket.emit('chatMessage', message);
    e.target.elements.message.value = "";
    e.target.elements.message.focus();
})


function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add("chat__messagebox__messages__message");
    div.innerHTML = ` <div class="chat__messagebox__messages__senderinfo">
                        <p>${message.user}</p>
                        <h6>${message.time}</h6>
                    </div>
                    <div class="chat__messagebox__messages__message__text">
                       ${message.message}
                    </div>`
    document.querySelector(".chat__messagebox__messages").appendChild(div);
}

function outputChannelName(channel) {
    if(ChannelName){
        ChannelName.innerText = channel
    }
}

function outputUsers (users) {
    console.log('users: ',users)
    if(ChannelUsers){
        ChannelUsers.innerHTML = `
        ${users.map((user) => `<li>${user.username}</li>`)}
    `
    }
}