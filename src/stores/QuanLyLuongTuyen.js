export default {
    namespaced: true,
    state: () => ({
        arrayXeKhach: [],
        chiTietLuongTuyen: {
            idBenDen: "",
            idBenDi: "",
            idTinhDen: "",
            idTinhDi: "",
            loTrinhDi: {
                hanhTrinhChay: "",
                cuLy: "",
                gioXuatBens: [],
                diemDungNghis: [],
            },
            loTrinhVe: {
                hanhTrinhChay: "",
                cuLy: "",
                gioXuatBens: [],
                diemDungNghis: [],
            },
            maTuyen: "",
        },
    }),

    mutations: {
        CHI_TIET_LUONG_TUYEN(state, data) {
            state.chiTietLuongTuyen = data
        }
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
        async LayGoiYMaTuyenAction(_, MaTuyen) {
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
        async ThemLuongTuyenAction(_, dataTuyen) {
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
        },
        async chiTietLuongTuyenAction({ commit }, idLuongTuyen) {
            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.ChiTietTuyen"),
                    {
                        idLuongTuyen,
                    }
                ).Get();
                if (resp.StatusCode === 200) {
                    let result = resp.Data.data || {};
                    let temp = {
                        idBenDen: result.IdBenDen,
                        idBenDi: result.IdBenDi,
                        idTinhDen: result.IdTinhDen,
                        idTinhDi: result.IdTinhDi,
                        loTrinhDi: {
                            hanhTrinhChay: result.LoTrinhDi.HanhTrinhChay,
                            cuLy: result.LoTrinhDi.CuLy,
                            gioXuatBens: result.LoTrinhDi.GioXuatBens.map(item => {
                                return {

                                    GioXuatBen: item.GioXuatBen,
                                }
                            }),
                            diemDungNghis: result.LoTrinhDi.DiemDungNghis.map(item => {
                                return {
                                    TenDiemDung: item.TenDiemDung,
                                }
                            }),
                        },
                        loTrinhVe: {
                            hanhTrinhChay: result.LoTrinhVe.HanhTrinhChay,
                            cuLy: result.LoTrinhVe.CuLy,
                            gioXuatBens: result.LoTrinhVe.GioXuatBens.map(item => {
                                return {

                                    GioXuatBen: item.GioXuatBen,
                                }
                            }),
                            diemDungNghis: result.LoTrinhVe.DiemDungNghis.map(item => {
                                return {
                                    TenDiemDung: item.TenDiemDung,
                                }
                            }),
                        },

                        maTuyen: result.MaTuyen,
                    } || {}
                    commit("CHI_TIET_LUONG_TUYEN", temp)
                } else {
                    return [];
                }
            } catch (ex) {
                if (ex.message == "Network Error")
                    throw Error("Không kết nối được đến máy chủ!");
                throw ex;
            }
        },
        async SuaLuongTuyenAction(_, data){
            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.SuaLuongTuyen"),
                ).Post(data);
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
        resetChitiet({ commit }) {
            commit("CHI_TIET_LUONG_TUYEN", {
                idBenDen: "",
                idBenDi: "",
                idTinhDen: "",
                idTinhDi: "",
                loTrinhDi: {
                    hanhTrinhChay: "",
                    cuLy: "",
                    gioXuatBens: [],
                    diemDungNghis: [],
                },
                loTrinhVe: {
                    hanhTrinhChay: "",
                    cuLy: "",
                    gioXuatBens: [],
                    diemDungNghis: [],
                },
                maTuyen: "",
            })
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
