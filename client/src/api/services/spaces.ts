import { get } from "../client";

export async function getSpaces(){
    return get("/space")
}