<template>
    <div class="chon-lich">
        <div class="frame-cell disabled"></div>
        <div class="frame-cell disabled"></div>

        <div
            class="frame-cell"
            v-for="item in listDateUse"
            :key="item.Ngay"
            :class="
                item.Disabled && item.State
                    ? 'active disabled'
                    : item.Disabled
                    ? 'disabled'
                    : item.State
                    ? 'active'
                    : ''
            "
            @click="!item.Disabled ? ChonNgay(item) : ''"
        >
            <div class="text">
                {{ item.Ngay }}
            </div>
        </div>

        <div class="frame-cell disabled"></div>
        <div class="frame-cell disabled"></div>
    </div>
</template>

<script>
export default {
    props: {
        lichAm: { type: Boolean, default: false },
        actionSelect: { type: String, default: null },
        listDisabled: { type: Array, default: () => [] },
        listActive: { type: Array, default: () => [] },
    },
    data() {
        return {
            listDateUse: [],
            listLichAm: [
                {
                    Ngay: 1,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 2,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 3,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 4,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 5,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 6,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 7,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 8,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 9,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 10,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 11,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 12,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 13,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 14,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 15,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 16,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 17,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 18,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 19,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 20,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 21,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 22,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 23,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 24,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 25,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 26,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 27,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 28,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 29,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 30,
                    State: false,
                    Disabled: false,
                },
            ],
            listLichDuong: [
                {
                    Ngay: 1,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 2,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 3,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 4,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 5,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 6,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 7,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 8,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 9,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 10,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 11,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 12,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 13,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 14,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 15,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 16,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 17,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 18,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 19,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 20,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 21,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 22,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 23,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 24,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 25,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 26,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 27,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 28,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 29,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 30,
                    State: false,
                    Disabled: false,
                },
                {
                    Ngay: 31,
                    State: false,
                    Disabled: false,
                },
            ],
        };
    },
    watch: {
        lichAm: {
            immediate: true,
            handler: function () {
                if (!this.lichAm) {
                    this.listDateUse = this.listLichDuong;
                } else {
                    this.listDateUse = this.listLichAm;
                }
            },
            deep: true,
        },
        actionSelect: {
            immediate: true,
            handler: function () {
                if (this.actionSelect == "ChonTatCa") {
                    this.ChonTatCa();
                }
                if (this.actionSelect == "ChonNgayChan") {
                    this.ChonNgayChan();
                }
                if (this.actionSelect == "ChonNgayLe") {
                    this.ChonNgayLe();
                }
                if (this.actionSelect == "BoChon") {
                    this.BoChon();
                }
                this.$emit("update:actionSelect", null);
            },
            deep: true,
        },
        listActive: {
            immediate: true,
            handler: function () {
                this.listDateUse.map((e) => {
                    this.listActive.forEach((x) => {
                        if (e.Ngay == x) {
                            e.State = true;
                        }
                    });
                    return e;
                });
            },
            deep: true,
        },
        listDateUse: {
            immediate: true,
            handler: function () {
                let listDisabled = this.listDateUse.filter((e) => !!e.Disabled);
                let listActive = this.listDateUse.filter((e) => !!e.State);
                this.$emit("update:listDisabled", listDisabled);
                this.$emit("update:listActive", listActive);
            },
            deep: true,
        },
    },
    methods: {
        ChonNgay(item) {
            this.listDateUse = this.listDateUse.map((e) => {
                if (e.Ngay == item.Ngay) {
                    e.State = !item.State;
                    return e;
                } else {
                    return e;
                }
            });
        },
        ChonTatCa() {
            this.listDateUse.forEach((e) => {
                if (!e.Disabled) {
                    e.State = true;
                }
            });
        },
        ChonNgayChan() {
            this.listDateUse.forEach((e) => {
                if (!e.Disabled) {
                    if (e.Ngay % 2 == 0) {
                        e.State = true;
                    } else {
                        e.State = false;
                    }
                }
            });
        },
        ChonNgayLe() {
            this.listDateUse.forEach((e) => {
                if (!e.Disabled) {
                    if (e.Ngay % 2 != 0) {
                        e.State = true;
                    } else {
                        e.State = false;
                    }
                }
            });
        },
        BoChon() {
            this.listDateUse.forEach((e) => {
                if (!e.Disabled) {
                    e.State = false;
                }
            });
        },
    },
};
</script>

<style scoped>
.frame-cell {
    width: calc(100% / 7);
    border: 1px solid #dadce0;
    display: block;
    float: left;
    background: #fff;
    height: 36px;
    cursor: pointer;
    position: relative;
}
.frame-cell:nth-child(7n) {
    border-right: 2px solid #dadce0;
}
.frame-cell:nth-child(7n + 1) {
    border-left: 2px solid #dadce0;
}
.frame-cell:nth-child(-n + 7) {
    border-top: 2px solid #dadce0;
}
.frame-cell:nth-child(n + 29) {
    border-bottom: 2px solid #dadce0;
}
.frame-cell.disabled {
    opacity: 0.2;
    cursor: default;
}
.frame-cell.active {
    background: #03a9f4;
    color: #fff;
}
.frame-cell .text {
    position: relative;
    right: 8px;
    bottom: -12px;
    text-align: right;
}
</style>