<template>
  <div class="state-tooltip">
    <div class="capital">
      <span class="caption">Buổi</span>: {{ info.seriesName }}
    </div>
    <div>
      <span class="caption">Nhiệt độ: </span>:
      <span class="population">{{ formatNumber(info.value) }} độ C</span>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
  },
  methods: {
    formatNumber: new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format,
  },
  created(){
    console.log(this.info);  
  }
};
</script>
<style>
.state-tooltip {
  height: 90px;
}

.state-tooltip > img {
  width: 60px;
  height: 40px;
  display: block;
  margin: 0 5px 0 0;
  float: left;
  border: 1px solid rgba(191, 191, 191, 0.25);
}

.state-tooltip > h4 {
  line-height: 40px;
  font-size: 14px;
  margin-bottom: 5px;
}

.state-tooltip .caption {
  font-weight: 500;
}

.state-tooltip sup {
  font-size: 0.8em;
  vertical-align: super;
  line-height: 0;
}
</style>