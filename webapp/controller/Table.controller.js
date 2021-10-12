sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/core/routing/History",
    "sap/ui/table/RowSettings",
	"sap/ui/thirdparty/jquery"
], function (controller, JSONModel, formatter, History, RowSettings, jQuery) {
    "use strict";

    return controller.extend("sap.ui.demo.walkthrough.controller.Table", {
        formatter: formatter,
        
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

        onAddButton: function (oEvent) {
            var button = oEvent.getSource();
            var context = button.getBindingContext("modelname");
            var datetype = context.getProperty("Datetype");
        },

        onInitButton: function () {

        },

        onPrintButton: function () {

        }
	});
});