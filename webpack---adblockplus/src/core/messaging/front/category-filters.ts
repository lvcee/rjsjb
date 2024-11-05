import * as messaging from "./messaging";
import { send } from "./utils";
export async function get() {
    return await send("filters.get");
}
export function listen(filter) {
    messaging.listen({ type: "filters", filter });
}
