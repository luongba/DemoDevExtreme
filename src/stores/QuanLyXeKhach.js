export default {
    namespaced: true,
    state: () => ({
        arrayXeKhach: [],
        chiTietXeKhach: {
            xx: "xxx",
        },
    }),

    mutations: {
        SET_CHI_TIET_BEN(state, chitietBen) {
            state.ChiTietBenXe = chitietBen;
        },
        SET_DATA_XE(state, data) {
            state.arrayXeKhach = data;
        },
        SET_CHI_TIET_XE(state, data) {
            state.chiTietXeKhach = data;
        },
    },

    actions: {
        async LayDanhSachXeKhach(store, key) {
            store;
            var load = this.$Helper.Common.DevExDataSourceCustom(
                async (loadOptions) => {
                    try {
                        let resp = await this.$Core.Api.QuanLyThongTin(
                            this.$i18n.global.t("urlQLTT.DanhSachXeKhach")
                        ).Post({
                            loadOptions: loadOptions,
                        });
                        if (resp.StatusCode === 200) {
                            let result = resp.Data.data || [];
                            store.commit("SET_DATA_XE", result);
                            return result;
                        } else {
                            return [];
                        }
                    } catch (ex) {
                        if (ex.message == "Network Error")
                            throw Error("Không kết nối được đến máy chủ!");
                        throw ex;
                    }
                },
                key || null
            );
            return load;
        },
        async XoaXekhachAction(store, idXe) {
            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.XoaXeKhach")
                ).Post({ idXe: idXe });
                if (resp.StatusCode === 200) {
                    let result = resp.Data || [];
                    return result;
                } else {
                    return [];
                }
            } catch (ex) {
                if (ex.message == "Network Error")
                    throw Error("Không kết nối được đến máy chủ!");
                throw ex;
            }
        },
        async DanhSachLoaiXe(store) {
            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.DanhSachLoaiXe")
                ).Get();
                if (resp.StatusCode === 200) {
                    let result = resp.Data || [];
                    return result;
                } else {
                    return [];
                }
            } catch (ex) {
                if (ex.message == "Network Error")
                    throw Error("Không kết nối được đến máy chủ!");
                throw ex;
            }
        },
        async DanhSachGSHT(store) {
            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.DanhSachHangGSHT")
                ).Get();
                if (resp.StatusCode === 200) {
                    let result = resp.Data || [];
                    return result;
                } else {
                    return [];
                }
            } catch (ex) {
                if (ex.message == "Network Error")
                    throw Error("Không kết nối được đến máy chủ!");
                throw ex;
            }
        },
        async themXeAction(store, data) {
            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.ThemXe")
                ).Post(data);
                if (resp.StatusCode === 200) {
                    let result = resp.Data || [];
                    return result;
                } else {
                    return [];
                }
            } catch (ex) {
                if (ex.message == "Network Error")
                    throw Error("Không kết nối được đến máy chủ!");
                throw ex;
            }
        },
        async LayChiTietXeAction(store, IdXe) {
            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.ChiTietXe"),
                    {
                        IdXe: IdXe,
                    }
                ).Get();
                if (resp.StatusCode === 200) {
                    let result = resp.Data.data || {};
                    result.HanDangKiem = result.HanDangKiem
                        ? new Date(result.HanDangKiem)
                        : null;
                    result.HanBaoHiem = result.HanBaoHiem
                        ? new Date(result.HanBaoHiem)
                        : null;
                    result.HanBienBanTheChap = result.HanBienBanTheChap
                        ? new Date(result.HanBienBanTheChap)
                        : null;
                    console.log(result)
                    store.commit("SET_CHI_TIET_XE", result);
                    return resp.Data;
                } else {
                    return [];
                }
            } catch (ex) {
                if (ex.message == "Network Error")
                    throw Error("Không kết nối được đến máy chủ!");
                throw ex;
            }
        },
        async SuaXeAction(store, data) {
            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.SuaXe")
                ).Post(data);
                if (resp.StatusCode === 200) {
                    let result = resp.Data || [];
                    return result;
                } else {
                    return [];
                }
            } catch (ex) {
                if (ex.message == "Network Error")
                    throw Error("Không kết nối được đến máy chủ!");
                throw ex;
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
