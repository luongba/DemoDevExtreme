<template>
  <DxToolbar :height="56" class="toolbar">
    <DxItem location="before" locate-in-menu="never">
      <template #default>
        <routerVue :breadcrumbsItems="breadcrumbsItems" />
      </template>
    </DxItem>
  </DxToolbar>

  <div class="container">
    <DxPieChart
      :data-source="populationByRegions"
      id="pie"
      type="doughnut"
      title="Biểu đồ Tròn"
      palette="Soft Pastel"
    >
      <DxSeries argument-field="region" value-field="val">
        <DxLabel :visible="true" format="millions"> </DxLabel>
      </DxSeries>

      <DxLegend
        :margin="0"
        horizontal-alignment="right"
        vertical-alignment="top"
      />
    </DxPieChart>
  </div>
</template>

<script>
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";
import DxPieChart, {
  DxLegend,
  DxSeries,
  DxTooltip,
  DxFormat,
  DxLabel,
  DxConnector,
  DxExport,
} from "devextreme-vue/pie-chart";
import routerVue from "@sonphat/common-v1/components/router.vue";
export default {
  components: {
    DxToolbar,
    DxItem,
    DxPieChart,
    DxLegend,
    DxSeries,
    DxTooltip,
    DxFormat,
    DxLabel,
    DxConnector,
    DxExport,
    routerVue,
  },
  data() {
    return {
      populationByRegions: [
        {
          region: "Asia",
          val: 4119626293,
        },
        {
          region: "Africa",
          val: 1012956064,
        },
        {
          region: "Northern America",
          val: 344124520,
        },
        {
          region: "Latin",
          val: 590946440,
        },
        {
          region: "Europe",
          val: 727082222,
        },
        {
          region: "Oceania",
          val: 35104756,
        },
      ],
      breadcrumbsItems: [
        {
          id: 1,
          text: "Biểu đồ",
          disabled: false,
          to: "/chart",
        },
        {
          id: 2,
          text: "Biểu đồ tròn",
          disabled: true,
          to: "",
        },
      ],
    };
  },
};
</script>

<style>
#pie {
  height: 60vh;
}
</style>