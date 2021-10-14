sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
     "sap/ui/core/Locale",
    "sap/ui/core/LocaleData",
    "sap/ui/model/type/Currency"
], function (controller, JSONModel, MessageBox, Locale, LocaleData, Currency) {
    "use strict";

    return controller.extend("sap.ui.demo.walkthrough.controller.Table", {
        
        onInit: function () {
            var oViewModel = new JSONModel([{}]);
            this.getView().setModel(oViewModel, "view");

            var oSelectedModel = new JSONModel([{}]);
            this.getView().setModel(oSelectedModel, "selected");

            var aSelectedModelData = this.getView().getModel("selected").getProperty("/");
            aSelectedModelData.pop();

            var oCurrencyModel = new JSONModel({
                currencyCode: "원"
            })
            this.getView().setModel(oCurrencyModel, "currency");

            var oCategoryModel = new JSONModel({
                categories : [
                    {
                        type : "전자 제품"
                        // key : 1
                    },
                    {
                        type : "주방"
                        // key : 2
                    },
                    {
                        type : "가구"
                        // key : 3
                    },
                    {
                        type : "욕실 용품"
                        // key : 4
                    }
                ]
            })
            this.getView().setModel(oCategoryModel, "category");
        },

        onPressAddRow: function () {
            
            this.getView().getModel("view").getProperty("/").push({});
            
            this.getView().getModel("view").refresh(true);
    
        },

        onPressInit: function () {
            // this.byId("uiTable").clearSelection();      // 테이블의 체크박스를 모두 해제함

            var oModel = this.getView().getModel("view");
            var oTableDataModel = this.getView().getModel("view").getProperty("/");

            oModel.oData.splice(0);

            if (oTableDataModel.length === 0) {
                MessageBox.alert("선택된 리스트가 없습니다.", {
                    actions: [MessageBox.Action.OK]
                })
            }

            // for (var i=0; i<oTableDataModel.length; i++) {
                // oTableDataModel.table.pop();
                // oModel.oData.table.pop()
            // }
            
            // var oTable = this.getView().byId("uiTable");
            // var resetRows = oContext.clearSelection();
            // oModel.setData(resetRows);

            oModel.refresh();
        },

        onPressPrint: function () {

            MessageBox.confirm("상품 내역을 생성하시겠습니까?", this.rCallAlertBack.bind(this), "Confirmation");

        },

        rCallAlertBack: function () {
            var that = this;
            var aIndices = this.getView().byId("uiTable").getSelectedIndices();

            if (aIndices.length < 1) {
                MessageBox.alert("상품을 선택해주세요.", {
                    actions: [MessageBox.Action.OK]
                })
            } else {
                var oModel = that.getView().getModel("view");
                var oSelectedModel = that.getView().getModel("selected");
                
                var aModelData = oModel.getProperty("/");
                var aSelectedModelData = that.getView().getModel("selected").getProperty("/");
                var iSelectedLength = aSelectedModelData.length;

                // m table에 ui table에서 선택된 값만 집어넣기
                for (var i = 0; i < aIndices.length; i++) {
                    aSelectedModelData.push({});
                    aSelectedModelData[iSelectedLength + i].productName = aModelData[aIndices[i]].productName;
                    aSelectedModelData[iSelectedLength + i].date = aModelData[aIndices[i]].date;
                    aSelectedModelData[iSelectedLength + i].category = aModelData[aIndices[i]].category;
                    aSelectedModelData[iSelectedLength + i].count = aModelData[aIndices[i]].count;
                    aSelectedModelData[iSelectedLength + i].price = aModelData[aIndices[i]].price;
                }
                
                // oSelectedModel.setProperty("/", aModelData);
                oModel.refresh();
                oSelectedModel.refresh();
                console.log(oModel);
                console.log(oSelectedModel);
            }

            // var oSelectedItem = oEvent.getSource();
            // var oContext = oSelectedItem.getBindingContext("view");

            // var oModel = this.getView().getModel("view");
            // // var oModel= this.getView().getModel("view").getData();
            // var oTableDataModel = this.getView().getModel("view").getProperty("/").table;
   
            // for (var i = 0; i < oTableDataModel.length; i++) {
            //     if (oTableDataModel[i].productName === null || oTableDataModel[i].date === null || oTableDataModel[i].count === null || oTableDataModel[i].price === null) {
            //         MessageBox.alert("상품 값을 제대로 입력해주세요.", {
            //             actions: [MessageBox.Action.OK]
            //         })
            //     }
            // }

            // for (var i = 0; i < oTableDataModel.length; i++) {
            //     var intCount = parseInt(oTableDataModel[i].count);
            //     var intPrice = parseInt(oTableDataModel[i].price);
            //     console.log(typeof(inputItem1));
            //     console.log(typeof(intPrice));

            //     if (typeof(intCount) !== "number") {
            //         MessageBox.alert("갯수를 숫자로 입력해주세요.", {
            //             actions: [MessageBox.Action.OK]
            //         })
            //     }

            //     if (typeof(intPrice) !== "number") {
            //         MessageBox.alert("가격을 숫자로 입력해주세요.", {
            //             actions: [MessageBox.Action.OK]
            //         })
            //     }
            // }
            
            // var length = oTableDataModel.length;

            // for (var i = 0; i < length; i++) {
            //     var path = "/table/" + i + "/productName";
            //     oTableDataModel.setProperty(path, "");
            // }

            // for (var i = 0; i < oTableDataModel.length; i++) {

            //     this.byId("input1").setValue(oTableDataModel[i].productName);
            //     this.byId("input2").setValue(oTableDataModel[i].date);
            //     this.byId("input3").setValue(oTableDataModel[i].category);
            //     this.byId("input4").setValue(oTableDataModel[i].count);
            //     this.byId("input5").setValue(oTableDataModel[i].price);
            // }
            
            
        },

        formatTotalValue: function (iCount, iPrice, sCurrCode) {
            var sBrowserLocale = sap.ui.getCore().getConfiguration().getLanguage();
            var oLocale = new Locale(sBrowserLocale);
            var oLocaleData = new LocaleData(oLocale);
            var oCurrency = new Currency(oLocaleData.mData.currencyFormat);
            
            return oCurrency.formatValue([iCount * iPrice, sCurrCode], "string");
        }
	});
});