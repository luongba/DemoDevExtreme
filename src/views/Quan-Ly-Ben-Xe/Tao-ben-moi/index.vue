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
          />
          <DxButton
            key="mdi-XACNHAN"
            type="default"
            text="LƯU"
            :width="100"
            styling-mode="contained"
            @click="handleClick"
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
  <div class="row justify-center mt-4">
    <div class="frame-box">
      <DxValidationGroup ref="formValidation">
        <div class="row title">Thông tin chung</div>
        <div class="row mt-3">
          <div class="xs12">
            <DxTextBox
              stylingMode="outlined"
              label="Mã bến (*)"
              labelMode="floating"
              validationMessageMode="always"
              v-model="dataBenXe.maBen"
            >
              <DxValidator ref="validate">
                <DxRequiredRule message="Không được bỏ trống!" />
              </DxValidator>
            </DxTextBox>
          </div>
        </div>
        <div class="row mt-5">
          <div class="xs12">
            <DxTextBox
              stylingMode="outlined"
              label="Tên bến (*)"
              labelMode="floating"
              validationMessageMode="always"
              v-model="dataBenXe.tenBen"
            >
              <DxValidator ref="validate">
                <DxRequiredRule message="Không được bỏ trống!" />
              </DxValidator>
            </DxTextBox>
          </div>
        </div>
        <div class="row mt-5">
          <div class="xs6 mr-2">
            <DxTextBox
              stylingMode="outlined"
              label="Số điện thoại"
              labelMode="floating"
              validationMessageMode="always"
              v-model="dataBenXe.soDienThoai"
            >
              <DxValidator ref="validate">
                <DxStringLengthRule
                  :max="13"
                  message="Vui lòng nhập số điện thoại!"
                />
              </DxValidator>
            </DxTextBox>
          </div>
          <div class="xs6 ml-3">
            <DxSelectBox
              label="Loại bến"
              validationMessageMode="always"
              stylingMode="outlined"
              :searchEnabled="true"
              :searchTimeout="200"
              :dataSource="danhSachLoaiBen"
              display-expr="TenLoaiBen"
              value-expr="IdLoaiBen"
              v-model="dataBenXe.idLoaiBen"
            >
            </DxSelectBox>
          </div>
        </div>
        <div class="row mt-5">
          <div class="xs12">
            <DxTextBox
              stylingMode="outlined"
              label="Email"
              labelMode="floating"
              validationMessageMode="always"
              v-model="dataBenXe.email"
            >
              <DxValidator ref="validate">
                <DxEmailRule message="Phải là Email" />
              </DxValidator>
            </DxTextBox>
          </div>
        </div>
        <div class="row title mt-4">Thông tin địa chỉ bến xe</div>
        <div class="row mt-3">
          <div class="xs6 mr-2">
            <DxSelectBox
              label="Tỉnh/ Thành Phố (*)"
              validationMessageMode="always"
              stylingMode="outlined"
              :searchEnabled="true"
              :searchTimeout="200"
              display-expr="TenTinh"
              value-expr="ID_Tinh"
              v-model="dataBenXe.idTinh"
              :dataSource="danhSachTinhThanh"
              :onValueChanged="handleChangeTinhThanh"
            >
              <DxValidator ref="validate">
                <DxRequiredRule message="Không được bỏ trống!" />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="xs6 ml-3">
            <DxSelectBox
              label="Quận/Huyện/Thị xã (*)"
              validationMessageMode="always"
              stylingMode="outlined"
              :searchEnabled="true"
              :searchTimeout="200"
              display-expr="TenHuyen"
              value-expr="ID_Huyen"
              v-model="dataBenXe.idHuyen"
              :dataSource="danhSachHuyen"
            >
              <DxValidator ref="validate">
                <DxRequiredRule message="Không được bỏ trống!" />
              </DxValidator>
            </DxSelectBox>
          </div>
        </div>
        <div class="row mt-5">
          <div class="xs12">
            <DxTextBox
              stylingMode="outlined"
              label="Địa chỉ cụ thể"
              labelMode="floating"
              validationMessageMode="always"
              v-model="dataBenXe.diaChi"
            >
            </DxTextBox>
          </div>
        </div>
      </DxValidationGroup>
    </div>
  </div>
</template>

