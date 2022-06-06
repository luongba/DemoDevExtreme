<template>
  <DxToolbar :height="56" class="toolbar">
    <DxItem location="before" locate-in-menu="never">
      <template #default>
        <routerVue :breadcrumbsItems="breadcrumbsItems" />
      </template>
    </DxItem>
  </DxToolbar>
  <div class="container">
    <DxChart
      id="chart"
      :data-source="renderData"
      title="World Population by Decade"
    >
      <DxCommonSeriesSettings
        argument-field="day"
        type="bar"
        hover-mode="allArgumentPoints"
        selection-mode="allArgumentPoints"
      >
      </DxCommonSeriesSettings>
      <DxArgumentAxis>
        <DxLabel :customize-text="customizeArgumenText" :visible="true" />
      </DxArgumentAxis>
      <DxValueAxis>
        <DxLabel :customize-text="customizeLabelText" :visible="true" />
      </DxValueAxis>
      <DxSeries
        value-field="a"
        name="Sáng"
      />
      <DxSeries
        :barWidth="40"
        value-field="p"
        name="Tối"
      />
      <DxTooltip :enabled="true" content-template="tooltipTemplate" />
      <template #tooltipTemplate="{ data }">
        <TooltipVue :info="data" />
      </template>
      <DxLegend vertical-alignment="bottom" horizontal-alignment="center" />
    </DxChart>

  </div>
</template>

<script>
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";
import DxChart, {
  DxArgumentAxis,
  DxCommonSeriesSettings,
  DxLabel,
  DxLegend,
  DxSeries,
  DxTooltip,
  DxValueAxis,
  DxConstantLine,
} from "devextreme-vue/chart";
import TooltipVue from "./components/Tooltip.vue";
import routerVue from "@sonphat/common-v1/components/router.vue";
export default {
  components: {
    DxChart,
    DxArgumentAxis,
    DxCommonSeriesSettings,
    DxLabel,
    DxLegend,
    DxSeries,
    DxTooltip,
    DxValueAxis,
    DxConstantLine,
    TooltipVue,
    routerVue,
    DxToolbar, DxItem 
  },
  data() {
    return {
      palette: ["#c3a2cc", "#b7b5e0", "#e48cba"],
      populationData: [
        { day: "1", a: 11, p: 14 },
        { day: "2", a: 7, p: 15 },
        { day: "3", a: 6, p: 12 },
        { day: "4", a: 8, p: 16 },
        { day: "5", a: 7, p: 14 },
        { day: "6", a: 7, p: 13 },
        { day: "7", a: 11, p: 1 },
        { day: "8", a: 9, p: 0 },
        { day: "9", a: 5, p: 9 },
        { day: "10", a: 8, p: 14 },
        { day: "11", a: 6, p: 17 },
        { day: "12", a: 9, p: 19 },
        { day: "13", a: 8, p: 12 },
        { day: "14", a: 6, p: 16 },
        { day: "15", a: 6, p: 11 },
        { day: "16", a: 6, p: 7 },
        { day: "17", a: 10, p: 6 },
        { day: "18", a: 9, p: 9 },
        { day: "19", a: 12, p: -2 },
        { day: "20", a: 9, p: 1 },
        { day: "21", a: 8, p: 0 },
        { day: "22", a: 13, p: 10 },
        { day: "23", a: 9, p: 15 },
        { day: "24", a: 7, p: 19 },
        { day: "25", a: 6, p: 20 },
        { day: "26", a: 11, p: 14 },
        { day: "27", a: 8, p: 12 },
        { day: "28", a: 7, p: 14 },
        { day: "29", a: 9, p: 15 },
        { day: "30", a: 7, p: 10 },
        { day: "31", a: 3, p: 11 },
      ],
      paletteIndex: 0,
      breadcrumbsItems: [
        {
          id: 1,
          text: "Home",
          disabled: false,
          to: "/",
        },
        {
          id: 2,
          text: "Biểu đồ",
          disabled: true,
          to: "/chart/pie",
        },
      ],
    };
  },
  methods: {
    customizePoint() {
      const color = this.palette[this.paletteIndex];
      this.paletteIndex = this.paletteIndex === 2 ? 0 : this.paletteIndex + 1;

      return { color };
    },
    customizeLabelText({ valueText }) {
      return `${valueText}${"&#176C"}`;
    },
    customizeArgumenText({ valueText }) {
      return `ngày ${valueText}`;
    },
    customizeTooltip(pointInfo) {
      return {
        text: `Buổi: ${pointInfo.seriesName} - Nhiệt độ: ${pointInfo.valueText} Độ C`,
      };
    },
  },
  computed: {
    renderData() {
      const dataCustom = this.populationData.filter(
        (e) => parseInt(e.day) % 2 === 0
      );
      return dataCustom;
    },
  },
  created() {
    console.log(this.renderData);
  },
};
</script>

<style>
.action {
  width: 330px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action .dx-selectbox {
  width: 90px;
}
#chart {
  height: 800px;
}

.chartPage {
  width: 100%;
  height: 100%;
}
</style>