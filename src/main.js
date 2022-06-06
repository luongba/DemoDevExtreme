/* CSS */
import "../bootstrap/css";

/* loading & showing loading */
import loading, {showLoading, hideLoading} from "../bootstrap/loading";
showLoading();

/* config and my-assets */
import {TimeOut, AppInfo} from "../configs/base";
import vi from "../public/vi.json";

/* 3rd-utils */
import { createI18n } from "vue-i18n";
import { locale, loadMessages } from "devextreme/localization";
import mitt from "mitt";

/* my-helpers */
import $Core from "../bootstrap/$Core";
import Helper from "./utils/Helper";
import App from "./App";

/* app-logic */
import vuex from "./vuex";
import createRouter from "./router";

/* vue3-utils */
import { createStore } from "vuex";
import { createApp } from "vue";

/* define 3rd-utils */
const $i18n = createI18n({
    locale: "string",
    fallbackLocale: "en",
    messages: {
        string: require("../public/string.json")
    }
});
const emitter = mitt();

/* define my-utils */
const $Helper = new Helper($Core);

const store = createStore(vuex);
store.$Core = $Core;
store.$Helper = $Helper;
store.$i18n = $i18n;
store.startLoading = showLoading;
store.stopLoading = hideLoading;

/* debug */
window.$Core = $Core;
window.$store = store;
window.$Helper = $Helper;
window.$loading = loading;

/* main-handler */
(async function SonPhatNumberOne(app) {
    console.log("READY", await $Core.Auth.Ready());

    const router = createRouter($Core);

    app.config.globalProperties.$appInfo = AppInfo;
    app.config.globalProperties.emitter = emitter;
    app.use(router);
    app.use($i18n);
    app.use({
        install(app) {
            let prototype = app.config.globalProperties;
            function protoDefProp (propName, getter, setter) {
                let propMap = {};
                getter && (propMap.get = getter);
                setter && (propMap.get = setter);
                Object.defineProperty(prototype, propName, propMap);
            }

            protoDefProp("$startLoading", () => {
                showLoading();
                setTimeout(() => {
                    hideLoading();
                }, TimeOut);
                return true;
            });
            protoDefProp("$stopLoading", () => (hideLoading(), true));
            protoDefProp("$Core", () => $Core);
            protoDefProp("$Helper", () => $Helper);
            protoDefProp("$Nope");
        }
    });

    app.use(store);

    app.mount("#app");

    loadMessages(vi);
    locale("vi");

    hideLoading();
})(createApp(App, {
    
}));
