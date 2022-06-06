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
              value-expr=""
              :onValueChanged="handleChangeTinhThanhDi"
            >
              <DxValidator ref="validate">
                <DxRequiredRule message="Không được bỏ trống!" />
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
              value-expr=""
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
                <DxRequiredRule message="Không được bỏ trống!" />
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
              :onValueChanged="handleChangeTinhThanhDen"
            >
              <DxValidator ref="validate">
                <DxRequiredRule message="Không được bỏ trống!" />
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
              :onValueChanged="handleChangeBenDen"
            >
              <DxValidator ref="validate">
                <DxRequiredRule message="Không được bỏ trống!" />
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
                <DxRequiredRule message="Không được bỏ trống!" />
              </DxValidator>
            </DxTextBox>
          </div>
        </row>
        <div class="row title mt-4">
          Hành trình chạy từ "{{ tenBenDi == null ? "Bến đi" : tenBenDi }}" đến
          "{{ tenBenDen == null ? "Bến đến" : tenBenDen }}"
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
                <DxRequiredRule message="Không được bỏ trống!" />
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
                <DxRequiredRule message="Không được bỏ trống!" />
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
              :loadPanel="{ showIndicator: false, showPane: false, text: '' }"
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
                <DxRequiredRuleDataGrid message="Không được bỏ trống!" />
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
              :loadPanel="{ showIndicator: false, showPane: false, text: '' }"
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
                <DxRequiredRuleDataGrid message="Không được bỏ trống!" />
              </DxColumn>
              <!-- Summary -->
            </DxDataGrid>
          </div>
        </div>
        <div class="row title mt-4">
          Hành trình chạy từ "{{ tenBenDen == null ? "Bến đến" : tenBenDen }}"
          về "{{ tenBenDi == null ? "Bến đi" : tenBenDi }}"
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
                <DxRequiredRule message="Không được bỏ trống!" />
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
                <DxRequiredRule message="Không được bỏ trống!" />
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
              :loadPanel="{ showIndicator: false, showPane: false, text: '' }"
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
                <DxRequiredRuleDataGrid message="Không được bỏ trống!" />
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
              :loadPanel="{ showIndicator: false, showPane: false, text: '' }"
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
                <DxRequiredRuleDataGrid message="Không được bỏ trống!" />
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
      maTinhDen: null,
      maTinhDi: null,
      maBenDi: null,
      maBenDen: null,
      matuyen: "",
      tenBenDi: null,
      tenBenDen: null,
      dataTuyen: {
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
    };
  },
  computed: {},
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
          tinh.value.ID_Tinh
        );
        if (result.errorCode == 0) {
          if (result.data.length == 0) {
            this.ToastThongBao("error", "Không có bến xe thuộc tỉnh này!");
            this.DanhSachBenDi = [];
            this.tenBenDi = null;
            this.maBenDi = null;
          } else {
            this.DanhSachBenDi = result.data;
            this.maTinhDi = tinh.value.MaTinh;
            this.dataTuyen.idTinhDi = tinh.value.ID_Tinh;
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
          tinh.value.ID_Tinh
        );
        if (result.errorCode == 0) {
          if (result.data.length == 0) {
            this.ToastThongBao("error", "Không có bến xe thuộc tỉnh này!");
            this.DanhSachBenDen = [];
            this.tenBenDen = null;
            this.maBenDen = null;
          } else {
            this.DanhSachBenDen = result.data;
            this.maTinhDen = tinh.value.MaTinh;
            this.dataTuyen.idTinhDen = tinh.value.ID_Tinh;
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
        this.maTinhDen != null &&
        this.maBenDen != null &&
        this.maTinhDi != null &&
        this.maBenDi != null
      ) {
        let tuyen;
        if (this.maTinhDi < this.maTinhDen) {
          tuyen = `${this.maTinhDi}${this.maTinhDen}.${this.maBenDi}${this.maBenDen}`;
        } else if (this.maTinhDi > this.maTinhDen) {
          tuyen = `${this.maTinhDen}${this.maTinhDi}.${this.maBenDen}${this.maBenDi}`;
        } else {
          if (this.maBenDi < this.maBenDen) {
            tuyen = `${this.maTinhDi}${this.maTinhDen}.${this.maBenDi}${this.maBenDen}`;
          } else {
            tuyen = `${this.maTinhDen}${this.maTinhDi}.${this.maBenDen}${this.maBenDi}`;
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
      this.maBenDen = ben.value.MaBenXe;
      this.tenBenDen = ben.value.TenBenXe;
      this.dataTuyen.idBenDen = ben.value.IdBenXe;
      this.checkGoiTuyen();
    },
    handleChangeBenDi(ben) {
      this.maBenDi = ben.value.MaBenXe;
      this.tenBenDi = ben.value.TenBenXe;
      this.dataTuyen.idBenDi = ben.value.IdBenXe;
      this.checkGoiTuyen();
    },
    async handleClickSave() {
      try {
        let result = await this.$store.dispatch(
          "QuanLyLuongTuyen/ThemLuongTuyenAction",
          this.dataTuyen
        );
        if (result.errorCode == 0) {
          console.log(result.data);
          this.ToastThongBao("success", result.message);
        } else {
          this.ToastThongBao("error", result.message);
        }
      } catch (ex) {
        console.log(ex);
      }
    },
  },
  created() {
    this.LayDanhSachTinhThanh();
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