sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/m/MessageToast"
], function (controller, JSONModel, formatter, MessageToast) {
    "use strict";

    return controller.extend("sap.ui.demo.walkthrough.InvoiceListUi", {
        formatter: formatter,
        
        onInit: function () {
            var oViewModel = new JSONModel({
                currency: "EUR"
            });
            this.getView().setModel(oViewModel, "view")
        },

        onColumnFreezeButton: function () {
            var oView = this.getView(),
                oTable = oView.byId("uiTable"),
                sColumnCount = oView.byId("inputColumn").getValue() || 0,
                iColumnCount = parseInt(sColumnCount),
                iTotalColumnCount = oTable.getColumns().length;

            var sRowCount = oView.byId("inputRow").getValue() || 0,
				iRowCount = parseInt(sRowCount),
                iTotalRowCount = oTable.getRows().length;
                
            var sBottomRowCount = oView.byId("inputButtomRow").getValue() || 0,
                iBottomRowCount = parseInt(sBottomRowCount);

            // Fixed column count exceeds the total column count
			if (iColumnCount > iTotalColumnCount) {
				iColumnCount = iTotalColumnCount;
				oView.byId("inputColumn").setValue(iTotalColumnCount);
				MessageToast.show("고정 열 개수가 총 열 개수를 초과합니다. 열 수 입력 값이 업데이트되었습니다.");
            }

            // Sum of fixed row count and bottom row count exceeds the total row count
			if (iRowCount + iBottomRowCount > iTotalRowCount) {

				if ((iRowCount < iTotalRowCount) && (iBottomRowCount < iTotalRowCount)) {
					// both row count and bottom count smaller than total row count
					iBottomRowCount = 1;
				} else if ((iRowCount > iTotalRowCount) && (iBottomRowCount < iTotalRowCount)) {
					// row count exceeds total row count
					iRowCount = iTotalRowCount - iBottomRowCount - 1;
				} else if ((iRowCount < iTotalRowCount) && (iBottomRowCount > iTotalRowCount)) {
					// bottom row count exceeds total row count
					iBottomRowCount = iTotalRowCount - iRowCount - 1;
				} else {
					// both row count and bottom count exceed total row count
					iRowCount = 1;
					iBottomRowCount = 1;
				}

				// update inputs
				oView.byId("inputRow").setValue(iRowCount);
				oView.byId("inputButtomRow").setValue(iBottomRowCount);
				MessageToast.show("고정 행 수와 Bottom 행 수의 합이 총 행 수를 초과합니다. 입력 값이 업데이트되었습니다.");
			}
            
            oTable.setFixedColumnCount(iColumnCount);
            oTable.setFixedRowCount(iRowCount);
			oTable.setFixedBottomRowCount(iBottomRowCount);
        }
    });
});