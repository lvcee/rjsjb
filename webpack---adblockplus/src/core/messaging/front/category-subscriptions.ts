import * as messaging from "./messaging";
import { send } from "./utils";
export async function add(url) {
    const options = { url };
    return await send("subscriptions.add", options);
}
export async function get(options) {
    return await send("subscriptions.get", options !== null && options !== void 0 ? options : {});
}
export async function getInitIssues() {
    return await send("subscriptions.getInitIssues");
}
export async function getRecommendations() {
    return await send("subscriptions.getRecommendations");
}
export function listen(filter) {
    messaging.listen({ type: "subscriptions", filter });
}
export async function remove(url) {
    const options = { url };
    await send("subscriptions.remove", options);
}
