import * as messaging from "../../core/messaging/front";
function start() {
    if (self.modulesAsGlobal) {
        return;
    }
    self.modulesAsGlobal = { messaging };
}
start();
