'use client'
import React, { useState, FormEvent } from 'react'
import { json } from 'stream/consumers'
 
export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
 


  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true) // Set loading to true when the request starts
 
    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        body: JSON.stringify(
            {username: formData.get("name"),
             password:  formData.get("password  ")}
        )
      })
 
      // Handle response if necessary
      const data = await response.json()
      // ...
    } catch (error) {
      // Handle error if necessary
      console.error(error)
    } finally {
      setIsLoading(false) // Set loading to false when the request completes
    }
  }
 
  return (
    <form onSubmit={onSubmit} style={{color:'red'}}>
      <input type="text" name="name" />
      <input type="password" name="password" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  )
}

