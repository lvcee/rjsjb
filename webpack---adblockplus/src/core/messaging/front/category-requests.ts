import * as messaging from "./messaging";
export function listen(filter, tabId) {
    messaging.listen({ type: "requests", filter, tabId });
}
