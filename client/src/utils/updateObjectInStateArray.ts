export default function updateObjectInStateArray<T, V>(array: Array<T>, setFunction: Function){
    return function(index: number, field: keyof T){
        return function(value: V){
            const tempArr = array.map( (item, idx) => {
                if (idx === index){
                    return {... item, [field]: typeof item[field] === "number" ? Number(value) : value}
                }
                return item
            })
            setFunction(tempArr)
        }
    }
}
