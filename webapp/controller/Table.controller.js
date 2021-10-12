sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (controller, JSONModel, MessageBox) {
    "use strict";

    return controller.extend("sap.ui.demo.walkthrough.controller.Table", {
        
        onInit: function () {
            var oViewModel = new JSONModel([{}]);
            this.getView().setModel(oViewModel, "view");

            var oCategoryModel = new JSONModel({
                categories : [
                    {
                        type : "전자 제품",
                        key : 1
                    },
                    {
                        type : "주방",
                        key : 2
                    },
                    {
                        type : "가구",
                        key : 3
                    },
                    {
                        type : "욕실 용품",
                        key : 4
                    }
                ]
            })
            this.getView().setModel(oCategoryModel, "category");

            var oModel = this.getView().getModel("view");
            console.log(oModel);
        },

        onPressAddRow: function () {
            
            this.getView().getModel("view").getProperty("/").push({});
            
            this.getView().getModel("view").refresh(true);
    
        },

        onPressInit: function () {
            var oModel = this.getView().getModel("view");
            var oTableDataModel = this.getView().getModel("view").getProperty("/");
            // oModel.oData.table.splice(0);

            // if (oTableDataModel.table.length === 0) {
            //     MessageBox.alert("선택된 리스트가 없습니다.", {
            //         actions: [MessageBox.Action.OK]
            //     })
            // }

            // for (var i=0; i<oTableDataModel.length; i++) {
                // oTableDataModel.table.pop();
                // oModel.oData.table.pop()
            // }
            
            var oTable = this.getView().byId("uiTable");
            var resetRows = oTable.clearSelection();
            oModel.setData(resetRows);

            oModel.refresh();
            console.log(oModel);
        },

        onPressPrint: function () {
            // MessageBox.confirm("상품 내역을 생성하시겠습니까?", {
            //     actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL,],
            //     onClose: function (sAction) {
            //         if (sAction === "OK") {
            //             // var oModel = this.getView().getModel("view");
            //             // var oTableDataModel = this.getView().getModel("view").getData();
            //             // var length = oModel.getData().table.length;

            //             // for (var i = 0; i < length; i++) {
            //             //     var path = "/table/" + i + "/productName";
            //             //     oTableDataModel.setProperty(path, "");
            //             // }

            //             this.byId("input1").setValue(oTableDataModel.productName);
            //             this.byId("input2").setValue(oTableDataModel.date);
            //             this.byId("input3").setValue(oTableDataModel.category);
            //             this.byId("input4").setValue(oTableDataModel.count);
            //             this.byId("input5").setValue(oTableDataModel.price);

            //             oModel.refresh();
            //             // console.log(oModel);
            //         }
            //     }
            // })

            MessageBox.confirm("상품 내역을 생성하시겠습니까?",this.rCallAlertBack.bind(this), "Confirmation");
            
        },

        rCallAlertBack: function () {
            console.log("print");
            var oModel = this.getView().getModel("view");
            // var oModel= this.getView().getModel("view").getData();
            var oTableDataModel = this.getView().getModel("view").getProperty("/").table;
   
            for (var i = 0; i < oTableDataModel.length; i++) {
                if (oTableDataModel[i].productName === null || oTableDataModel[i].date === null || oTableDataModel[i].count === null || oTableDataModel[i].price === null) {
                    MessageBox.alert("상품 값을 제대로 입력해주세요.", {
                        actions: [MessageBox.Action.OK]
                    })
                }
            }

            for (var i = 0; i < oTableDataModel.length; i++) {
                var intCount = parseInt(oTableDataModel[i].count);
                var intPrice = parseInt(oTableDataModel[i].price);
                console.log(typeof(inputItem1));
                console.log(typeof(intPrice));

                if (typeof(intCount) !== "number") {
                    MessageBox.alert("갯수를 숫자로 입력해주세요.", {
                        actions: [MessageBox.Action.OK]
                    })
                }

                if (typeof(intPrice) !== "number") {
                    MessageBox.alert("가격을 숫자로 입력해주세요.", {
                        actions: [MessageBox.Action.OK]
                    })
                }

                // if (typeof(oTableDataModel[i].count) !== "number") {
                //     MessageBox.alert("갯수를 숫자로 입력해주세요.", {
                //         actions: [MessageBox.Action.OK]
                //     })
                // }

                // if (typeof(oTableDataModel[i].price) !== "number") {
                //     MessageBox.alert("가격을 숫자로 입력해주세요.", {
                //         actions: [MessageBox.Action.OK]
                //     })
                // }
            }
            
            // var length = oTableDataModel.length;

            // for (var i = 0; i < length; i++) {
            //     var path = "/table/" + i + "/productName";
            //     oTableDataModel.setProperty(path, "");
            // }

            for (var i = 0; i < oTableDataModel.length; i++) {

                this.byId("input1").setValue(oTableDataModel[i].productName);
                this.byId("input2").setValue(oTableDataModel[i].date);
                this.byId("input3").setValue(oTableDataModel[i].category);
                this.byId("input4").setValue(oTableDataModel[i].count);
                this.byId("input5").setValue(oTableDataModel[i].price);
            }
            
            oModel.refresh();
            console.log(oModel);
        }
	});
});