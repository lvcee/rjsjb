import * as messaging from "./messaging";
import { send } from "./utils";
export async function getBlockedPerPage(tab) {
    const options = { tab };
    return await send("stats.getBlockedPerPage", options);
}
export async function getBlockedTotal() {
    return await send("stats.getBlockedTotal");
}
export function listen(filter) {
    messaging.listen({ type: "stats", filter });
}
