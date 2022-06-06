// import CustomStore from "devextreme/data/custom_store";
// import DataSource from "devextreme/data/data_source";
// import { exportDataGrid } from "devextreme/excel_exporter";


export default function EventClass() {

    function table(options_table) {
        return new (function() {
            function hoverRow() {
                let e = options_table.Element,
                    btns = options_table.Buttons;
                //btns : true,false là có nút trong hover hay khong
                if (e) {
                    if (e.eventType == "mouseover") {
                        if (e.rowType === "data") {
                            e.row.cells.forEach(x => {
                                x.cellElement.classList.add("hovered");
                            });
                            if (btns) {
                                e.row.cells[
                                    e.row.cells.length - 1
                                ].cellElement.style.display = "table-cell";
                            }
                        }
                    } else {
                        if (e.rowType === "data") {
                            e.row.cells.forEach(x => {
                                x.cellElement.classList.remove("hovered");
                            });
                            if (btns) {
                                e.row.cells[
                                    e.row.cells.length - 1
                                ].cellElement.style.display = "none";
                            }
                        }
                    }
                }
            }
            return {
                HoverRow: hoverRow
            };
        })();
    }

    return {
        table
    }
}
