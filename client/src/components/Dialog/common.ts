import { Autocomplete, Box } from "@mui/material"

export type Status = {
    open: boolean,
    close: () => void
}

export type Submit = {
    name: string,
    action: () => void
}
