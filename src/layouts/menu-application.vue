
<template>
  <Application
    :mynav="menuNav"
    @DangXuat="DangXuat"
    PhienBan="0.0.211005.1"
    :propModelToast="modelToast"
  >
    <template v-slot:default>
      <slot />
    </template>
  </Application>
</template>


<script>
import Application from "@sonphat/common-v1/components/application.vue";

export default {
  components: { Application },
  data() {
    return {
      menuNav: [
        {
          id: "Home",
          text: "Trang chủ",
          icon: "home",
          to: "/",
          expanded: false,
        },
        {
          id: "Chart",
          text: "Biểu đồ",
          icon: "mdi mdi-chart-bar",
          to: "/chart",
        },
        {
          id: "Chart-pie",
          text: "Biểu đồ tròn",
          parent: "Chart",
          icon: "mdi mdi-chart-donut",
          to: "/chart/pie",
        },
        {
          id: "quanlythongtin",
          text: "Quản lý thông tin",
          icon: "mdi mdi-inbox-arrow-down",
        },
        {
          id: "quanlybenxe",
          parent: "quanlythongtin",
          text: "Bến xe",
          to: "/Quan-Ly-Ben-Xe",
        },
        {
          id: "quanlyxekhachthuoccongty",
          parent: "quanlythongtin",
          text: "Xe khách thuộc công ty",
          to: "/Quan-Ly-Phuong-Tien",
        },
        {
          id: "quanlyluongtuyen",
          parent: "quanlythongtin",
          text: "Tuyến vận chuyển được cấp",
          to: "/Quan-Ly-Luong-Tuyen",
        },

        // QLTT
        // {
        //     id: "QLTT",
        //     text: this.$t("namePath.QuanLyThongTin"),
        //     icon: "mdi mdi-inbox-arrow-down",
        //     // external: true,
        //     expanded: false,
        // },
        // {
        //     id: this.$t("namePath.QuanLyBenXe"),
        //     parent: "QLTT",
        //     text: this.$t("namePath.QuanLyBenXe"),
        //     icon: "",
        //     to: "/Quan-Ly-Ben-Xe",
        //     expanded: false,
        // },
        // {
        //     id: this.$t("namePath.QuanLyLaiXe"),
        //     parent: "QLTT",
        //     text: this.$t("namePath.QuanLyLaiXe"),
        //     icon: "",
        //     to: "/Quan-Ly-Lai-Xe",
        //     expanded: false,
        // },
        // {
        //     id: this.$t("namePath.QuanLyLuongTuyen"),
        //     parent: "QLTT",
        //     text: this.$t("namePath.QuanLyLuongTuyen"),
        //     icon: "",
        //     to: "/Quan-Ly-Luong-Tuyen",
        //     expanded: false,
        // },
        // {
        //     id: this.$t("namePath.QuanLyPhuongTien"),
        //     parent: "QLTT",
        //     text: this.$t("namePath.QuanLyPhuongTien"),
        //     icon: "",
        //     to: "/Quan-Ly-Phuong-Tien",
        //     expanded: false,
        // },
      ],
      openState: false,
      modelToast: {
        isVisible: false,
        message: "",
        type: "success",
      },
    };
  },
  methods: {
    DangXuat() {
      this.$Core.Auth.Logout();
    },
  },
  mounted() {
    let self = this;
    this.emitter.on("onToast", (params) => {
      self.modelToast = params;
    });
  },
};
</script>

<style scoped>
>>> .icon-toast .dx-icon {
  font-size: 36px;
}
>>> .icon-toast {
  position: relative;
  left: -16px;
}
</style>