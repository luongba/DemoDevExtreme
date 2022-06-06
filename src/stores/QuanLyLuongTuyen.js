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
        async LayDanhSachLuongTuyenAction(store, key) {
            store;
            var load = this.$Helper.Common.DevExDataSourceCustom(
                async (loadOptions) => {
                    try {
                        let resp = await this.$Core.Api.QuanLyThongTin(
                            this.$i18n.global.t("urlQLTT.DanhSachLuongTuyen")
                        ).Post({
                            loadOptions: loadOptions,
                        });
                        console.log(resp);
                        if (resp.StatusCode === 200) {
                            let result = resp.Data.data || [];
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
        async XoaLuongTuyenAction(_, idLuongTuyen) {
            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.XoaLuongTuyen")
                ).Post({ idLuongTuyen });
                if (resp.StatusCode === 200) {
                    let result = resp.Data || {};
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
        async LayBenThuocTinhAction(_, idTinhThanh) {
            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.LayBenThuocTinh"),
                    {
                        idTinhThanh,
                    }
                ).Get();
                if (resp.StatusCode === 200) {
                    let result = resp.Data || {};
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
        async LayGoiYMaTuyenAction(_,MaTuyen){
            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.GoiYMaTuyen"),
                    {
                        MaTuyen,
                    }
                ).Get();
                if (resp.StatusCode === 200) {
                    let result = resp.Data || {};
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
        async ThemLuongTuyenAction(_, dataTuyen){
            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.ThemTuyen"),
                ).Post(dataTuyen);
                if (resp.StatusCode === 200) {
                    let result = resp.Data || {};
                    return result;
                } else {
                    return [];
                }
            } catch (ex) {
                if (ex.message == "Network Error")
                    throw Error("Không kết nối được đến máy chủ!");
                throw ex;
            }
        }
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
