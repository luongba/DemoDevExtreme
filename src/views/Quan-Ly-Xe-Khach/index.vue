<template>
  <DxToolbar :height="56" class="toolbar">
    <DxItem location="before" locate-in-menu="never">
      <template #default>
        <routerVue :breadcrumbsItems="breadcrumbsItems" />
      </template>
    </DxItem>
  </DxToolbar>
  <div class="row">
    <div class="xs12" style="padding: 6px 0px 6px 24px">
      <DxButton
        type="normal"
        icon="mdi mdi-refresh"
        styling-mode="contained"
        hint="Tải lại"
        @click="getDanhSachXekhach()"
      />
      <DxButton
        type="normal"
        icon="mdi mdi-plus-circle"
        styling-mode="contained"
        class="ml-2"
        @click="$router.push({ name: 'thongtinphuongtien' })"
        hint="Thêm mới"
      />
      <DxButton
        type="normal"
        icon="mdi mdi-pencil"
        styling-mode="contained"
        class="ml-2"
        :disabled="selectedRowKeys.length != 1"
        @click="
          $router.push({
            name: 'thongtinphuongtien',
            query: { IdXe: rowSelect.IdXe },
          })
        "
        hint="Sửa"
      />
      <DxButton
        type="normal"
        icon="mdi mdi-delete"
        styling-mode="contained"
        class="ml-2"
        :disabled="selectedRowKeys.length != 1 ? true : false"
        @click="XoaXeKhach"
        hint="Xóa"
      />
      <!-- :disabled="arrSelected.length == 0" -->
      <DxButton
        type="normal"
        icon="mdi mdi-file-excel"
        styling-mode="contained"
        class="ml-2"
        hint="Xuất Excel"
      />
      <div class="float-right mr-3">
        <DxButton
          type="normal"
          icon="mdi mdi-cog"
          styling-mode="contained"
          class="ml-2"
          hint="Cài đặt"
        />
      </div>
    </div>
  </div>
  <div class="pl-4">
    <DxDataGrid
      id="data"
      class="table-page"
      :show-borders="true"
      :data-source="dataXeKhach"
      :remote-operations="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :loadPanel="{ showIndicator: false, showPane: false, text: '' }"
      key-expr=""
      @selection-changed="onSelectionChanged"
      height="calc(100vh - 124px)"
      no-data-text="Không có dữ liệu!"
      @cellHoverChanged="onCellHoverChanged"
    >
      <DxPaging :page-size="15" />
      <DxScrolling mode="virtual" row-rendering-mode="virtual" />

      <DxColumnFixing :enabled="true" />
      <DxHeaderFilter :visible="true" />
      <DxFilterRow :visible="true" apply-filter="auto" />
      <DxSelection
        mode="multiple"
        show-check-boxes-mode="always"
        select-all-mode="allPages"
      />
      <DxColumn
        :allowFiltering="true"
        :allowSorting="true"
        :fixed="true"
        data-field="BienKiemSoat"
        caption="Biển kiểm soát"
        :width="150"
        groupCellTemplate="groupCellTemplate"
      ></DxColumn>
      <DxColumn
        :allowFiltering="true"
        :allowSorting="true"
        :fixed="true"
        format="HH:mm:ss dd/MM/yyyy"
        data-field="TenDonVi"
        caption="Đơn vị vận tải"
        groupCellTemplate="groupCellTemplate"
        alignment="left"
      ></DxColumn>
      <DxColumn
        :allowFiltering="true"
        :allowSorting="true"
        :allowHeaderFiltering="false"
        :fixed="true"
        format="HH:mm:ss dd/MM/yyyy"
        data-field="SoDangKyXe"
        caption="Số đăng ký xe"
        width="165"
        groupCellTemplate="groupCellTemplate"
        alignment="left"
      ></DxColumn>
      <DxColumn
        data-field="SoGhe_SoGiuong"
        caption="Số chỗ"
        groupCellTemplate="groupCellTemplate"
        alignment="right"
      ></DxColumn>
      <DxColumn
        format="dd/MM/yyyy"
        data-field="HanBienBanTheChap"
        caption="Hạn biên bản thế chấp"
        dataType="date"
        groupCellTemplate="groupCellTemplate"
        alignment="left"
      ></DxColumn>
      <DxColumn
        format="dd/MM/yyyy"
        data-field="HanDangKiem"
        caption="Hạn đăng kiểm"
        data-type="date"
        groupCellTemplate="groupCellTemplate"
        alignment="left"
      ></DxColumn>
      <DxColumn
        format="dd/MM/yyyy"
        data-field="HanBaoHiem"
        data-type="date"
        caption="Hạn bảo hiểm"
        groupCellTemplate="groupCellTemplate"
        alignment="left"
      ></DxColumn>
      <DxColumn
        :width="180"
        alignment="left"
        data-field="TrangThai"
        caption="Trạng thái"
        cell-template="diff-cell-template"
        :fixed="true"
        fixedPosition="right"
      />
      <template #diff-cell-template="{ data }">
        <div :style="`color:${data.data.MaMauTrangThai}`">
          {{ data.data.TrangThai }}
        </div>
      </template>
      <!-- Summary -->
      <DxSummary>
        <DxTotalItem
          column="BienKiemSoat"
          summary-type="count"
          showInColumn="id"
          displayFormat="Tổng số xe: {0}"
        />
      </DxSummary>
      <!-- Hover button -->
      <DxColumn
        cssClass="column-button-hover"
        data-field="Detail"
        caption="Trạng thái"
        width="1"
        cell-template="buttons-cell"
        :fixed="true"
        fixed-position="right"
      ></DxColumn>
      <template #buttons-cell="{ data }">
        <div class="buttons">
          <DxButton
            id=""
            icon="mdi mdi-pencil"
            @click="
              $router.push({
                name: 'thongtinphuongtien',
                query: { IdXe: data.data.IdXe },
              })
            "
            hint="Sửa"
          ></DxButton>
          <DxButton
            id=""
            icon="mdi mdi-delete"
            class="mx-2"
            @click="XoaXeKhachInline(data.data.IdXe)"
            hint="Xóa"
          ></DxButton>
        </div>
      </template>
    </DxDataGrid>
    <DxPopup
      v-model:visible="popupXacNhanXoa"
      :drag-enabled="false"
      :close-on-outside-click="false"
      :show-close-button="false"
      :show-title="false"
      :width="300"
      height="auto"
    >
      <PopupXacNhan :Params="paramXacNhanXoa" @click="XacNhanXoa" />
    </DxPopup>
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
  DxTotalItem,
  DxExport,
} from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";
import routerVue from "@sonphat/common-v1/components/router.vue";
import PopupXacNhan from "@sonphat/common-v1/components/PopupXacNhan.vue";

