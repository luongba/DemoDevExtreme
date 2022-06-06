import {TimeOut} from "../configs/base";
import Core from "@sonphat/core";

const SP = window.SP;

const $Core = new Core({
    // Cấu hình xác thực truy cập, bắt buộc có nếu muốn tải tải trình xác thực
    Auth: {
        Keycloak: SP["keycloak"] || {
            URL: "https://dangnhap.quanlybenxe.com/auth",
            Realm: "Sbus.vn",
            ClientId: "LenhDienTu"
        }
    },

    // cấu hình cho api
    Api: {
        BaseURL: SP["API_Default_BaseUrl"] || "https://localhost:5001/",

        Timeout: TimeOut, // (ms), 5s === 5000 ms

        NoExceptionHttpStatus: false
    },
    Helper: {
        // cấu hình helper
        Format: {
            // cấu hình default format, $Core.Helper.Format.Datetime(new Date(), format)
            DatetimeDefaultFormat: `{yyyy}/{mm}/{dd} {hh}:{ii}:{ss}.{ms}`
        }
    }
});

function configApi(keyApi, keyConfigApi) {
    Object.defineProperty($Core.Api, keyApi, {
        get() {
            var self = this,
                args = arguments;
            args;
            return function () {
                return self.Make.apply(self, arguments).Config(
                    c => (
                        (c.baseURL =
                            window.SP[keyConfigApi] ||
                            "https://localhost:5003/"),
                        c
                    )
                );
            };
        }
    });
}

configApi("Test", "API_Test");
configApi("QuanLyThongTin", "API_QuanLyThongTin");
export default $Core;
