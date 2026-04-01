import { useState, useEffect } from "react"
import { Calendar } from "../ui/calendar"

const CalendarApp = () => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [timezone, setTimezone] = useState<string | undefined>(undefined)

    useEffect(() => {
        setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    }, [])

    return (
        <div className="font-fredoka min-h-full overflow-x-hidden bg-black">
            <div className="flex w-full bg-black justify-center items-center">
                <Calendar
                    mode="single"
                    timeZone={timezone}
                    className="w-full max-w-[650px] p-25 bg-black"
                />
            </div>
        </div>
    )
}

export default CalendarApp