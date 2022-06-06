<template>
  <div class="row justify-end align-center">
    <DxButton
      text="Contained"
      type="success"
      icon="mdi mdi-arrow-down-thick"
      styling-mode="contained"
      :rtlEnabled="true"
      @click="onClick($event)"
    />
    {{ new Date() }}
    {{ $Helper.Common.getStartDay(new Date()) }}
  </div>
</template>
<script>
import { DxButton } from "devextreme-vue/button";
export default {
  components: {
    DxButton,
  },
};
</script>

<style lang="scss">
.logos-container {
  margin: 20px 0 40px 0;
  text-align: center;
  svg {
    display: inline-block;
  }
}

.devextreme-logo {
  width: 200px;
  height: 34px;
  margin-bottom: 17px;
}

.vue-logo {
  width: 180px;
  height: 62px;
}

.plus {
  margin: 20px 10px;
  width: 22px;
  height: 22px;
}

.screen-x-small .logos-container {
  svg {
    width: 100%;
    display: block;
    &.plus {
      margin: 0;
    }
  }
}
</style>
