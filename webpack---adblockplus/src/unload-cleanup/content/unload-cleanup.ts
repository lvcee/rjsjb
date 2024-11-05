export async function prepareElementForUnload(element, displayValue) {
    const message = {
        type: "unload-cleanup.getClassName"
    };
    const className = await browser.runtime.sendMessage(message);
    if (typeof className === "undefined") {
        return;
    }
    element.classList.add(`${className}--${displayValue}`);
    element.style.display = "none";
}
