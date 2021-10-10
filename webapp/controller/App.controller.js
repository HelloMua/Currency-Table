sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function (controller) {
    "use strict";

    return controller.extend("sap.ui.demo.walkthrough.App", {
        onInit: function () {
            // app view 내의 모든 컨트롤이 자동으로 스타일에 따라 크기가 조정
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        },

        onOpenDialog: function () {
            this.getOwnerComponent().openHelloDialog();
        }
    });
});