import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/home";
// import defaultLayout from "./layouts/side-nav-inner-toolbar";
import menuApplication from "./layouts/menu-application";

import chartView from "@/views/chart/index.vue";
import chartPieView from "@/views/chart/chart-pie/index.vue";

import formView from "@/views/Form/index.vue";
//quan ly ben xe
import quanlybenxe from "@/views/Quan-Ly-Ben-Xe/index.vue";
import themlaixe from "@/views/Quan-Ly-Ben-Xe/Tao-ben-moi/index.vue";

//quan ly xe khach cua cty
import quanlyxekhach from "@/views/Quan-Ly-Xe-Khach/index.vue"
import thongtinphuongtien from "@/views/Quan-Ly-Xe-Khach/Them-Sua-Thong-Tin-Phuong-Tien/index.vue";

//quan ly luong tuyen
import quanlyluongtuyen from "@/views/Quan-Ly-Luong-Tuyen/index.vue"
import thongtinluongtuyen from "@/views/Quan-Ly-Luong-Tuyen/Them-Sua-Thong-Tin-Luong-Tuyen/index.vue"
// import simpleLayout from "./layouts/single-card";

// function loadView(view) {
//     return () => import(`./views/${view}.vue`);
// }
function loadViewIndex(view) {
    return () => import(`./views/${view}/index.vue`);
}

export default function ($Core) {
    const router = new createRouter({
        routes: [
            {
                path: "/",
                name: "home",
                meta: {
                    requiresAuth: true,
                    layout: menuApplication,
                },
                component: Home,
            },
            {
                path: "/chart",
                name: "chart",
                meta: {
                    requiresAuth: true,
                    layout: menuApplication,
                },
                component: chartView,
            },
            {
                path: "/chart/pie",
                name: "chart-pie",
                component: chartPieView,
                meta: {
                    requiresAuth: true,
                    layout: menuApplication,
                },
            },
            {
                path: "/form",
                name: "form",
                component: formView,
                meta: {
                    requiresAuth: true,
                    layout: menuApplication,
                },
            },
            {
                path: "/Quan-Ly-Ben-Xe",
                name: "quanlybenxe",
                component: quanlybenxe,
                meta: {
                    requiresAuth: true,
                    layout: menuApplication,
                },
            },
            {
                path: "/Quan-Ly-Ben-Xe/Thong-Tin-Ben-Xe",
                name: "thongtinbenxe",
                component: themlaixe,
                meta: {
                    requiresAuth: true,
                    layout: menuApplication,
                },
            },
            {
                path: "/Quan-Ly-Phuong-Tien",
                name: "quanlyxekhach",
                component: quanlyxekhach,
                meta: {
                    requiresAuth: true,
                    layout: menuApplication,
                },
            },
            {
                path: "/Quan-Ly-Phuong-Tien/Thong-Tin-Phuong-Tien",
                name: "thongtinphuongtien",
                component: thongtinphuongtien,
                meta: {
                    requiresAuth: true,
                    layout: menuApplication,
                },
            },
            {
                path: "/Quan-Ly-Luong-Tuyen",
                name: "quanlyluongtuyen",
                component: quanlyluongtuyen,
                meta: {
                    requiresAuth: true,
                    layout: menuApplication,
                },
            },
            {
                path: "/Quan-Ly-Luong-Tuyen/Thong-Tin-Luong-Tuyen",
                name: "thongtinluongtuyen",
                component: thongtinluongtuyen,
                meta: {
                    requiresAuth: true,
                    layout: menuApplication,
                },
            },
            
            {
                path: "/",
                redirect: "/home",
            },
            {
                path: "/recovery",
                redirect: "/home",
            },
            {
                path: "/:pathMatch(.*)*",
                redirect: "/home",
            },
        ],
        history: createWebHistory(),
    });

    router.beforeEach((to, from, next) => {
        if (to.name === "login-form" && $Core.Auth.IsAuth) {
            next({ name: "home" });
        }

        if (!$Core.Auth.IsAuth) {
            $Core.Auth.Login();
            // next({
            //     name: "login-form",
            //     query: { redirect: to.fullPath }
            // });
        } else {
            next();
        }
    });
    return router;
}
