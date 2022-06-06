export default {
    namespaced: true,
    state: () => ({
        CheckTaoTaiKhoan: true,
    }),

    mutations: {
        Set(state, { key, data }) {
            state[key] = data;
        },
        Unset(state, { key }) {
            delete state[key];
        },
    },

    actions: {
        async KiemTraTaiKhoanTonTai(store, TenTaiKhoan) {
            store;
            try {
                let result = await this.$Core.Api.TaiKhoan(
                    this.$i18n.global.t("urlTaiKhoan.KiemTraTonTai")
                ).Post({
                    TenTaiKhoan: TenTaiKhoan,
                });
                return result.Data;
            } catch (ex) {
                if (ex.message == "Network Error")
                    throw Error("Không kết nối được đến máy chủ!");
                throw ex;
            }
        },

        async getDataPost(store, query) {
            try {
                let result = await this.$Core.Api.Test(
                    this.$i18n.global.t("url.LinkTest")
                ).Get();
                return result;
            } catch (error) {
                console.log("error", error);
            }
        },
    },
};

function set(store, key, data) {
    store.commit("Set", {
        key: key,
        data: data,
    });
}
// function unset(store, key) {
//     store.commit("Unset", {
//         key: key
//     });
// }
