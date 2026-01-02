import { useState } from 'react'

import { Chatbot } from 'supersimpledev'

import RobotProfileImage from './assets/robot.png'

import UserProfileImage from './assets/user.jpg'

import LoadingSpinner from './assets/loading-spinner.gif'

import './App.css'





  function ChatInput(props) {
      const chatMessages = props.chatMessages;
    const setChatMessages = props.setChatMessages;

      //WE ARE SAVING THE "INPUT TEXT" USING (useState)
      const [inputText, setInputText] =  useState('');


      // "EVENT HANDLER" FUNCTION FOR THE INPUTING TEXTBOX 
      const saveInputText = (event) => {
        // console.log(event.target.value);
        setInputText(event.target.value);
      }



      // "EVENT HANDLER" FUNCTION THAT AUTHENTICATE THE "ENTER" BUTTON WHEN CLICKED 
      function handleKeyDown(event) {
        
        /*
          A CONDITION THAT CHECKS IF THE PRESSED KEY IS "Escape" OR "Enter" USING if() else if() {} statement
        */
        // if(event.key === 'Enter') {
        //   sendMessage();
          
        //   alert(`${inputText}`);
        // }
        // else if (event.key === 'Escape') {
        //   // CHECKS IF THE PRESSED KEY IS "Escape"
        //    setInputText('');

        //    //BLUR THE INPUT FIELD AFTER CLEARING
        //    event.target.blur();
        // }


        /*
          A CONDITION THAT CHECKS IF THE PRESSED KEY IS "Escape" OR "Enter" USING - switch case statement
        */
        switch(event.key){
          case "Enter":
            sendMessage();
            alert(`You Pressed "Enter": ${inputText}`);
            break;
            
          case "Escape":
            setInputText('');
            alert(`You Pressed "ESC": ${inputText}`);
            //BLUR THE INPUT FIELD AFTER CLEARING
            event.target.blur();
            break;

          default:
            // HANDLE OTHER KEY OR DO NOTHING
            break;

        }
        

      }


      
      // "EVENT HANDLER" FUNCTION FOR WHEN THE BUTTON IS CLICKED TO TRIGGER THE INPUT (Create a handler function for when the button is clicked)
      // NOW USING "async / await"
      async function sendMessage() {

        setInputText('');
        //console.log(`Inputered Vale: ${inputText}`);

        // setChatMessages(
        //   [...chatMessages,{
        //     // message: 'test',
        //     message: inputText,
        //     sender: 'user',
        //     id: crypto.randomUUID()
        //   }
        // ]);
        const newChatMessages = [
          ...chatMessages,
          {
            // message: 'test',
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID()
          }
        ];

        setChatMessages(newChatMessages);

          setChatMessages([
            ...newChatMessages,
            {
              // message: 'test',
              message: <img src={LoadingSpinner} className="loading-spinner" />,
              sender: 'robot',
              id: crypto.randomUUID()
            }
        ]);

        // "await" USED FOR THE RESPONSE REQUEST
        const response = await Chatbot.getResponseAsync(inputText);


        // console.log(response);
        setChatMessages([
            ...newChatMessages,
            {
              // message: 'test',
              message: response,
              sender: 'robot',
              id: crypto.randomUUID()
            }
        ]);

        // setInputText('');
      }


      return (
          <div className="input-container">
              <input 
                placeholder="Hello, I'm your ChatBot Agent" 
                size={30} 
                onChange={saveInputText}
                value={inputText}
                onKeyDown={handleKeyDown}
                className="input-textbox"
              />
              <button 
                onClick={sendMessage}
                className="send-button"
              > 
                Send 
              </button>


          </div>
      );
  } 




  function ChatMessage(props) {
    const message = props.message;
    const sender = props.sender;
    
    // const {message, sender, chatMessages} = props;

    

    if(sender === 'robot') {
      return (
        <div className={sender === 'robot' ? 'chat-message-robot' : 'chat-message-user'}>
          <img src={RobotProfileImage} className="chat-message-profile" />

          <div className="chat-message-text">
            {message}
          </div>
        </div>
      );
    }

      return (
        <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-user'}>

          <div className="chat-message-text">
            {message}
          </div>
          <img src={UserProfileImage} className="chat-message-profile" />
        </div>
      );
      
  } 





  /*
      INSTEAD OF MANUALLY TYPING A NEW CHART MESSAGE COMPONENT, WE WILL USE "JAVASCRIPT" TO GENERATE THIS COMPONENTS. WE GOONA DO (2 STEPS)

      1. SAVE THE DATA (DATA MEANS INFORMATION) 
      2. GENERATING THE HTML (using javascript to convert the Data into component)
  */
  function App() {
    // const chatMessages = [
    //   {message: 'hello chatbot', sender: 'user', id: 'id1'},
    //   {message: 'Hello! How can i help you?', sender: 'robot', id: 'id2'},
    //   {message: 'can you get me todays date?', sender: 'user', id: 'id3'},
    //   {message: 'Today is September 27', sender: 'robot', id: 'id4'}
    // ];

    // SAVING THE DATA (DATA MEANS INFORMATION)
    const array = useState(
      [
        /* REMOVED ALL THE DEFAULT MESSAGES */
        // {message: 'hello chatbot', sender: 'user', id: 'id1'},
        // {message: 'Hello! How can i help you?', sender: 'robot', id: 'id2'},
        // {message: 'can you get me todays date?', sender: 'user', id: 'id3'},
        // {message: 'Today is September 27', sender: 'robot', id: 'id4'}
      ]
    );

    const chatMessages = array[0]; 
    const setChatMessages = array[1];

    

    
    // //EVENT HANDLER FUNCTION
    // function sendMessage() {
    //   // // console.log('send message');
    //   // chatMessages.push({
    //   //   message: 'Test', 
    //   //   sender: 'user', 
    //   //   id: crypto.randomUUID()
    //   // });
    //   // console.log(chatMessages);

    //   setChatMessages([
    //     ...chatMessages ,
    //     {
    //       message: 'test',
    //       sender: 'user',
    //       id: crypto.randomUUID()
    //     }
    //   ]);
    // }



    // 2nd GENERATING THE HTML (using javascript to convert the Data into this components)

    // AN ARRAY OR LIST OF COMPONENTS
    const chatMessageComponents = chatMessages.map((chatMessage) => {
      
      return(
        <div className="app-container chat-messages-container">
          {
            /* CHECK , IF THERE IS NO "chatMessages" DISPLAY A WELCOME MESSAGE THEN */
            // (chatMessage.length === 0) && (
              // <p className="welcome-message">
              //   Welcome to the chatbot project! Send a message using the textbox below.
              // </p>
            // )

            // (chatMessage.length === 0) ?
            //   <p className="welcome-message">
            //     Welcome to the chatbot project! Send a message using the textbox below.
            //   </p>  : chatMessage
              
            // // )
          }

          <ChatMessage
            message = {chatMessage.message}
            sender = {chatMessage.sender}
            key={chatMessage.id}
            
          />
        </div>
      );
    });


    /*
    return (
      <>
        <ChatInput />

        <ChatMessage 
          message="hello chatbot" 
          sender="user">
        </ChatMessage>
        
        <ChatMessage 
          message="Hello! How can i help you?" 
          sender="robot">
        </ChatMessage>

        <ChatMessage 
          message="can you get me todays date?" 
          sender="user">
        </ChatMessage>

        <ChatMessage 
          message="Today is September 27" 
          sender="robot">
        </ChatMessage>
      </>
    );
    */
    
    //WE ARE NOW GENERATING IT, THE "MESSAGES"
    return (
      <>
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        >
        </ChatInput>
        
        {chatMessageComponents}
      </>
    );

  }

export default App
