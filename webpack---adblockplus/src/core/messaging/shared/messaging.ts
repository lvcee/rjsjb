export function getMessageResponse(responses) {
    for (const response of responses) {
        if (typeof response !== "undefined") {
            return response;
        }
    }
}
export function isEventMessage(candidate) {
    return isMessage(candidate) && "action" in candidate && "args" in candidate;
}
export function isMessage(candidate) {
    return (candidate !== null && typeof candidate === "object" && "type" in candidate);
}
export function isListenMessage(candidate) {
    return isMessage(candidate) && "filter" in candidate;
}
export function isPremiumActivateOptions(candidate) {
    return (candidate !== null && typeof candidate === "object" && "userId" in candidate);
}
export function isPremiumSubscriptionsAddRemoveOptions(candidate) {
    return (candidate !== null &&
        typeof candidate === "object" &&
        "subscriptionType" in candidate);
}
