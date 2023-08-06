import { Dayjs } from "dayjs"
import weekDays from "./weekDays"

type Schedule = {
    time: {
        start: Dayjs,
        end: Dayjs
    }
    days: typeof weekDays[]
}

export default Schedule