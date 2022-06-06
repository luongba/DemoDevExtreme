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
  <div class="row justify-center mt-3">
    <div class="frame-box xs-12 px-4">
      <DxValidationGroup ref="formValidation">
        <div class="row">
          <div class="xs8 mr-2">
            <div class="row title">Thông tin xe đăng ký</div>
            <div class="row mt-3">
              <div class="xs6 mr-2">
                <DxTextBox
                  stylingMode="outlined"
                  label="Biểm kiểm soát (*)"
                  labelMode="floating"
                  validationMessageMode="always"
                  v-model="dataXe.BienKiemSoat"
                >
                  <DxValidator ref="validate">
                    <DxRequiredRule message="Không được bỏ trống!" />
                    <DxStringLengthRule :min="8" message="Tối thiểu 8 ký tự" />
                  </DxValidator>
                </DxTextBox>
              </div>
              <div class="xs6 ml-3">
                <DxTextBox
                  stylingMode="outlined"
                  label="Đơn vị vận tải"
                  labelMode="floating"
                  :readOnly="true"
                  validationMessageMode="always"
                  v-model="DonViVanTai"
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
                  label="Số khung"
                  labelMode="floating"
                  validationMessageMode="always"
                  v-model="dataXe.SoKhung"
                >
                </DxTextBox>
              </div>
              <div class="xs6 ml-3">
                <DxTextBox
                  stylingMode="outlined"
                  label="Số máy"
                  labelMode="floating"
                  validationMessageMode="always"
                  v-model="dataXe.SoMay"
                  :disabled="false"
                >
                </DxTextBox>
              </div>
            </div>
            <div class="row mt-5">
              <div class="xs6 mr-2">
                <div class="row">
                  <div class="xs4 mr-2">
                    <DxSelectBox
                      label="Loại xe (*)"
                      validationMessageMode="always"
                      stylingMode="outlined"
                      :searchEnabled="true"
                      :searchTimeout="200"
                      :dataSource="danhSachLoaiXe"
                      display-expr="TenLoaiXe"
                      value-expr="ID_LoaiXe"
                      v-model="dataXe.IdLoaiXe"
                    >
                      <DxValidator ref="validate">
                        <DxRequiredRule message="Không được bỏ trống!" />
                      </DxValidator>
                    </DxSelectBox>
                  </div>
                  <div class="xs4 mr-3">
                    <DxTextBox
                      stylingMode="outlined"
                      label="Số ghế (*)"
                      labelMode="floating"
                      validationMessageMode="always"
                      v-model="dataXe.SoGhe"
                    >
                      <DxValidator ref="validate">
                        <DxRequiredRule message="Không được bỏ trống!" />
                      </DxValidator>
                    </DxTextBox>
                  </div>
                  <div class="xs4">
                    <DxTextBox
                      stylingMode="outlined"
                      label="Số giường (*)"
                      labelMode="floating"
                      validationMessageMode="always"
                      v-model="dataXe.SoGiuong"
                    >
                      <DxValidator ref="validate">
                        <DxRequiredRule message="Không được bỏ trống!" />
                      </DxValidator>
                    </DxTextBox>
                  </div>
                </div>
              </div>
              <div class="xs6 ml-3">
                <DxTextBox
                  stylingMode="outlined"
                  label="Số đăng ký xe (*)"
                  labelMode="floating"
                  validationMessageMode="always"
                  v-model="dataXe.SoDangKy"
                  :disabled="false"
                >
                  <DxValidator ref="validate">
                    <DxRequiredRule message="Không được bỏ trống!" />
                  </DxValidator>
                </DxTextBox>
              </div>
            </div>
            <div class="row title mt-4">
              Thông tin hạn hiệu lực
              <span class="ml-2">
                <DxCheckBox
                  id="check"
                  :value="false"
                  text="Sử dụng giấy biên nhận thế chấp thay cho đăng ký xe"
                >
                </DxCheckBox>
              </span>
            </div>
            <div class="row mt-3">
              <div class="xs6 mr-2">
                <DxDateBox
                  v-model="dataXe.HanBaoHiem"
                  stylingMode="outlined"
                  label="Hạn bảo hiểm xe (*)"
                  drop-down-button-template="icon"
                  :useMaskBehavior="true"
                  displayFormat="dd/MM/yyyy"
                  labelMode="floating"
                  type="date"
                  validationMessageMode="always"
                  :readOnly="action == 'View'"
                >
                  <template #icon="{}">
                    <DxButton icon="mdi mdi-calendar" />
                  </template>
                  <DxValidator ref="validate">
                    <DxRequiredRule message="Không được bỏ trống!" />
                    <DxRangeRule
                      :max="MaxDate"
                      :message="$i18n.t('DefaultString.MaxDate')"
                    />
                    <DxRangeRule
                      :min="MinDate"
                      :message="$i18n.t('DefaultString.MinDate')"
                    />
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="xs6 ml-3">
                <DxDateBox
                  v-model="dataXe.HanDangKiem"
                  stylingMode="outlined"
                  label="Hạn đăng kiểm xe (*)"
                  :useMaskBehavior="true"
                  displayFormat="dd/MM/yyyy"
                  drop-down-button-template="icon"
                  labelMode="floating"
                  type="date"
                >
                  <template #icon="{}">
                    <DxButton icon="mdi mdi-calendar" />
                  </template>
                  <DxValidator ref="validate">
                    <DxRequiredRule message="Không được bỏ trống!" />
                    <DxRangeRule
                      :max="MaxDate"
                      :message="$i18n.t('DefaultString.MaxDate')"
                    />
                    <DxRangeRule
                      :min="MinDate"
                      :message="$i18n.t('DefaultString.MinDate')"
                    />
                  </DxValidator>
                </DxDateBox>
              </div>
            </div>
            <div class="row mt-5">
              <div class="xs12">
                <DxDateBox
                  v-model="dataXe.HanBienBanTheChap"
                  stylingMode="outlined"
                  label="Hạn biên nhận thế chấp"
                  :useMaskBehavior="true"
                  displayFormat="dd/MM/yyyy"
                  drop-down-button-template="icon"
                  labelMode="floating"
                  validationMessageMode="always"
                  type="date"
                >
                  <template #icon="{}">
                    <DxButton icon="mdi mdi-calendar" />
                  </template>
                  <DxValidator ref="validate">
                    <DxRequiredRule message="Không được bỏ trống!" />
                    <DxRangeRule
                      :max="MaxDate"
                      :message="$i18n.t('DefaultString.MaxDate')"
                    />
                    <DxRangeRule
                      :min="MinDate"
                      :message="$i18n.t('DefaultString.MinDate')"
                    />
                  </DxValidator>
                </DxDateBox>
              </div>
            </div>
          </div>
          <div class="xs4 ml-3">
            <div class="row title justify-center">Ảnh chụp của xe</div>
            <div class="row font-italic font-14 text-xs-center justify-center">
              (Là hình ảnh cung cấp cho việc bán vé tại bến, quảng cáo cho
              xe,...)
            </div>
            <div class="row mt-2" style="height: 368px">
              <div class="xs-12 img-frame-container">
                <div class="row img-frame-content">
                  <DxGallery
                    height="100%"
                    :loop="true"
                    :item="[
                      'https://i.pinimg.com/originals/8c/e3/1c/8ce31c3864988da8466c0aa337d54b51.png',
                    ]"
                    :items="gallerys"
                    ref="DanhSachHinhAnh_View"
                    :slideshow-delay="0"
                    :show-indicator="true"
                    :show-nav-buttons="gallerys.length > 1 ? true : false"
                    :onSelectionChanged="onSelectionChanged"
                    width="100%"
                  >
                    <template #item="{ data }">
                      <div
                        class="row align-center"
                        style="width: 100%; height: 100%; overflow: hidden"
                      >
                        <img
                          :src="data"
                          loading="lazy"
                          style="width: 100%; height: auto"
                        />
                      </div>
                    </template>
                  </DxGallery>
                </div>
                <div class="row img-frame-button justify-center">
                  <input
                    type="file"
                    name=""
                    multiple
                    @change="handleChangeFile"
                    id="input-file"
                    class="input-file"
                    ref="inputfile"
                    style="display: none"
                  />
                  <DxButton
                    id=""
                    text=""
                    type="success"
                    stylingMode="text"
                    icon="mdi mdi-plus-circle"
                    @click="$refs.inputfile.click()"
                  />
                  <span class="mx-1"></span>
                  <DxButton
                    id=""
                    text=""
                    stylingMode="text"
                    type="danger"
                    icon="mdi mdi-delete"
                    @click="deleteImageGallery"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row title mt-4">Khoang chứa hàng</div>
        <div class="row mt-3">
          <div class="xs8 mr-2">
            <div class="row">
              <div class="xs6 mr-2">
                <DxTextBox
                  stylingMode="outlined"
                  label="Chiều dài (m)"
                  labelMode="floating"
                  validationMessageMode="always"
                  v-model="dataXe.KhoangChuaHang_ChieuDai"
                >
                </DxTextBox>
              </div>
              <div class="xs6 ml-3">
                <DxTextBox
                  stylingMode="outlined"
                  label="Chiều rộng (m)"
                  labelMode="floating"
                  validationMessageMode="always"
                  v-model="dataXe.KhoangChuaHang_ChieuRong"
                >
                </DxTextBox>
              </div>
            </div>
          </div>
          <div class="xs4 ml-3">
            <DxTextBox
              stylingMode="outlined"
              label="Chiều cao (m)"
              labelMode="floating"
              validationMessageMode="always"
              v-model="dataXe.KhoangChuaHang_ChieuCao"
            >
            </DxTextBox>
          </div>
        </div>
        <div class="row title mt-4">Thông tin giám sát hành trình</div>
        <div class="row mt-3">
          <div class="xs8 mr-2">
            <div class="row">
              <div class="xs6 mr-2">
                <DxSelectBox
                  id=""
                  v-model="dataXe.IdHangGSHT"
                  :dataSource="danhSachGSHT"
                  display-expr="TenHangGSHT"
                  value-expr="ID_HangGSHT"
                  :search-enabled="true"
                  styling-mode="outlined"
                  label="Hãng GSHT"
                  no-data-text="Không có dữ liệu!"
                />
              </div>
              <div class="xs6 ml-3">
                <DxTextBox
                  stylingMode="outlined"
                  label="Tài Khoản"
                  labelMode="floating"
                  validationMessageMode="always"
                  v-model="dataXe.GSHT_TaiKhoan"
                >
                </DxTextBox>
              </div>
            </div>
          </div>
          <div class="xs4 ml-3">
            <DxTextBox
              stylingMode="outlined"
              label="Mật khẩu"
              labelMode="floating"
              validationMessageMode="always"
              :mode="passwordMode"
              drop-down-button-template="icon"
              v-model="dataXe.GSHT_TaiKhoan"
            >
              <DxTextBoxButton
                :options="passwordButton"
                name="password"
                location="after"
              />
            </DxTextBox>
          </div>
        </div>
      </DxValidationGroup>
    </div>
  </div>
