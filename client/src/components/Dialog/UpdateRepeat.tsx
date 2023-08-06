import { Box, Button } from "@mui/material"


type Props = {
    decrementFunction: () => void
    incrementFunction: () => void
}

export default function( {decrementFunction, incrementFunction}: Props){
    return (
        <Box>
            <Button 
                onClick={decrementFunction} 
                className="DialogTwoElementsRow"
            >
                -
            </Button>
            <Button
                onClick={incrementFunction} 
                className="DialogTwoElementsRow"
            >
                +
            </Button>
        </Box>
    )
}