import { Autocomplete, Box, TextField } from "@mui/material";

export default function autoCompleteBuilder(label: string, options: Array<unknown>, strict: boolean, inputChangeHandler: Function, className?: string, defaultValue?: string) {
    return (
     <>
         <Autocomplete
            key={label+options} // If the options change, the key changes, forcing the component to re-render
            defaultValue={defaultValue}
            disablePortal
            options={options}
            renderInput={(params) => <TextField {...params} label={label}/>}
            className={className}
            onInputChange={(event, v) => inputChangeHandler(v) }
            {... {freeSolo: !strict, sx: className === undefined ? {width: 300} : {}}}
         />
         {!className && <Box sx={{m:1}}/>}
     </>
    )      
 }