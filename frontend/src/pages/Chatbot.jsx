import React from 'react'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const Chatbot = () => {
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const ask = async () => {
    if (query.trim() === '') return

    // setLoading(true); // Set loading to true
    // const response = await fetch(
    //   `https://threebeans-4coffee-level-super-mind.onrender.com/chatbot`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "ngrok-skip-browser-warning": "true",
    //     },
    //     body: JSON.stringify({ message: query }),
    //   }
    // );

    // const data = await response.json();
    await setMessage(prevMessages => [
      ...prevMessages,
      { text: query, isUser: true }
    ])

    setQuery('')
    setLoading(true) // Set loading to true

    const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
    await wait(1000)

    const botResponse =
      '**I am a bot**. I am not capable of answering your question. Please ask a human. lorem ipsum dolor sit amet, consectetur adipiscing elit.'

    setMessage(prevMessages => [
      ...prevMessages,

      { text: botResponse, isUser: false }
    ])
    setLoading(false) // Set loading to false
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      ask()
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

  return (
    <>
      <div
        className='flex-1 z-10 overflow-hidden relative min-h-screen bg-[#000622]'
        style={{ height: 66.666667 + 'vh' }}
      >
        <div
          id='ans'
          className='overflow-y-scroll  mt-16 p-4 rounded-xl h-3/4 w-3/4 mx-auto scrollbar-hide'
        >
          {message.map((msg, index) => (
            <div
              key={index}
              className={`px-4 py-2 leading-relaxed  lg:max-w-[70%]  max-w-[100%] w-fit rounded-md my-2 ${
                msg.isUser
                  ? 'ml-auto bg-indigo-600 text-white'
                  : 'mr-auto bg-neutral-100 text-black'
              }`}
            >

              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}

          {loading && (
            <div className="bg-neutral-100 p-4 max-w-[70%]  w-fit text-black rounded-xl my-2 mr-auto">
              Typing...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className='flex items-center my-4 p-2 space-x-2 max-w-2xl mx-auto pt-4 px-4'>
          <input
            id='ques'
            type='text'
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Ask about socials'
            className='flex-1 p-2 bg-neutral-100 text-black placeholder-gray-600 rounded-md focus:outline-none'
            autoComplete='off'
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={ask}
            className='bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md focus:outline-none'
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'wait' : 'Ask'}
          </button>
        </div>
      </div>
    </>
  )
}

export default Chatbot
