<template>
  <DxToolbar :height="56" class="toolbar">
    <DxItem location="before" locate-in-menu="never">
      <template #default>
        <routerVue :breadcrumbsItems="breadcrumbsItems" />
      </template>
    </DxItem>
  </DxToolbar>
  <div class="container">
    <DxDataGrid
      key-expr="id"
      id="dataGrid"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :show-borders="true"
      :data-source="dataSource"
    >
    <DxFilterRow :visible="true"/>
      <DxPaging :page-size="10" />
      <DxSearchPanel :visible="true" :width="240" stylingMode="outlined" placeholder="Search..." />
      <DxColumn :width="100" caption="id" data-field="id" />
      <DxColumn caption="Tiêu đề" data-field="title">
        <DxHeaderFilter :allow-search="true" />
      </DxColumn>
      <DxColumn caption="Nội dung" data-field="body" />
    </DxDataGrid>

    
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxHeaderFilter,
  DxSearchPanel,
  DxFilterRow
} from "devextreme-vue/data-grid";
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";
import routerVue from "@sonphat/common-v1/components/router.vue";
export default {
  components: {
    DxDataGrid,
    DxToolbar,
    DxItem,
    routerVue,
    DxColumn,
    DxPaging,
    DxSearchPanel,
    DxHeaderFilter,
    DxFilterRow
  },
  data() {
    return {
      breadcrumbsItems: [
        {
          id: 1,
          text: "Home",
          disabled: false,
          to: "/",
        },
        {
          id: 2,
          text: "Data grid",
          disabled: true,
          to: "",
        },
      ],
      dataSource: [],
    };
  },
  methods: {
    async GetData() {
      this.dataSource = [];
      try {
        let rs = await this.$store.dispatch("TaiKhoanLaiXe/getDataPost");
        if (rs.StatusCode == 200) {
          this.dataSource = rs.Data;
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  },
  created() {
    this.GetData();
  },
};
</script>

<style>
</style>