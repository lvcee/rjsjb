import * as messaging from "~/core/messaging/front";
import { isMessage } from "~/core/messaging/shared";
import { prepareElementForUnload } from "../../unload-cleanup/content";
import { DisplayValue } from "../../unload-cleanup/shared";
let iframe = null;
let overlay = null;
function handleMessage(message) {
    if (!isMessage(message)) {
        return;
    }
    switch (message.type) {
        case "onpage-dialog.hide":
            hideDialog();
            break;
        case "onpage-dialog.resize":
            if (!iframe) {
                break;
            }
            if (!isResizeMessage(message)) {
                break;
            }
            iframe.style.setProperty("--abp-overlay-onpage-dialog-height", `${message.height}px`);
            break;
        case "onpage-dialog.show":
            if (!isShowMessage(message)) {
                break;
            }
            showDialog(message.platform);
            break;
        default:
    }
}
function hideDialog() {
    if (overlay === null || overlay === void 0 ? void 0 : overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
    }
    iframe = null;
    overlay = null;
}
function isResizeMessage(message) {
    return message.type === "onpage-dialog.resize" && "height" in message;
}
function isShowMessage(message) {
    return message.type === "onpage-dialog.show" && "platform" in message;
}
function showDialog(platform) {
    overlay = document.createElement("div");
    overlay.setAttribute("id", "__abp-overlay-onpage-dialog");
    iframe = document.createElement("iframe");
    iframe.setAttribute("frameborder", "0");
    if (platform !== "gecko") {
        iframe.setAttribute("sandbox", "");
    }
    iframe.addEventListener("load", () => {
        if (!(iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow)) {
            return;
        }
        iframe.contentWindow.postMessage("onpage-dialog.start", "*");
    });
    overlay.appendChild(iframe);
    document.body.appendChild(overlay);
    void prepareElementForUnload(overlay, DisplayValue.block);
    if (platform === "gecko") {
        iframe.setAttribute("sandbox", "");
    }
}
function start() {
    browser.runtime.onMessage.addListener(handleMessage);
    messaging.addDisconnectListener(() => {
        stop();
    });
}
function stop() {
    browser.runtime.onMessage.removeListener(handleMessage);
    hideDialog();
}
start();
