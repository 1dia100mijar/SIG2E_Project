import express from 'express'
import routerEquipments from './routes/equipments.js'
import routerDesks from './routes/desks.js'
import routerLabs from './routes/labs.js'
import routerReservations from './routes/reservations.js'
import routerSpaces from './routes/spaces.js'
import routerIssues from './routes/issues.js'
import routerUsers from './routes/users.js'
import { updateReservationStatus } from './services/reservations.js'

import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(routerEquipments)
app.use(routerDesks)
app.use(routerLabs)
app.use(routerReservations)
app.use(routerSpaces)
app.use(routerIssues)
app.use(routerUsers)

app.listen(8080, () => {
    console.log(`Server listening in http://localhost:8080`)
    setInterval(updateReservationStatus, 60000)
})
