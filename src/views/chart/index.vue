<template>
  <div class="wrapper">
    <div class="row">
      <div class="xs2">
        <div class="chart__container">
          <p class="chart__total">3280</p>
          <p class="chart__title">Số lượng Xe Vào Bến</p>
        </div>
        <div class="chart__container">
          <p class="chart__total">3280</p>
          <p class="chart__title">Số lượng Xe Vào Bến</p>
        </div>
      </div>
      <div class="xs4">
        <div class="chart__container">
          <DxPieChart
            :data-source="populationByRegions"
            id="pie__first"
            type="doughnut"
            palette="Soft Pastel"
          >
            <DxSeries argument-field="region" value-field="val">
              <DxLabel :visible="true" format="millions"> </DxLabel>
            </DxSeries>

            <DxLegend
              :row-count="2"
              vertical-alignment="bottom"
              horizontal-alignment="center"
              item-text-position="right"
            />
          </DxPieChart>
        </div>
      </div>
      <div class="xs4">
        <div class="chart__container">
          <DxPieChart
            :data-source="populationByRegions"
            id="pie__second"
            type="doughnut"
            palette="Soft Pastel"
          >
            <DxSeries argument-field="region" value-field="val">
              <!-- <DxLabel :visible="true" format="millions"> </DxLabel> -->
            </DxSeries>

            <DxLegend
              :row-count="2"
              vertical-alignment="bottom"
              horizontal-alignment="center"
              item-text-position="right"
            />
          </DxPieChart>
        </div>
      </div>
      <div class="xs2">
        <div class="chart__container">
          <p class="chart__total">3280</p>
          <p class="chart__title">Số lượng Xe Vào Bến</p>
        </div>
        <div class="chart__container">
          <p class="chart__total">3280</p>
          <p class="chart__title">Số lượng Xe Vào Bến</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="xs2">
        <div class="chart__container">
          <p class="chart__total">3280</p>
          <p class="chart__title">Số lượng Xe Vào Bến</p>
        </div>
        <div class="chart__container">
          <p class="chart__total">3280</p>
          <p class="chart__title">Số lượng Xe Vào Bến</p>
        </div>
      </div>
      <div class="xs4">
        <div class="chart__container">
          <DxChart
            id="chart__line"
            :data-source="populationByRegions"
            title="Population by Countries"
          >
            <DxSeries argument-field="region" />
            <DxArgumentAxis>
              <DxLabel :overlapping-behavior="currentMode" word-wrap="none" />
            </DxArgumentAxis>
            <DxLegend :visible="false" />
          </DxChart>
        </div>
      </div>
      <div class="xs6">
        <div class="chart__container start">
          <DxChart id="chart__bar" :data-source="populationByRegions">
            <DxSeries
              argument-field="region"
              value-field="val"
              type="bar"
              color="#ffaa66"
            />
          </DxChart>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="xs12">
        <div class="chart__container start">
          <DxChart
            id="chart__area"
            :data-source="dataSource"
            palette="Harmony Light"
            title="Population: Age Structure (2018)"
          >
            <DxCommonSeriesSettings :type="type" argument-field="country" />
            <DxSeries value-field="y1564" name="15-64 years" />
            <DxSeries value-field="y014" name="0-14 years" />
            <DxSeries value-field="y65" name="65 years and older" />
            <DxMargin :bottom="20" />
            <DxArgumentAxis :value-margins-enabled="false" />
            <DxLegend
              vertical-alignment="bottom"
              horizontal-alignment="center"
            />
            <DxExport :enabled="true" />
          </DxChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DxPieChart, {
  DxLegend,
  DxSeries,
  DxTooltip,
  DxFormat,
  DxLabel,
  DxConnector,
  DxExport,
} from "devextreme-vue/pie-chart";
import DxChart, {
  DxArgumentAxis,
  DxCommonSeriesSettings,
} from "devextreme-vue/chart";
export default {
  components: {
    DxPieChart,
    DxLegend,
    DxSeries,
    DxTooltip,
    DxFormat,
    DxLabel,
    DxConnector,
    DxExport,
    DxChart,
    DxArgumentAxis,
    DxLabel,
    DxLegend,
    DxSeries,
    DxTooltip,
    DxCommonSeriesSettings,
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
          region: "Latin America",
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
      dataSource: [
        {
          country: "China",
          y014: 233866959,
          y1564: 1170914102,
          y65: 171774113,
        },
        {
          country: "India",
          y014: 373419115,
          y1564: 882520945,
          y65: 76063757,
        },
        {
          country: "United States",
          y014: 60554755,
          y1564: 213172625,
          y65: 54835293,
        },
        {
          country: "Indonesia",
          y014: 65715705,
          y1564: 177014815,
          y65: 18053690,
        },
        {
          country: "Brazil",
          y014: 45278034,
          y1564: 144391494,
          y65: 17190842,
        },
        {
          country: "Russia",
          y014: 24465156,
          y1564: 96123777,
          y65: 20412243,
        },
      ],
    };
  },
};
</script>

<style>
#pie__first {
  height: 32vh;
}
#pie__second {
  height: 32vh;
}

#chart__line {
  height: 32vh;
}

#chart__bar {
  height: 32vh;
  width: 85%;
}

#chart__area {
  height: 21vh;
  width: 86%;
}
.wrapper {
  width: 100%;
  height: 100vh;
  background: #eee;
  padding: 10px;
  box-sizing: border-box;
}
.chart__container {
  margin: 10px;
  background: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 160px;
}

.chart__container.start {
  align-items: flex-start;
}

.chart__total {
  font-size: 35px;
  font-weight: 600;
}

.chart__title {
  margin-top: 10px;
  font-size: 18px;
  color: #666;
  text-align: center;
}
</style>