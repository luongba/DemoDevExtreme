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
        @click="getDanhSachBenXe()"
      />
      <DxButton
        type="normal"
        icon="mdi mdi-plus-circle"
        styling-mode="contained"
        class="ml-2"
        @click="$router.push({ name: 'thongtinluongtuyen' })"
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
            name: 'thongtinluongtuyen',
            query: { IdLuongTuyen: rowSelect.IdLuongTuyen },
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
        @click="XoaBenXe"
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
      :data-source="dataLuongTuyen"
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
        groupCellTemplate="groupCellTemplate"
        :allowFiltering="true"
        :allowSorting="true"
        :fixed="true"
        :allowHeaderFiltering="false"
        data-field="MaTuyen"
        caption="Mã tuyến"
        width="150"
        alignment="center"
      ></DxColumn>
      <DxColumn
        groupCellTemplate="groupCellTemplate"
        :allowFiltering="true"
        :allowSorting="true"
        :fixed="true"
        data-field="TenTuyen"
        caption="Tên tuyến"
        width="320"
        alignment="left"
      ></DxColumn>
      <DxColumn
        groupCellTemplate="groupCellTemplate"
        :allowFiltering="true"
        :allowSorting="true"
        :fixed="true"
        data-field="BenDi"
        caption="Bến đi"
        width="300"
        alignment="left"
      ></DxColumn>
      <DxColumn
        data-field="BenDen"
        caption="Bến đến"
        groupCellTemplate="groupCellTemplate"
        alignment="left"
      ></DxColumn>
      <DxColumn
        data-field="CuLy"
        caption="Cự ly (km)"
        :allowHeaderFiltering="false"
        groupCellTemplate="groupCellTemplate"
        alignment="right"
      ></DxColumn>
      <DxColumn
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
                name: 'thongtinluongtuyen',
                query: { IdLuongTuyen: data.data.IdLuongTuyen },
              })
            "
            hint="Sửa"
          ></DxButton>
          <DxButton
            id=""
            icon="mdi mdi-delete"
            class="mx-2"
            @click="XoaBenXeInline(data.data.IdLuongTuyen)"
            hint="Xóa"
          ></DxButton>
        </div>
      </template>
      <DxSummary>
        <DxTotalItem
          column="MaTuyen"
          summary-type="count"
          showInColumn="id"
          displayFormat="Tổng số tuyến: {0}"
        />
      </DxSummary>
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
          text: "Tuyến vận chuyển được cấp",
          disabled: true,
        },
      ],
      dataLuongTuyen: [],
      selectedRowKeys: [],
      rowSelect: [],
      popupXacNhanXoa: false,
      paramXacNhanXoa: {
        WidthTitle: "90%",
        Title: "Xác nhận xóa thông tin luồng tuyến khỏi hệ thống?",
        btnLeft: "HỦY",
        btnRight: "ĐỒNG Ý",
      },
      dataXoa: "",
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
    async getDanhSachLuongTuyen() {
      try {
        this.dataLuongTuyen = (
          await this.$store.dispatch(
            "QuanLyLuongTuyen/LayDanhSachLuongTuyenAction"
          )
        ).Store;
      } catch (error) {
        this.ToastThongBao("error", error);
      }
    },
    onSelectionChanged(e) {
      this.rowSelect = e.selectedRowKeys[e.selectedRowKeys.length - 1];
      this.selectedRowKeys = e.selectedRowKeys;
    },
    async XoaBenXe() {
      this.popupXacNhanXoa = true;
      this.dataXoa = this.rowSelect.IdLuongTuyen;
    },
    async XoaBenXeInline(param) {
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
            "QuanLyLuongTuyen/XoaLuongTuyenAction",
            this.dataXoa
          );
          if (!rs.errorCode == 0 && rs.status) {
            this.ToastThongBao("error", rs.message);
          } else {
            this.ToastThongBao("success", rs.message);
            this.getDanhSachLuongTuyen();
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
    this.getDanhSachLuongTuyen();
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
