import Devextreme from "@sonphat/devextreme";
export default function Helper($Core) {
    Devextreme.$Core = $Core;

    this.getTextLoaiLich = (data, i18n, helper) => {
        if (data.loaiLichChay == i18n.t("DBVarName.Tuan")) {
            let dsNgayText = data.cacNgayChayTheoLich.map((e) => {
                if (e == 1) {
                    return "Chủ nhật";
                } else {
                    return "Thứ " + e;
                }
            });
            return "Lịch tuần" + " - " + dsNgayText.join(", ");
        } else if (data.loaiLichChay == i18n.t("DBVarName.ThangDuong")) {
            return "Lịch dương " + " - " + data.cacNgayChayTheoLich.join(", ");
        } else if (data.loaiLichChay == i18n.t("DBVarName.ThangAm")) {
            return "Lịch âm " + " - " + data.cacNgayChayTheoLich.join(", ");
        } else if (data.loaiLichChay == i18n.t("DBVarName.ChuKy")) {
            return (
                "Từ ngày " +
                helper.formatDate(data.ngayBatDauChuKy) +
                ", cách " +
                data.chuKyNgay +
                " ngày chạy 1 chuyến!"
            );
        }
    };

    this.Common = Devextreme;

    // Danh sách hàm trong thư viện
    // FilterRowWhenEnter
    // DevExDataSource
    // DevExDataSourceCustom
    // formatDateTime
    // formatDate
    // formatTime
    // getToday
    // getEndDateString
    // getEndDay
    // getStartDay
    // getTimeString
    // getEndMonth
    // getStartMonth
    // formatDateToTimeZone7
    // formatViewDateToTimeZone7
    // CheckRole
    // table
    // excel
    // randomGUID
    // formatPhone
    // moneyFormat
}
