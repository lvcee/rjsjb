import * as messaging from "./messaging";
import { send } from "./utils";
export async function get(key) {
    const options = { key };
    return await send("prefs.get", options);
}
export function listen(filter) {
    messaging.listen({ type: "prefs", filter });
}
