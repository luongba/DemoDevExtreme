<template>
    <DxToolbar style="height: 56px" class="toolbar">
        <DxItem location="before" locate-in-menu="never">
            <template #default>
                <routerVue :breadcrumbsItems="breadcrumbsItems" />
            </template>
        </DxItem>
        <DxItem location="after" locate-in-menu="never">
            <template #default>
                <div>
                    <DxButton
                        key="mdi-HUY"
                        type="default"
                        text="HỦY"
                        styling-mode="text"
                        :width="100"
                        class="mr-4"
                        @click="this.$router.push({ name: 'quanlyxekhach' })"
                    />
                    <DxButton
                        key="mdi-XACNHAN"
                        type="default"
                        text="LƯU"
                        :width="100"
                        styling-mode="contained"
                        @click="handleClickSave"
                    />
                    <!-- <DxButton
            key="mdi-XACNHAN"
            type="default"
            text="LƯU"
            :width="100"
            styling-mode="contained"
            @click="handleClick"
            v-if="this.$route.query.IdLoaiBen ? false : true"
          /> -->
                </div>
            </template>
        </DxItem>
    </DxToolbar>
    <div class="row justify-center mt-3">
        <div class="frame-box xs-12 px-4">
            <DxValidationGroup ref="formValidation">
                <div class="row title">
                    Thông tin chính
                    <span class="ml-2">
                        <DxCheckBox
                            id="check"
                            :value="false"
                            text="Tiếp tục thiết lập tuyến vận chuyển"
                        >
                        </DxCheckBox>
                    </span>
                </div>
                <div class="row mt-3">
                    <div class="xs6 mr-2">
                        <DxSelectBox
                            label="Tỉnh đi (*)"
                            validationMessageMode="always"
                            stylingMode="outlined"
                            :searchEnabled="true"
                            :searchTimeout="200"
                            :dataSource="DanhSachTinhThanh"
                            display-expr="TenTinh"
                            value-expr="ID_Tinh"
                            :onValueChanged="handleChangeTinhThanhDi"
                            v-model="dataTuyen.idTinhDi"
                        >
                            <DxValidator ref="validate">
                                <DxRequiredRule
                                    message="Không được bỏ trống!"
                                />
                            </DxValidator>
                        </DxSelectBox>
                    </div>
                    <div class="xs6 ml-3">
                        <DxSelectBox
                            label="Bến đi (*)"
                            validationMessageMode="always"
                            stylingMode="outlined"
                            :searchEnabled="true"
                            :searchTimeout="200"
                            :dataSource="DanhSachBenDi"
                            display-expr="TenBenXe"
                            valueExpr="IdBenXe"
                            v-model="dataTuyen.idBenDi"
                            :onValueChanged="handleChangeBenDi"
                        >
                            <DxValidator ref="validate">
                                <DxCompareRule
                                    :comparisonTarget="
                                        () => {
                                            return dataTuyen.idBenDen;
                                        }
                                    "
                                    comparisonType="!="
                                    message="Bến đi không được trùng với bến đến!"
                                />
                                <DxRequiredRule
                                    message="Không được bỏ trống!"
                                />
                            </DxValidator>
                        </DxSelectBox>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="xs6 mr-2">
                        <DxSelectBox
                            label="Tỉnh đến (*)"
                            validationMessageMode="always"
                            stylingMode="outlined"
                            :searchEnabled="true"
                            :searchTimeout="200"
                            :dataSource="DanhSachTinhThanh"
                            display-expr="TenTinh"
                            valueExpr="ID_Tinh"
                            v-model="dataTuyen.idTinhDen"
                            :onValueChanged="handleChangeTinhThanhDen"
                        >
                            <DxValidator ref="validate">
                                <DxRequiredRule
                                    message="Không được bỏ trống!"
                                />
                            </DxValidator>
                        </DxSelectBox>
                    </div>
                    <div class="xs6 ml-3">
                        <DxSelectBox
                            label="Bến đến (*)"
                            validationMessageMode="always"
                            stylingMode="outlined"
                            :searchEnabled="true"
                            :searchTimeout="200"
                            :dataSource="DanhSachBenDen"
                            display-expr="TenBenXe"
                            valueExpr="IdBenXe"
                            v-model="dataTuyen.idBenDen"
                            :onValueChanged="handleChangeBenDen"
                        >
                            <DxValidator ref="validate">
                                <DxRequiredRule
                                    message="Không được bỏ trống!"
                                />
                                <DxCompareRule
                                    :comparisonTarget="
                                        () => {
                                            return dataTuyen.idBenDi;
                                        }
                                    "
                                    comparisonType="!="
                                    message="Bến đi không được trùng với bến đến!"
                                />
                            </DxValidator>
                        </DxSelectBox>
                    </div>
                </div>
                <row class="row mt-5">
                    <div class="xs12">
                        <DxTextBox
                            stylingMode="outlined"
                            label="Mã tuyến (*)"
                            labelMode="floating"
                            validationMessageMode="always"
                            v-model="dataTuyen.maTuyen"
                        >
                            <DxValidator ref="validate">
                                <DxRequiredRule
                                    message="Không được bỏ trống!"
                                />
                            </DxValidator>
                        </DxTextBox>
                    </div>
                </row>
                <div class="row title mt-4">
                    Hành trình chạy từ "{{
                        ItemBenDi.TenBenXe == null
                            ? "Bến đến"
                            : ItemBenDi.TenBenXe
                    }}" về "{{
                        ItemBenDen.TenBenXe == null
                            ? "Bến đi"
                            : ItemBenDen.TenBenXe
                    }}"
                </div>
                <div class="row mt-3">
                    <div class="xs6 mr-2">
                        <DxTextBox
                            stylingMode="outlined"
                            label="Hành trình chạy (*)"
                            labelMode="floating"
                            validationMessageMode="always"
                            v-model="dataTuyen.loTrinhDi.hanhTrinhChay"
                        >
                            <DxValidator ref="validate">
                                <DxRequiredRule
                                    message="Không được bỏ trống!"
                                />
                            </DxValidator>
                        </DxTextBox>
                    </div>
                    <div class="xs6 ml-3">
                        <DxNumberBox
                            stylingMode="outlined"
                            label="Cự ly (*)"
                            labelMode="floating"
                            format="#,###.## km"
                            validationMessageMode="always"
                            v-model="dataTuyen.loTrinhDi.cuLy"
                        >
                            <DxValidator ref="validate">
                                <DxRequiredRule
                                    message="Không được bỏ trống!"
                                />
                                <DxRangeRule
                                    max="2147483647"
                                    message="Cự ly không vượt quá 2.147.483.647 km"
                                />
                            </DxValidator>
                        </DxNumberBox>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="xs6 mr-2">
                        <DxDataGrid
                            id=""
                            class="table-page"
                            :show-borders="true"
                            :data-source="dataTuyen.loTrinhDi.gioXuatBens"
                            :remote-operations="true"
                            :allow-column-resizing="true"
                            :column-auto-width="true"
                            :loadPanel="{
                                showIndicator: false,
                                showPane: false,
                                text: '',
                            }"
                            key-expr=""
                            height="calc(250px)"
                            no-data-text="Không có dữ liệu!"
                            @cellHoverChanged="onCellHoverChanged"
                        >
                            <DxPaging :page-size="4" />
                            <DxScrolling mode="infinite" />
                            <DxColumnFixing :enabled="true" />
                            <DxEditing
                                :allow-deleting="true"
                                :allow-adding="true"
                                mode="cell"
                            />
                            <DxColumn
                                :allowFiltering="true"
                                :allowSorting="true"
                                :fixed="true"
                                data-field="GioXuatBen"
                                caption="Giờ xuất bến theo biểu đồ giờ"
                                width=""
                                groupCellTemplate="groupCellTemplate"
                                alignment="left"
                                data-type="datetime"
                                format="HH:mm"
                                :editorOptions="{
                                    displayFormat: 'HH:mm',
                                    type: 'time',
                                }"
                            >
                                <DxRequiredRuleDataGrid
                                    message="Không được bỏ trống!"
                                />
                                <DxCustomRule
                                    :validation-callback="validateGioDi"
                                    message="Giờ xuất bến không được trùng nhau"
                                />
                            </DxColumn>
                            <!-- Summary -->
                        </DxDataGrid>
                    </div>
                    <div class="xs6 ml-3">
                        <DxDataGrid
                            id=""
                            class="table-page"
                            :show-borders="true"
                            :data-source="dataTuyen.loTrinhDi.diemDungNghis"
                            :remote-operations="true"
                            :allow-column-resizing="true"
                            :column-auto-width="true"
                            :loadPanel="{
                                showIndicator: false,
                                showPane: false,
                                text: '',
                            }"
                            key-expr=""
                            height="calc(250px)"
                            no-data-text="Không có dữ liệu!"
                            @cellHoverChanged="onCellHoverChanged"
                        >
                            <DxPaging :page-size="4" />
                            <DxScrolling mode="infinite" />
                            <DxColumnFixing :enabled="true" />
                            <DxEditing
                                :allow-deleting="true"
                                :allow-adding="true"
                                mode="cell"
                            />
                            <DxColumn
                                :allowFiltering="true"
                                :allowSorting="true"
                                :fixed="true"
                                data-field="TenDiemDung"
                                caption="Điểm trả khách theo chiều về"
                                width=""
                                groupCellTemplate="groupCellTemplate"
                                alignment="left"
                            >
                                <DxRequiredRuleDataGrid
                                    message="Không được bỏ trống!"
                                />
                                <DxCustomRule
                                    :validation-callback="validateDiemDungDi"
                                    message="Không được trùng điểm dừng nghỉ"
                                />
                            </DxColumn>
                            <!-- Summary -->
                        </DxDataGrid>
                    </div>
                </div>
                <div class="row title mt-4">
                    Hành trình chạy từ "{{
                        ItemBenDen.TenBenXe == null
                            ? "Bến đến"
                            : ItemBenDen.TenBenXe
                    }}" về "{{
                        ItemBenDi.TenBenXe == null
                            ? "Bến đi"
                            : ItemBenDi.TenBenXe
                    }}"
                </div>
                <div class="row mt-3">
                    <div class="xs6 mr-2">
                        <DxTextBox
                            stylingMode="outlined"
                            label="Hành trình chạy (*)"
                            labelMode="floating"
                            validationMessageMode="always"
                            v-model="dataTuyen.loTrinhVe.hanhTrinhChay"
                        >
                            <DxValidator ref="validate">
                                <DxRequiredRule
                                    message="Không được bỏ trống!"
                                />
                            </DxValidator>
                        </DxTextBox>
                    </div>
                    <div class="xs6 ml-3">
                        <DxNumberBox
                            stylingMode="outlined"
                            label="Cự ly (*)"
                            labelMode="floating"
                            format="#,###.## km"
                            v-model="dataTuyen.loTrinhVe.cuLy"
                            validationMessageMode="always"
                        >
                            <DxValidator ref="validate">
                                <DxRequiredRule
                                    message="Không được bỏ trống!"
                                />
                                <DxRangeRule
                                    max="2147483647"
                                    message="Cự ly không vượt quá 2.147.483.647 km"
                                />
                            </DxValidator>
                        </DxNumberBox>
                    </div>
                </div>
                <div class="row my-2">
                    <div class="xs6 mr-2">
                        <DxDataGrid
                            id=""
                            class="table-page"
                            :show-borders="true"
                            :data-source="dataTuyen.loTrinhVe.gioXuatBens"
                            :remote-operations="true"
                            :allow-column-resizing="true"
                            :column-auto-width="true"
                            :loadPanel="{
                                showIndicator: false,
                                showPane: false,
                                text: '',
                            }"
                            key-expr=""
                            height="calc(250px)"
                            no-data-text="Không có dữ liệu!"
                            @cellHoverChanged="onCellHoverChanged"
                        >
                            <DxPaging :page-size="4" />
                            <DxScrolling mode="infinite" />
                            <DxColumnFixing :enabled="true" />
                            <DxEditing
                                :allow-deleting="true"
                                :allow-adding="true"
                                mode="cell"
                            />
                            <DxColumn
                                :allowFiltering="true"
                                :allowSorting="true"
                                :fixed="true"
                                data-field="GioXuatBen"
                                caption="Giờ xuất bến theo biểu đồ giờ"
                                width=""
                                groupCellTemplate="groupCellTemplate"
                                alignment="left"
                                data-type="datetime"
                                format="HH:mm"
                                :editorOptions="{
                                    displayFormat: 'HH:mm',
                                    type: 'time',
                                }"
                            >
                                <DxRequiredRuleDataGrid
                                    message="Không được bỏ trống!"
                                />
                                <DxCustomRule
                                    :validation-callback="validateGioVe"
                                    message="Giờ xuất bến không được trùng nhau"
                                />
                            </DxColumn>
                            <!-- Summary -->
                        </DxDataGrid>
                    </div>
                    <div class="xs6 ml-3">
                        <DxDataGrid
                            id=""
                            class="table-page"
                            :show-borders="true"
                            :data-source="dataTuyen.loTrinhVe.diemDungNghis"
                            :remote-operations="true"
                            :allow-column-resizing="true"
                            :column-auto-width="true"
                            :loadPanel="{
                                showIndicator: false,
                                showPane: false,
                                text: '',
                            }"
                            key-expr=""
                            height="calc(250px)"
                            no-data-text="Không có dữ liệu!"
                            @cellHoverChanged="onCellHoverChanged"
                        >
                            <DxPaging :page-size="4" />
                            <DxScrolling mode="infinite" />
                            <DxColumnFixing :enabled="true" />
                            <DxEditing
                                :allow-deleting="true"
                                :allow-adding="true"
                                mode="cell"
                            />
                            <DxColumn
                                :allowFiltering="true"
                                :allowSorting="true"
                                :fixed="true"
                                data-field="TenDiemDung"
                                caption="Điểm trả khách theo chiều về"
                                width=""
                                groupCellTemplate="groupCellTemplate"
                                alignment="left"
                            >
                                <DxRequiredRuleDataGrid
                                    message="Không được bỏ trống!"
                                />
                                <DxCustomRule
                                    :validation-callback="validateDiemDungVe"
                                    message="Không được trùng điểm dừng nghỉ"
                                />
                            </DxColumn>
                            <!-- Summary -->
                        </DxDataGrid>
                    </div>
                </div>
            </DxValidationGroup>
        </div>
    </div>
