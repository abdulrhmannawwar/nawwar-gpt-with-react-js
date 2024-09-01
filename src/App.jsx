import { useState, useEffect, useRef } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';

function App() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null); // Move useRef hook to the top level of the component

  useEffect(() => {
    // Auto-scroll to the bottom whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Dependency array includes messages

  async function getResponse() {
    let options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "openai/gpt-3.5-turbo",
        "messages": [
          { "role": "user", "content": `${inputText}` },
        ],
      })
    };

    if (inputText) {
      let response = await fetch('https://openrouter.ai/api/v1/chat/completions', options);
      let data = await response.json();
      let message = data.choices[0].message.content;

      setMessages(prevMessages => [...prevMessages, { role: 'ai', content: message }]);
    }
  }

  function handleSend() {
    if (inputText) {
      setMessages(prevMessages => [...prevMessages, { role: 'user', content: inputText }]);
      getResponse();
      setInputText(''); 
    }
  }

  return (
    <div className='mainContent'>
      <h1 className='title'>Ask Nawwar GPT anything :)</h1>
      <hr />
      <div className='convo'>
        <div className='chat' ref={chatContainerRef} style={{ overflowY: 'auto', maxHeight: '400px' }}>
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? 'textRight' : 'textLeft'}>
              <p className='text'>{msg.content}</p>
            </div>
          ))}
        </div>
        <div className='forInput'>
          <Input
            inputText={inputText}
            setInputText={setInputText}
            handleSend={handleSend}
          />
          <Button
            inputText={inputText}
            setInputText={setInputText}
            handleSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