</template>

<script>
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
} from "devextreme-vue";
import { DxButton as DxTextBoxButton } from "devextreme-vue/text-box";
import {
  DxRequiredRule,
  DxEmailRule,
  DxStringLengthRule,
  DxRangeRule,
} from "devextreme-vue/validator";
import DxDateBox from "devextreme-vue/date-box";
export default {
  components: {
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
          text: "Xe khách thuộc công ty",
          disabled: false,
          to: "/Quan-Ly-Phuong-Tien",
        },
        {
          id: 3,
          text:
            Object.values(this.$route.query).length === 0
              ? "Tạo mới"
              : "Sửa thông tin xe",
          disabled: true,
        },
      ],
      dataXe: {
        BienKiemSoat: "",
        SoKhung: "",
        SoMay: "",
        SoDangKy: "",
        IdLoaiXe: "",
        TrongTai: "",
        SoGhe: "",
        SoGiuong: "",
        HanBaoHiem: null,
        HanDangKiem: null,
        HanBienBanTheChap: null,
        KhoangChuaHang_ChieuDai: "",
        KhoangChuaHang_ChieuRong: "",
        KhoangChuaHang_ChieuCao: "",
        IdHangGSHT: "",
        GSHT_TaiKhoan: "",
        GSHT_MatKhau: "",
      },
      DonViVanTai: "Công ty CPVT Hành Khách Thái Nguyên",
      danhSachLoaiXe: [],
      danhSachGSHT: [],
      gallerys: [],
      imageItemGallery: "",
      arrGallery: [],
    };
  },
  computed: {
    getChiTietXe() {
      return this.$store.state.QuanLyXeKhach.chiTietXeKhach;
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
    async handleClick() {
      let validate = this.$refs.formValidation.instance.validate();
      if (validate.isValid) {
        try {
          this.$startLoading;
          let result;
          let HanBaoHiem = new Date(this.dataXe.HanBaoHiem).toISOString();
          let HanDangKiem = new Date(this.dataXe.HanDangKiem).toISOString();
          let HanBienBanTheChap;
          if (this.dataXe.HanBienBanTheChap != "") {
            HanBienBanTheChap = new Date(
              this.dataXe.HanBienBanTheChap
            ).toISOString();
          }

          let dataForm = new FormData();
          dataForm.append("BienKiemSoat", this.dataXe.BienKiemSoat || "");
          dataForm.append("SoKhung", this.dataXe.SoKhung || "");
          dataForm.append("SoDangky", this.dataXe.SoDangKy || "");
          dataForm.append("IdLoaiXe", this.dataXe.IdLoaiXe || "");
          dataForm.append(
            "TrongTai",
            parseInt(this.dataXe.SoGhe) + parseInt(this.dataXe.SoGiuong) || 0
          );
          dataForm.append("SoGhe", this.dataXe.SoGhe || 0);
          dataForm.append("SoGiuong", this.dataXe.SoGiuong || 0);
          dataForm.append("HanBaoHiem", HanBaoHiem || "");
          dataForm.append("HanDangKiem", HanDangKiem || "");
          dataForm.append("HanBienBanTheChap", HanBienBanTheChap || "");
          dataForm.append("SoMay", this.dataXe.SoMay || "");
          dataForm.append(
            "KhoangChuaHang_ChieuDai",
            this.dataXe.KhoangChuaHang_ChieuDai || ""
          );
          dataForm.append(
            "KhoangChuaHang_ChieuRong",
            this.dataXe.KhoangChuaHang_ChieuRong || ""
          );
          dataForm.append(
            "KhoangChuaHang_ChieuCao",
            this.dataXe.KhoangChuaHang_ChieuCao || ""
          );
          dataForm.append("IdHangGSHT", this.dataXe.IdHangGSHT || "");
          dataForm.append("GSHT_TaiKhoan", this.dataXe.GSHT_TaiKhoan || "");
          dataForm.append("GSHT_MatKhau", this.dataXe.GSHT_MatKhau || "");
          this.arrGallery.forEach((item) => {
            dataForm.append("ThongTinHinhAnhs", item.file);
          });
          this.gallerys.forEach((itemImage) => {
            let index = itemImage.indexOf("idHinhAnh");
            if (index != -1) {
              let idImage = itemImage.slice(index + 10, itemImage.length);
              dataForm.append("IdHinhAnhs", idImage);
            }
          });

          if (Object.values(this.$route.query).length !== 0) {
            dataForm.append("IdXe", this.$route.query.IdXe);
            result = await this.$store.dispatch(
              "QuanLyXeKhach/SuaXeAction",
              dataForm
            );
          } else {
            result = await this.$store.dispatch(
              "QuanLyXeKhach/themXeAction",
              dataForm
            );
          }

          if (result.errorCode == 0) {
            this.ToastThongBao("success", result.message);
            this.$router.push({ name: "quanlyxekhach" });
          } else {
            this.ToastThongBao("error", result.message);
          }
          this.$stopLoading;
        } catch (ex) {
          console.log(ex);
          this.$stopLoading;
        }
      } else {
        this.$Helper.Common.autoFocusError(validate);
        this.ToastThongBao("error", "Thực hiện không thành công !");
      }
    },
    async LayDanhSachLoaiXe() {
      try {
        let danhSachXe = await this.$store.dispatch(
          "QuanLyXeKhach/DanhSachLoaiXe"
        );

        if (danhSachXe.errorCode == 0) {
          this.danhSachLoaiXe = danhSachXe.data;
        } else {
          this.ToastThongBao("error", danhSachXe.message);
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    async LayDanhSachGSHT() {
      try {
        let rsGSHT = await this.$store.dispatch("QuanLyXeKhach/DanhSachGSHT");

        if (rsGSHT.errorCode == 0) {
          this.danhSachGSHT = rsGSHT.data;
        } else {
          this.ToastThongBao("error", rsGSHT.message);
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    handleChangeFile(e) {
      let _this = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (this.gallerys.length < 3) {
        for (var i = 0; i < files.length; i++) {
          if (files.length <= 3) {
            let checkTypeImage =
              files[i].type == "image/jpeg" || files[i].type == "image/png";
            if (checkTypeImage) {
              if ((files[i].size * 0.00000095367431640625).toFixed(2) < 4) {
                let url = URL.createObjectURL(files[i]);
                _this.gallerys.push(url);
                _this.arrGallery.push({ file: files[i], link: url });
                setTimeout(() => {
                  _this.$refs.DanhSachHinhAnh_View.instance.repaint();
                }, 100);
              } else {
                _this.ToastThongBao(
                  "error",
                  "Vui lòng chỉ chọn ảnh nhỏ hơn 4MB!"
                );
              }
            } else {
              _this.ToastThongBao(
                "error",
                "Chỉ chọn tệp có định dạng: .jpeg/.jpg/.png"
              );
            }
          } else {
            _this.ToastThongBao("error", "Vui Lòng chọn tối đa 3 ảnh");
          }
        }
      } else {
        _this.ToastThongBao("error", "Vui Lòng chọn tối đa 3 ảnh");
      }
    },
    onSelectionChanged(item) {
      console.log(item);
      this.imageItemGallery = item.addedItems[0];
    },
    deleteImageGallery() {
      if (this.gallerys.length > 0) {
        let index = this.gallerys.findIndex(
          (item) => item == this.imageItemGallery
        );
        this.gallerys.splice(index, 1);
        let indexFile = this.arrGallery.findIndex(
          (e) => e.link == this.imageItemGallery
        );
        if (indexFile != -1) {
          this.arrGallery.splice(indexFile, 1);
        }
        setTimeout(() => {
          this.$refs.DanhSachHinhAnh_View.instance.repaint();
        }, 100);
      } else {
        return;
      }
    },
    async LayChiTietXe() {
      try {
        let rs = await this.$store.dispatch(
          "QuanLyXeKhach/LayChiTietXeAction",
          this.$route.query.IdXe
        );
        if (rs.errorCode == 0) {
          this.dataXe = this.getChiTietXe;
          this.getChiTietXe.HinhAnhs.forEach((item) => {
            this.gallerys.push(
              `http://lenh.nguyencongtuyen.local:19666/api/QuanLyThongTin/hinh-anh-xe?idHinhAnh=${item}`
            );
            setTimeout(() => {
              this.$refs.DanhSachHinhAnh_View.instance.repaint();
            }, 100);
          });
        }
      } catch (ex) {
        this.ToastThongBao("error", "Lỗi hệ thống !");
      }
    },
  },
  created() {
    this.LayDanhSachLoaiXe();
    this.LayDanhSachGSHT();
    this.LayChiTietXe();
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