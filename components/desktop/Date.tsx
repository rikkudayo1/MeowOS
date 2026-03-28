'use client'

import { useState, useEffect } from "react"

const DateTime = () => {
    const [currentDateTime, setCurrentDateTime] = useState<String>('')

    useEffect(() => {
        const UpdateDateTime = () => {
            const now = new Date().toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short',
            })
            setCurrentDateTime(now);
        }

        UpdateDateTime()
        const interval = setInterval(UpdateDateTime, 1000)
        return () => clearInterval(interval)
    }, [])
  return (
    <div>{currentDateTime}</div>
  )
}

export default DateTime