<script>
import { DxSelectBox } from "devextreme-vue/select-box";
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";
import DxButton from "devextreme-vue/button";
import routerVue from "@sonphat/common-v1/components/router.vue";
import { DxTextBox, DxValidator, DxValidationGroup } from "devextreme-vue";
import {
  DxRequiredRule,
  DxEmailRule,
  DxStringLengthRule,
} from "devextreme-vue/validator";
export default {
  components: {
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
  },
  data() {
    return {
      breadcrumbsItems: [
        {
          id: 1,
          text: "Quản lý thông tin",
          disabled: true,
        },
        {
          id: 2,
          text: "Bến xe",
          disabled: false,
          to: "/Quan-Ly-Ben-Xe",
        },
        {
          id: 3,
          text:
            Object.values(this.$route.query).length === 0
              ? "Tạo mới bến đến"
              : "Sửa bến",
          disabled: true,
        },
      ],
      dataBenXe: {
        maBen: "",
        tenBen: "",
        soDienThoai: "",
        idLoaiBen: "7f548f4c-ec21-4a69-8c09-c60c89125ffc",
        email: "",
        idTinh: "",
        idHuyen: "",
        diaChi: "",
      },
      danhSachLoaiBen: [],
      danhSachTinhThanh: [],
      danhSachHuyen: [],
    };
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
    async handleClick() {
      let validate = this.$refs.formValidation.instance.validate();
      if (validate.isValid) {
        let result;

        if (Object.values(this.$route.query).length !== 0) {
          let data = { ...this.dataBenXe, IdBenXe: this.$route.query.IdBenXe };
          result = await this.$store.dispatch("QuanLyBenDen/SuaBen", data);
        } else {
          result = await this.$store.dispatch(
            "QuanLyBenDen/TaoBenMoi",
            this.dataBenXe
          );
        }

        if (result.errorCode == 0) {
          this.ToastThongBao("success", result.message);
          this.$router.push({ name: "quanlybenxe" });
        } else {
          this.ToastThongBao("error", result.message);
        }
      } else {
        this.$Helper.Common.autoFocusError(validate);
        this.ToastThongBao("error", "Thực hiện không thành công !");
      }
    },
    async LayDanhSachLoaiBenXe() {
      this.danhSachLoaiBen = [];
      try {
        let result = await this.$store.dispatch(
          "QuanLyBenDen/LayDanhSachLoaiBenDen"
        );
        if (result.errorCode == 0) {
          this.danhSachLoaiBen = result.data;
        } else {
          this.ToastThongBao("error", result.message);
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    async LayDanhSachTinhThanh() {
      this.danhSachTinhThanh = [];
      try {
        let result = await this.$store.dispatch(
          "QuanLyBenDen/LayDanhSachTinhThanh"
        );
        if (result.errorCode == 0) {
          this.danhSachTinhThanh = result.data;
        } else {
          this.ToastThongBao("error", result.message);
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    async handleChangeTinhThanh(e) {
      this.danhSachHuyen = [];
      if (e.value == null) {
        this.danhSachHuyen = [];
        this.dataBenXe.idHuyen = "";
      } else {
        try {
          let result = await this.$store.dispatch(
            "QuanLyBenDen/LayDanhSachHuyen",
            e.value
          );

          if (result.errorCode == 0) {
            this.danhSachHuyen = result.data;
          } else {
            this.ToastThongBao("error", result.message);
            this.dataBenXe.idHuyen = "";
            this.danhSachHuyen = [];
          }
        } catch (ex) {
          this.danhSachHuyen = [];
          this.dataBenXe.idHuyen = "";
        }
      }
    },
    async LayChiTietbenXe() {
      if (this.$route.query && this.$route.query.IdBenXe) {
        try {
          this.$startLoading;
          let result = await this.$store.dispatch(
            "QuanLyBenDen/LayChiTietBenXe",
            this.$route.query.IdBenXe
          );
          this.dataBenXe = {
            maBen: this.$store.state.QuanLyBenDen.ChiTietBenXe.MaBenXe || "",
            tenBen: this.$store.state.QuanLyBenDen.ChiTietBenXe.TenBenXe || "",
            soDienThoai:
              this.$store.state.QuanLyBenDen.ChiTietBenXe.SoDienThoai || "",
            idLoaiBen:
              this.$store.state.QuanLyBenDen.ChiTietBenXe.IdLoaiBen ||
              "7f548f4c-ec21-4a69-8c09-c60c89125ffc",
            email: this.$store.state.QuanLyBenDen.ChiTietBenXe.Email || "",
            idTinh: this.$store.state.QuanLyBenDen.ChiTietBenXe.IdTinh || "",
            idHuyen: this.$store.state.QuanLyBenDen.ChiTietBenXe.IdHuyen || "",
            diaChi: this.$store.state.QuanLyBenDen.ChiTietBenXe.DiaChi || "",
          };
          this.$stopLoading;
        } catch (ex) {
          this.$stopLoading;
          console.log(ex);
        }
      } else {
        return;
      }
    },
  },
  computed: {},
  created() {
    this.LayDanhSachLoaiBenXe();
    this.LayDanhSachTinhThanh();
    this.LayChiTietbenXe();
  },
};
</script>

<style>
.frame-box {
  width: 554px;
}
.title {
  font-weight: 500;
  font-size: 16px;
}
</style>