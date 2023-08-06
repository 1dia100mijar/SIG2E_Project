export default function updateArrayHelper<T>(array: Array<T>, idx: number, value: T){
    const temp = array
    temp[idx] = value
    return temp
}