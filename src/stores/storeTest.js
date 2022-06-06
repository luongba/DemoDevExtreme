export default {
    namespaced: true,
    state: () => {},
    getters: {},
    mutations: {},
    actions: {
        async getComment({ commit }) {
            try {
                let rs = await this.$Core.Api.Test(
                    this.$i18n.global.t("url.LinkComment")
                ).Get();
                console.log(rs);
                return rs;
            } catch (ex) {
                console.log(ex);
            }
        },
    },
};
