const sendChatBtn = document.querySelector('[data-sendBtn]');
const chatInput = document.querySelector('[data-chatInput]');
const chatbox = document.querySelector('[data-chatbox]');
const chatTogglerBtn = document.querySelector('[data-chatTogglerBtn]');
const closeBtn = document.querySelector('[data-closeBtn]');

//generate your own api key
 import API_KEY  from './data.js';

let userMessage = null;
const inputHeight = chatInput.scrollHeight;


const createChat = (message, className ) =>{
     const userChat = document.createElement('li');
     userChat.classList.add('chat',className);
     let userChatText = className === "outgoing" ? `  <p></p> `: ` <span class="material-symbols-outlined">smart_toy</span><p></p> `;
     userChat.innerHTML = userChatText;
     userChat.querySelector("p").textContent = message;
     return userChat;
}


    const loader = document.createElement('div');
    loader.classList.add('loader');



const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");
    // Define the properties and message for the API request
    
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }
    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => {
        loader.classList.remove('active');
        chatbox.scrollTo(0, chatbox.scrollHeight)
    });
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return ;
    chatbox.appendChild(createChat(userMessage , "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    
    
    setTimeout(()=>{
        const incomingChat = createChat("" , "incoming")
        chatbox.appendChild(incomingChat);
        incomingChat.appendChild(loader)
        loader.classList.add('active');
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChat);
    },600)
    chatInput.value = "";
}


chatInput.addEventListener('input', () => {
    if(chatInput.value.length > 0){
        if (chatInput.validity.valid) { // Use chatInput, not input
            sendChatBtn.classList.add('visible');
        } else {
            sendChatBtn.classList.remove('visible');
        }
    }
   else {
         sendChatBtn.classList.remove('visible');
   }
});


chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});


chatTogglerBtn.addEventListener('click',()=>{
    document.body.classList.toggle('show-chatbot');
})

closeBtn.addEventListener('click',()=>{
    document.body.classList.remove('show-chatbot');
})
sendChatBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    handleChat();
})





