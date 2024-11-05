import * as messaging from "./messaging";
import { send } from "./utils";
const platformToStore = new Map([
    ["chromium", "chrome"],
    ["edgehtml", "edge"],
    ["gecko", "firefox"]
]);
export async function get(what) {
    const options = { what };
    return await send("app.get", options);
}
export async function getInfo() {
    var _a;
    const [application, platform] = await Promise.all([
        get("application"),
        get("platform")
    ]);
    let store;
    if (application !== "edge" && application !== "opera") {
        store = (_a = platformToStore.get(platform)) !== null && _a !== void 0 ? _a : "chrome";
    }
    else {
        store = application;
    }
    return {
        application,
        manifestVersion: browser.runtime.getManifest().manifest_version,
        platform,
        store
    };
}
export function listen(filter) {
    messaging.listen({ type: "app", filter });
}
export async function open(what, parameters = {}) {
    const options = { what, ...parameters };
    await send("app.open", options);
}