</template>

<script>
import {
    DxDataGrid,
    DxPaging,
    DxScrolling,
    DxColumnFixing,
    DxHeaderFilter,
    DxFilterRow,
    DxSelection,
    DxColumn,
    DxSummary,
    DxGroupItem,
    DxEditing,
    DxRequiredRule as DxRequiredRuleDataGrid,
} from "devextreme-vue/data-grid";
import { DxGallery } from "devextreme-vue/gallery";
import { DxSelectBox } from "devextreme-vue/select-box";
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";
import DxButton from "devextreme-vue/button";
import routerVue from "@sonphat/common-v1/components/router.vue";
import {
    DxTextBox,
    DxValidator,
    DxValidationGroup,
    DxCheckBox,
    DxNumberBox,
} from "devextreme-vue";
import { DxButton as DxTextBoxButton } from "devextreme-vue/text-box";
import {
    DxRequiredRule,
    DxEmailRule,
    DxStringLengthRule,
    DxRangeRule,
    DxCompareRule,
    DxCustomRule,
} from "devextreme-vue/validator";
import DxDateBox from "devextreme-vue/date-box";
export default {
    components: {
        DxDataGrid,
        DxPaging,
        DxScrolling,
        DxColumnFixing,
        DxHeaderFilter,
        DxFilterRow,
        DxSelection,
        DxColumn,
        DxSummary,
        DxGroupItem,
        DxCheckBox,
        DxSelectBox,
        DxRequiredRule,
        DxValidationGroup,
        DxToolbar,
        DxItem,
        routerVue,
        DxButton,
        DxValidator,
        DxTextBox,
        DxSelectBox,
        DxEmailRule,
        DxStringLengthRule,
        DxCheckBox,
        DxDateBox,
        DxGallery,
        DxTextBoxButton,
        DxRangeRule,
        DxCompareRule,
        DxEditing,
        DxRequiredRuleDataGrid,
        DxNumberBox,
        DxCustomRule,
    },
    data() {
        return {
            MaxDate: new Date(this.$i18n.t("DefaultNumBer.MaxDate")),
            MinDate: new Date(this.$i18n.t("DefaultNumBer.MinDate")),
            passwordButton: {
                icon: "mdi mdi-eye",
                type: "text",
                onClick: () => {
                    this.passwordMode =
                        this.passwordMode === "text" ? "password" : "text";
                },
            },
            passwordMode: "password",
            breadcrumbsItems: [
                {
                    id: 1,
                    text: "Quản lý thông tin",
                    disabled: true,
                },
                {
                    id: 2,
                    text: "Tuyến vận chuyển được cấp",
                    disabled: false,
                    to: "/Quan-Ly-Luong-Tuyen",
                },
                {
                    id: 3,
                    text:
                        Object.values(this.$route.query).length === 0
                            ? "Tạo mới"
                            : "Sửa thông tin lượng tuyến",
                    disabled: true,
                },
            ],
            DanhSachTinhThanh: [],
            DanhSachBenDi: [],
            DanhSachBenDen: [],
        };
    },
    computed: {
        ItemTinhDi() {
            let Id = this.dataTuyen.idTinhDi || "";
            let index = this.DanhSachTinhThanh.filter((e) => e.ID_Tinh == Id);
            return index[0] || [];
        },
        ItemTinhDen() {
            let Id = this.dataTuyen.idTinhDen || "";
            let index = this.DanhSachTinhThanh.filter((e) => e.ID_Tinh == Id);
            return index[0] || [];
        },
        ItemBenDen() {
            let Id = this.dataTuyen.idBenDen || "";
            let index = this.DanhSachBenDen.filter((e) => e.IdBenXe == Id);
            return index[0] || [];
        },
        ItemBenDi() {
            let Id = this.dataTuyen.idBenDi || "";
            let index = this.DanhSachBenDi.filter((e) => e.IdBenXe == Id);
            return index[0] || [];
        },
        dataTuyen() {
            return this.$store.state.QuanLyLuongTuyen.chiTietLuongTuyen;
        },
    },
    methods: {
        ToastThongBao(type, msg) {
            let toast = {
                isVisible: true,
                message: msg,
                type: type,
            };
            this.emitter.emit("onToast", toast);
        },
        async LayDanhSachTinhThanh() {
            try {
                let result = await this.$store.dispatch(
                    "QuanLyBenDen/LayDanhSachTinhThanh"
                );
                if (result.errorCode == 0) {
                    this.DanhSachTinhThanh = result.data;
                } else {
                    this.ToastThongBao("error", result.message);
                }
            } catch (ex) {
                this.ToastThongBao("error", "Lỗi hệ thống!");
            }
        },
        async handleChangeTinhThanhDi(tinh) {
            try {
                let result = await this.$store.dispatch(
                    "QuanLyLuongTuyen/LayBenThuocTinhAction",
                    tinh.value
                );
                if (result.errorCode == 0) {
                    if (result.data.length == 0) {
                        this.ToastThongBao(
                            "error",
                            "Không có bến xe thuộc tỉnh này!"
                        );
                        this.DanhSachBenDi = [];
                        this.tenBenDi = null;
                        this.maBenDi = null;
                    } else {
                        this.DanhSachBenDi = result.data;
                    }
                } else {
                    this.ToastThongBao("error", result.message);
                }
            } catch (ex) {
                this.ToastThongBao("error", "Lỗi hệ thống!");
            }
        },
        async handleChangeTinhThanhDen(tinh) {
            try {
                let result = await this.$store.dispatch(
                    "QuanLyLuongTuyen/LayBenThuocTinhAction",
                    tinh.value
                );
                if (result.errorCode == 0) {
                    if (result.data.length == 0) {
                        this.ToastThongBao(
                            "error",
                            "Không có bến xe thuộc tỉnh này!"
                        );
                        this.DanhSachBenDen = [];
                        this.tenBenDen = null;
                        this.maBenDen = null;
                    } else {
                        this.DanhSachBenDen = result.data;
                    }
                } else {
                    this.ToastThongBao("error", result.message);
                }
            } catch (ex) {
                this.ToastThongBao("error", "Lỗi hệ thống!");
            }
        },
        async checkGoiTuyen() {
            if (
                this.ItemTinhDen.MaTinh != null &&
                this.ItemBenDen.MaBenXe != null &&
                this.ItemTinhDi.MaTinh != null &&
                this.ItemBenDi.MaBenXe != null
            ) {
                let tuyen;
                if (this.ItemTinhDi.MaTinh < this.ItemTinhDen.MaTinh) {
                    tuyen = `${this.ItemTinhDi.MaTinh}${this.ItemTinhDen.MaTinh}.${this.ItemBenDi.MaBenXe}${this.ItemBenDen.MaBenXe}`;
                } else if (this.ItemTinhDi.MaTinh > this.ItemTinhDen.MaTinh) {
                    tuyen = `${this.ItemTinhDen.MaTinh}${this.ItemTinhDi.MaTinh}.${this.ItemBenDen.MaBenXe}${this.ItemBenDi.MaBenXe}`;
                } else {
                    if (this.ItemBenDi.MaBenXe < this.ItemBenDen.MaBenXe) {
                        tuyen = `${this.ItemTinhDi.MaTinh}${this.ItemTinhDen.MaTinh}.${this.ItemBenDi.MaBenXe}${this.ItemBenDen.MaBenXe}`;
                    } else {
                        tuyen = `${this.ItemTinhDen.MaTinh}${this.ItemTinhDi.MaTinh}.${this.ItemBenDen.MaBenXe}${this.ItemBenDi.MaBenXe}`;
                    }
                }
                try {
                    let result = await this.$store.dispatch(
                        "QuanLyLuongTuyen/LayGoiYMaTuyenAction",
                        tuyen
                    );
                    if (result.errorCode == 0) {
                        this.dataTuyen.maTuyen = result.data;
                    } else {
                        this.ToastThongBao("error", result.message);
                    }
                } catch (ex) {
                    console.log(ex);
                }
            }
        },
        handleChangeBenDen(ben) {
            this.dataTuyen.idBenDen = ben.value;
            this.checkGoiTuyen();
        },
        handleChangeBenDi(ben) {
            this.dataTuyen.idBenDi = ben.value;
            this.checkGoiTuyen();
        },
        async handleClickSave() {
            let validate = this.$refs.formValidation.instance.validate();
            if (validate.isValid) {
                setTimeout(async () => {
                    let result;
                    try {
                        if (!this.$route.query.IdLuongTuyen) {
                            result = await this.$store.dispatch(
                                "QuanLyLuongTuyen/ThemLuongTuyenAction",
                                this.dataTuyen
                            );
                        } else {
                            let data = {};
                            data = this.dataTuyen;
                            data.idLuongTuyen = this.$route.query.IdLuongTuyen;
                            result = await this.$store.dispatch(
                                "QuanLyLuongTuyen/SuaLuongTuyenAction",
                                data
                            );
                        }
                        if (result.errorCode == 0) {
                            console.log(result.data);
                            this.ToastThongBao("success", result.message);
                        } else {
                            this.ToastThongBao("error", result.message);
                        }
                    } catch (ex) {
                        console.log(ex);
                    }
                }, 1000);
            } else {
                this.$Helper.Common.autoFocusError(validate);
                this.ToastThongBao("error", "Thực hiện không thành công !");
            }
        },
        validateGioDi(item) {
            let gioDi = this.dataTuyen.loTrinhDi.gioXuatBens;
            let check = gioDi.some(
                (e) =>
                    this.$Helper.Common.formatTime(e.GioXuatBen) ==
                    this.$Helper.Common.formatTime(item.value)
            );
            console.log(gioDi);
            return !check;
        },
        validateGioVe(item) {
            let gioVe = this.dataTuyen.loTrinhVe.gioXuatBens;
            let check = gioVe.some(
                (e) =>
                    this.$Helper.Common.formatTime(e.GioXuatBen) ==
                    this.$Helper.Common.formatTime(item.value)
            );
            return !check;
        },
        validateDiemDungDi(item) {
            let diemDung = this.dataTuyen.loTrinhDi.diemDungNghis;
            let check = diemDung.some((e) => e.TenDiemDung == item.value);
            return !check;
        },
        validateDiemDungVe(item) {
            let diemDung = this.dataTuyen.loTrinhVe.diemDungNghis;
            let check = diemDung.some((e) => e.TenDiemDung == item.value);
            return !check;
        },
        async getChiTietTuyen() {
            try {
                await this.$store.dispatch(
                    "QuanLyLuongTuyen/chiTietLuongTuyenAction",
                    this.$route.query.IdLuongTuyen
                );
            } catch (ex) {
                this.ToastThongBao("error", "Lỗi hệ thống !");
            }
        },
    },
    created() {
        this.LayDanhSachTinhThanh();
        if (this.$route.query.IdLuongTuyen) {
            this.getChiTietTuyen();
        } else {
            this.$store.dispatch("QuanLyLuongTuyen/resetChitiet");
        }
    },
};
</script>

<style>
.frame-box {
    width: 100%;
}
.title {
    font-weight: 500;
    font-size: 16px;
}

.img-frame-container {
    height: 100%;
    width: 100%;
    box-shadow: 0 19px 36px rgb(0 0 0 / 16%);
}

.img-frame-content {
    height: calc(100% - 36px);
    background: #e5e5e5;
}
</style>