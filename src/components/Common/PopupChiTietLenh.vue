<template>
    <div class="mx-4 mt-4">
        <div class="row justify-center font-20 font-bold mb-3">
            Thông tin chi tiết
        </div>

        <div class="row justify-center">
            <img
                src="../../assets/images/ex_QRCode.jpg"
                style="border: 1px solid #dadce0; width: 180px; height: 180px"
                alt=""
            />
        </div>
        <div :class="classUnderQRCode" class="mt-2">
            {{ details.MaLenh }} ֎ {{ details.BienKiemSoat }}
        </div>
        <div :class="classUnderQRCode" class="mb-3">
            {{ details.HieuLucTuNgay }} - {{ details.HieuLucDenNgay }}
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Trạng thái</div>
            <div :class="floatRightNormal" class="color-success">
                {{ details.TrangThai }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Mã tuyến</div>
            <div :class="floatRightNormal">
                {{ details.MaTuyen }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Bến đi</div>
            <div :class="floatRightNormal">
                {{ details.BenDi }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Bến đến</div>
            <div :class="floatRightNormal">
                {{ details.BenDen }}
            </div>
        </div>

        <div
            :class="rowSpaceBetween"
            v-for="(item, index) in details.LaiXe"
            :key="index"
        >
            <div :class="floatLeftNormal">Lái xe {{ index + 1 }}</div>
            <div :class="floatRightLink">
                {{ item.TenLaiXe }} - {{ item.HangBang }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftTitle">Thông tin giấy tờ xe</div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Hạn phù hiệu tuyến</div>
            <div :class="floatRightLink">
                {{ details.HanPhuHieu }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Hạn đăng kiểm</div>
            <div :class="floatRightLink">
                {{ details.HanDangKiem }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Hạn bảo hiểm</div>
            <div :class="floatRightLink">
                {{ details.HanBaoHiem }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftTitle">Thông tin DNVT</div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Tên DNVT</div>
            <div :class="floatRightNormal">
                {{ details.TenDNVT }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftTitle">Thông tin cấp lệnh</div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Người cấp lệnh</div>
            <div :class="floatRightNormal">
                {{ details.NguoiCapLenh }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Thời gian cấp lệnh</div>
            <div :class="floatRightNormal">
                {{ details.ThoiGianCapLenh }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftTitle">Thông tin chuyến đi</div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Số ghế | Số giường</div>
            <div :class="floatRightNormal">
                {{ details.SoGhe }} | {{ details.SoGiuong }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Hình thức chạy</div>
            <div :class="floatRightNormal">
                {{ details.HinhThucChay }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Hành trình tuyến</div>
            <div :class="floatRightNormal">
                {{ details.HanhTrinhTuyen }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Nhân viên phục vụ xe</div>
            <div :class="floatRightNormal">
                {{ details.NhanVienPhucVu }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftTitle">Thông tin thực tế</div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Giờ xuất bến</div>
            <div :class="floatRightNormal">
                {{ details.GioXuatBenThucTe }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Số khách xuất bến</div>
            <div :class="floatRightNormal">
                {{ details.SoKhachXuatBen }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Giờ đến bến</div>
            <div :class="floatRightNormal">
                {{ details.GioDenBen }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Số khách đến bến</div>
            <div :class="floatRightNormal">
                {{ details.SoKhachDenBen }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftTitle">Thông tin ký lệnh</div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Thủ trưởng đơn vị</div>
            <div :class="floatRightNormal">
                {{ details.ChuKyThuTruongDonVi }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Lái xe 1</div>
            <div :class="floatRightNormal">
                {{ details.ChuKyLaiXe1 }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Lái xe 2</div>
            <div :class="floatRightNormal">
                {{ details.ChuKyLaiXe2 }}
            </div>
        </div>

        <div :class="rowSpaceBetween">
            <div :class="floatLeftNormal">Bến đi</div>
            <div :class="floatRightNormal">
                {{ details.ChuKyBenDi }}
            </div>
        </div>

        <div :class="rowSpaceBetween" style="margin-bottom: 80px">
            <div :class="floatLeftNormal">Bến đến</div>
            <div :class="floatRightNormal">
                {{ details.ChuKyBenDen }}
            </div>
        </div>

        <div :class="rowSpaceBetween" class="row-button">
            <DxButton
                id="1"
                text="KÝ LỆNH"
                type="default"
                styling-mode="contained"
                icon="mdi mdi-text-box-check-outline"
            />

            <DxButton
                id="2"
                text="HỦY LỆNH"
                type="default"
                styling-mode="contained"
                icon="mdi mdi-close-box"
            />

            <DxButton
                id="3"
                text="XEM FILE"
                type="default"
                styling-mode="contained"
                icon="mdi mdi-file-pdf-box"
            />
        </div>
    </div>
</template>

<script>
import { DxButton } from "devextreme-vue";

export default {
    components: { DxButton },
    data() {
        return {
            classUnderQRCode:
                "row justify-center mt-1 font-medium font-16 font-italic",
            floatLeftNormal: "xs5 ml-2  font-16",
            floatLeftTitle: "xs12 mt-2 font-16 font-medium color-000",
            floatRightNormal: "xs7 font-medium font-16 mr-2 text-xs-right",
            floatRightLink:
                "xs7 font-medium font-16 mr-2 text-xs-right text-link",
            rowSpaceBetween: "row justify-space-between mt-1",
            details: {
                MaLenh: "0001/21.00001",
                BienKiemSoat: "20A-12345",
                HieuLucTuNgay: "14/08/2020",
                HieuLucDenNgay: "16/08/2020",
                TrangThai: "Chờ kích hoạt",
                MaTuyen: "2029.1111.A",
                BenDi: "Bến xe TT Thái Nguyên",
                BenDen: "Bx Mỹ Đình",
                LaiXe: [
                    { Id: 1, TenLaiXe: "Nguyễn Hoàng Tuấn Anh", HangBang: "E" },
                    { Id: 2, TenLaiXe: "Trần Hồng Anh", HangBang: "E" },
                ],
                HanPhuHieu: new Date(),
                HanDangKiem: new Date(),
                HanBaoHiem: new Date(),
                TenDNVT: "CÔNG TY CP VTHK THÁI NGUYÊN",
                NguoiCapLenh: "Lục Thị Huyền",
                ThoiGianCapLenh: "15:23 14/08/2020",
                SoGhe: 29,
                SoGiuong: 0,
                HinhThucChay: "Kế hoạch cố định",
                HanhTrinhTuyen:
                    "Bến xe khách Thái Nguyên - QL3 cũ - TP. Sông Công - Phổ Yên - Sóc Sơn - Đông Anh - Bến xe Gia Lâm",
                NhanVienPhucVu: "Nguyễn Văn Chung",
                GioXuatBenThucTe: new Date(),
                SoKhachXuatBen: 20,
                GioDenBen: new Date(),
                SoKhachDenBen: 20,
                ChuKyThuTruongDonVi: "Đã ký",
                ChuKyLaiXe1: "Đã ký",
                ChuKyLaiXe2: "Đã ký",
                ChuKyBenDi: "Đã ký",
                ChuKyBenDen: "Đã ký",
            },
        };
    },
};
</script>

<style scoped>
.row-button {
    position: fixed;
    bottom: 0;
    width: calc(100% - 48px);
    background: #fff;
    padding-top: 8px;
    padding-bottom: 24px;
}
</style>