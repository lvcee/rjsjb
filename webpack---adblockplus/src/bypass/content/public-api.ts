import browser from "webextension-polyfill";
const eventQueue = [];
const maxErrorThreshold = 30;
const maxQueuedEvents = 20;
const processingDelay = 100;
let errorCount = 0;
let processingIntervalId = null;
async function getPayloadAndExtensionInfo(event) {
    return await browser.runtime.sendMessage({
        type: "premium.getAuthPayload",
        signature: event.detail.signature,
        timestamp: event.detail.timestamp
    });
}
function handleFlattrRequestPayloadEvent(event) {
    if (eventQueue.length >= maxQueuedEvents) {
        return;
    }
    eventQueue.push(event);
    startProcessingInterval();
}
function isAuthRequestEvent(event) {
    return (event.detail &&
        typeof event.detail.signature === "string" &&
        typeof event.detail.timestamp === "number");
}
function isTrustedEvent(event) {
    return (Object.getPrototypeOf(event) === CustomEvent.prototype &&
        !Object.hasOwnProperty.call(event, "detail"));
}
async function processNextEvent() {
    const event = eventQueue.shift();
    if (event && isTrustedEvent(event) && isAuthRequestEvent(event)) {
        try {
            const result = await getPayloadAndExtensionInfo(event);
            if (!result || (!result.payload && !result.extensionInfo)) {
                throw new Error("Premium request rejected");
            }
            const { payload, extensionInfo } = result;
            let detail = { detail: { payload, extensionInfo } };
            if (typeof cloneInto === "function") {
                detail = cloneInto(detail, document.defaultView);
            }
            document.dispatchEvent(new CustomEvent("flattr-payload", detail));
            stop();
        }
        catch (ex) {
            errorCount += 1;
            if (errorCount >= maxErrorThreshold) {
                stop();
            }
        }
    }
    if (!eventQueue.length) {
        stopProcessingInterval();
    }
}
function startProcessingInterval() {
    if (processingIntervalId) {
        return;
    }
    void processNextEvent();
    processingIntervalId = setInterval(() => {
        void processNextEvent();
    }, processingDelay);
}
function stopProcessingInterval() {
    if (processingIntervalId !== null) {
        clearInterval(processingIntervalId);
    }
    processingIntervalId = null;
}
function start() {
    document.addEventListener("flattr-request-payload", handleFlattrRequestPayloadEvent, true);
}
function stop() {
    document.removeEventListener("flattr-request-payload", handleFlattrRequestPayloadEvent, true);
    eventQueue.length = 0;
    stopProcessingInterval();
}
start();
