export default function dateFormater(date: string){
    const splited = date.split(":")
    return `${splited[0]}:${splited[1]}`
}