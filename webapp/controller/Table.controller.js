sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (controller, JSONModel, MessageBox) {
    "use strict";

    return controller.extend("sap.ui.demo.walkthrough.controller.Table", {
        
        onInit: function () {
            var oViewModel = new JSONModel({
                table : [
                    {
                        productName : null,
                        date        : null,
                        category    : null,
                        count       : null,
                        price       : null
                    }
                ]
            })
            this.getView().setModel(oViewModel, "view");

            var oCategoryModel = new JSONModel({
                categories : [
                    {
                        type : "전자 제품"
                    },
                    {
                        type : "주방"
                    },
                    {
                        type : "가구"
                    },
                    {
                        type : "욕실 용품"
                    }
                ]
            })
            this.getView().setModel(oCategoryModel, "category");
        },

        onPressAddRow: function () {
            var oModel = this.getView().getModel("view"),
			    line = oModel.oData.table[1]; //Just add to the end of the table a line like the second line
			oModel.oData.table.push(line);
			oModel.refresh();
        },

        onPressInit: function () {
            var oModel = this.getView().getModel("view");
            oModel.oData.table.splice(0);
            
            // var oTable = this.getView().byId("uiTable");
            // var resetRows = oTable.destroyNoData();
            // oModel.setData(data);

            oModel.refresh();

        },

        onPressPrint: function () {
            MessageBox.confirm("상품 내역을 생성하시겠습니까?", {
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL,]
            })
        }
	});
});