import { useState, useRef, useEffect } from 'react'
import { sendChatMessage } from '@/modules/api/chat/chat'

export const useChat = () => {
  const [chatList, setChatList] = useState([
    { id: 0, type: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' },
  ])
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatList])

  const handleSend = async (text) => {
    if (!text.trim()) return

    const userMsg = { id: Date.now(), type: 'user', text }
    const loadingMsg = {
      id: Date.now() + 1,
      type: 'loading',
      text: '답변을 생성 중입니다...',
    }

    setChatList((prev) => [...prev, userMsg, loadingMsg])

    try {
      const answer = await sendChatMessage(text)
      const botMsg = {
        id: Date.now() + 2,
        type: 'bot',
        text: answer,
      }
      setChatList((prev) => [...prev.slice(0, -1), botMsg])
    } catch (err) {
      const fallback = {
        id: Date.now() + 3,
        type: 'bot',
        text: err.message,
      }
      setChatList((prev) => [...prev.slice(0, -1), fallback])
    }
  }

  return {
    chatList,
    chatEndRef,
    handleSend,
  }
}
