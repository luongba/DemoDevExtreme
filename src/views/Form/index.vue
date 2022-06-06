<template>
  <DxToolbar :height="56" class="toolbar">
    <DxItem location="before" locate-in-menu="never">
      <template #default>
        <routerVue :breadcrumbsItems="breadcrumbsItems" />
      </template>
    </DxItem>
  </DxToolbar>
  <div class="container">
    <DxValidationGroup ref="formValidation">
      <div class="row">
        <div class="xs6 mr-3">
          <DxTextBox
            v-model="user.firstName"
            stylingMode="outlined"
            label="Họ tên (*)"
            labelMode="floating"
            validationMessageMode="always"
          >
            <DxValidator ref="validate">
              <DxRequiredRule message="Không được bỏ trống!" />
            </DxValidator>
          </DxTextBox>
          <div class="mt-5">
            <DxDateBox
              v-model="user.birth"
              stylingMode="outlined"
              label="Ngày sinh (*)"
              labelMode="floating"
              type="date"
            >
              <DxValidator ref="validate">
                <DxRequiredRule message="Không được bỏ trống!" />
              </DxValidator>
            </DxDateBox>
          </div>
          <div class="mt-5">
            <!-- ?{{ city }} -->
            <DxSelectBox
              :dataSource="city"
              label="Thành Phố (*)"
              labelMode="floating"
              :disabled="isDisableHuyen"
              validationMessageMode="always"
              stylingMode="outlined"
              :searchEnabled="true"
              :searchTimeout="200"
              display-expr="Name"
              value-expr="Name"
              :onValueChanged="handlePropertyChangeHuyen"
              v-model="user.huyen"
            >
            </DxSelectBox>
          </div>
        </div>
        <div class="xs6 mr-3">
          <DxTextBox
            v-model="user.address"
            stylingMode="outlined"
            label="Địa chỉ (*)"
            labelMode="floating"
            validationMessageMode="always"
          >
            <DxValidator ref="validate">
              <DxRequiredRule message="Không được bỏ trống!" />
            </DxValidator>
          </DxTextBox>
          <div class="mt-5">
            <DxSelectBox
              :dataSource="renderTinh"
              label="Tỉnh (*)"
              labelMode="floating"
              validationMessageMode="always"
              stylingMode="outlined"
              :searchEnabled="true"
              :searchTimeout="200"
              v-model="user.tinh"
              :onValueChanged="handlePropertyChangeTinh"
              display-expr="Name"
              value-expr="Name"
            >
              <DxValidator ref="validate">
                <DxRequiredRule message="Không được bỏ trống!" />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="mt-5">
            <DxSelectBox
              :dataSource="phuong"
              label="Xã Phường (*)"
              labelMode="floating"
              validationMessageMode="always"
              stylingMode="outlined"
              :searchEnabled="true"
              :disabled="isDisablephuong"
              :searchTimeout="200"
              v-model="user.phuong"
              display-expr="Name"
              value-expr="Name"
              
            >
            </DxSelectBox>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="xs12 mr-3">
          <DxTextArea
            :height="200"
            label="Giới thiệu bản thân (*)"
            v-model="user.review"
            labelMode="floating"
            stylingMode="outlined"
          >
            <DxValidator ref="validate">
              <DxRequiredRule message="Không được bỏ trống!" />
            </DxValidator>
          </DxTextArea>
        </div>
      </div>
    </DxValidationGroup>

    <div class="row mt-4">
      <DxButton
        text="Submit"
        type="default"
        styling-mode="contained"
        @click="Submit()"
      />
    </div>
  </div>
</template>

<script>
import DxTextArea from "devextreme-vue/text-area";
import DxSelectBox from "devextreme-vue/select-box";
import DxDateBox from "devextreme-vue/date-box";
import { DxButton } from "devextreme-vue/button";
import routerVue from "@sonphat/common-v1/components/router.vue";
import { DxToolbar, DxItem } from "devextreme-vue/toolbar";
import { DxTextBox, DxValidator, DxValidationGroup } from "devextreme-vue";
import { DxRequiredRule } from "devextreme-vue/validator";
import dataAddress from "./data-address";
export default {
  components: {
    DxButton,
    DxValidator,
    DxValidationGroup,
    DxToolbar,
    DxItem,
    routerVue,
    DxRequiredRule,
    DxTextBox,
    DxDateBox,
    DxSelectBox,
    DxTextArea,
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
          text: "Form",
          disabled: true,
          to: "",
        },
      ],
      phoneEditorOptions: {
        mask: "+84 X00 000 000",
        maskRules: {
          X: /[3-9]/,
        },
        maskInvalidMessage: "Số điện thoại phải là của vùng Việt Nam",
      },
      gioiTinh: ["Nam", "Nữ"],
      checkBoxOptions: {
        text: "I agree to the Terms and Conditions",
        value: false,
      },
      buttonOptions: {
        text: "Register",
        type: "success",
        useSubmitBehavior: true,
      },
      user: {
        firstName: "",
        address: "",
        birth: "",
        tinh: "",
        huyen: "",
        phuong: "",
        review: "",
      },
      city: [],
      phuong: [],
      tinh: dataAddress,
      isDisableHuyen: true,
      isDisablephuong: true,
    };
  },
  computed: {
    renderTinh() {
      return this.tinh;
    },
    renderCity() {
      return this.city;
    },
  },
  methods: {
    checkComparison() {
      return true;
    },
    handleSubmit(e) {
      e.preventDefault();
    },
    Submit() {
      let validate = this.$refs.formValidation.instance.validate();
      if (validate.isValid) {
        //   DO
        console.log(this.user);
      } else {
        this.$Helper.Common.autoFocusError(validate);
      }
    },
    handlePropertyChangeTinh(e) {
      console.log(e);
      let tmpArr = dataAddress.filter((tmp) => tmp.Name == e.value) || [];
      if (tmpArr.length && tmpArr.length > 0) {
        this.city = tmpArr[0].Districts;
        this.phuong = [];
        this.isDisableHuyen = false;
      }
    },
    handlePropertyChangeHuyen(e) {
      let tmpArr = this.city.filter((tmp) => tmp.Name === e.value) || [];
      if (tmpArr.length > 0) {
        this.phuong = tmpArr[0].Wards;
        this.isDisablephuong = false;
      }
    },
  },
};
</script>

<style>
</style>