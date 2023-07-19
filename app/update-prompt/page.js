"use client"
import {useState, useEffect} from 'react'
import { useSession } from "next-auth/react"
import { useRouter,useSearchParams } from "next/navigation"
import Form from '@/components/Form'
function UpdatePrompt() {
  // const {data: session} = useSession()
  const router = useRouter()
  const seachParams = useSearchParams()
  const promptId = seachParams.get('id')
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({prompt: '', tag: ''})
  useEffect(() => {
    const getPromptDetail = async() => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()
      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }
    if (promptId) getPromptDetail()
  },[promptId])

  const editPrompt = async(e) => {
    e.preventDefault()
    if (!promptId) {
      return console.log('Prompt Id is not found')
    }
    setSubmitting(true)
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }

  }
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  )
}

export default UpdatePrompt
