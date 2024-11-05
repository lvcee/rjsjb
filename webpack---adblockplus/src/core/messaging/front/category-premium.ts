import * as messaging from "./messaging";
import { send } from "./utils";
export async function activate(userId) {
    const options = { userId };
    return await send("premium.activate", options);
}
export async function add(subscriptionType) {
    const options = { subscriptionType };
    await send("premium.subscriptions.add", options);
}
export async function get() {
    return await send("premium.get");
}
export async function getPremiumSubscriptionsState() {
    return await send("premium.subscriptions.getState");
}
export function listen(filter) {
    messaging.listen({ type: "premium", filter });
}
export async function remove(subscriptionType) {
    const options = { subscriptionType };
    await send("premium.subscriptions.remove", options);
}
