export default {
    namespaced: true,
    state: () => ({
        ChiTietBenXe: {}
    }),

    mutations: {
        SET_CHI_TIET_BEN(state, chitietBen){
            state.ChiTietBenXe = chitietBen
        }
    },

    actions: {
        async LayDanhSachBenDen(store, key) {
            store;
            var load = this.$Helper.Common.DevExDataSourceCustom(
                async (loadOptions) => {
                    try {
                        let resp = await this.$Core.Api.QuanLyThongTin(
                            this.$i18n.global.t("urlQLTT.DanhSachBenXe")
                        ).Post({
                            loadOptions: loadOptions,
                        });
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
        async LayDanhSachLoaiBenDen(store) {
            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.DanhSachLoaiBen")
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
        async LayDanhSachTinhThanh(store) {
            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.DanhSachTinhThanh")
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
        async LayDanhSachHuyen(store, tinh) {

            try {
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.DanhSachHuyen"),
                    {
                        idTinh: tinh
                    }
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

        async TaoBenMoi(store, thongTinBen) {
            try {

                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.ThemMoiBenXe"),
                    
                ).Post(thongTinBen);
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
        async SuaBen(store, thongTinBen) {
            try {
                
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.SuaBenXe"),
                    
                ).Post(thongTinBen);
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
        async XoaBen(store, IdBenXe) {
            try {
                
                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.XoaBenXe"),
                    
                ).Post({IdBenXe: IdBenXe});
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
        async LayChiTietBenXe({commit}, IdBenXe) {
            try {

                let resp = await this.$Core.Api.QuanLyThongTin(
                    this.$i18n.global.t("urlQLTT.ChiTietBenXe"),{
                        IdBenXe: IdBenXe
                    }
                    
                ).Get();
                if (resp.StatusCode === 200) {
                    let result = resp.Data || [];
                   commit("SET_CHI_TIET_BEN", result.data)
                } else {
                    return [];
                }
            } catch (ex) {
                if (ex.message == "Network Error")
                    throw Error("Không kết nối được đến máy chủ!");
                throw ex;
            }
        },

        // async LayDanhSachBenDen(store, TenTaiKhoan) {
        //     try {
        //         let result = await this.$Core.Api.TaiKhoan(
        //             this.$i18n.global.t("urlTaiKhoan.KiemTraTonTai")
        //         ).Post({
        //             TenTaiKhoan: TenTaiKhoan,
        //         });
        //         return result.Data;
        //     } catch (ex) {
        //         if (ex.message == "Network Error")
        //             throw Error("Không kết nối được đến máy chủ!");
        //         throw ex;
        //     }
        // },
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
