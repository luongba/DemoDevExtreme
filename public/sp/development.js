/* Development config - not load in production */

url = "http://10.10.0.5";
// url = "http://192.168.224.4";
url = "http://lenh.nguyencongtuyen.local:19666/api/";

urlTest = "https://jsonplaceholder.typicode.com/"

SP["API_QuanLyThongTin"] = `${url}`
SP["API_Test"] = `${urlTest}`
/* SonPhat Product Publish Config */
// SP[`API_LenhVanChuyen_BaseUrl`] = "https://api.lenhdientu.vn/quanlylenhvanchuyen/";

// SP[`API_QuanLyThongTin`] = `http://192.168.224.4:49175/api/QuanLyThongTin/`;
// SP[`API_LenhVanChuyen_BaseUrl`] = `${url}/api/LenhVanChuyen/`;
// SP[`API_QuanLyThongTin`] = `${url}/api/QuanLyThongTin/`;
SP[`keycloak`] = {
    URL: "https://dangnhap.sbus.vn/auth",
    Realm: "Sbus.vn",
    ClientId: "LenhDienTu",
};
// SP[`API_TaiKhoan`] = `http://10.10.0.5:49154/api/TaiKhoan/`;
// SP[`API_Default_BaseUrl`] = `${url}/api/`;
/* SonPhat Product Publish Config */