import DxPopup from "devextreme-vue/popup";
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
    DxToolbar,
    DxItem,
    routerVue,
    DxButton,
    DxTotalItem,
    PopupXacNhan,
    DxPopup,
    DxExport,
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
          text: "Xe khách thuộc công ty",
          disabled: true,
        },
      ],
      dataXeKhach: [],
      selectedRowKeys: [],
      rowSelect: [],
      popupXacNhanXoa: false,
      paramXacNhanXoa: {
        WidthTitle: "90%",
        Title: "Xác nhận xóa thông tin xe khỏi hệ thống ?",
        btnLeft: "HỦY",
        btnRight: "ĐỒNG Ý",
      },
      dataXoa: "",
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
    async getDanhSachXekhach() {
      try {
        this.dataXeKhach = (
          await this.$store.dispatch("QuanLyXeKhach/LayDanhSachXeKhach")
        ).Store;
      } catch (error) {
        this.ToastThongBao("error", error);
      }
    },

    onSelectionChanged(e) {
      this.rowSelect = e.selectedRowKeys[e.selectedRowKeys.length - 1];
      this.selectedRowKeys = e.selectedRowKeys;
    },
    async XoaXeKhach() {
      this.popupXacNhanXoa = true;
      this.dataXoa = this.rowSelect.IdXe;
    },
    async XoaXeKhachInline(param) {
      this.popupXacNhanXoa = true;
      this.dataXoa = param;
    },
    onCellHoverChanged(e) {
      this.$Helper.Common.table({ Element: e, Buttons: true }).HoverRow();
    },
    async XacNhanXoa(bool) {
      if (bool == true) {
        try {
          let rs = await this.$store.dispatch(
            "QuanLyXeKhach/XoaXekhachAction",
            this.dataXoa
          );
          if (!rs.errorCode == 0 && rs.status) {
            this.ToastThongBao("error", rs.message);
          } else {
            this.ToastThongBao("success", rs.message);
            this.getDanhSachXekhach();
          }
        } catch (ex) {
          this.ToastThongBao("error", "Lỗi hệ thống");
        }
      } else {
        // Huy
      }
      this.dataXoa = null;
      this.popupXacNhanXoa = false;
    },
  },
  created() {
    this.getDanhSachXekhach();
  },
};
</script>

<style>
.float-right {
  float: right;
}
.dx-data-row .text-highlighted {
  color: rgb(19, 176, 0);
}
</style>
