import { dialogFields_Type } from "../context/types";

export default function(obj: dialogFields_Type){
    Object.keys(obj).forEach( (key: string) => obj[key].setValue('') )
}