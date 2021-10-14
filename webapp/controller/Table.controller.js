sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
     "sap/ui/core/Locale",
    "sap/ui/core/LocaleData",
    "sap/ui/model/type/Currency",
    "sap/ui/core/format/NumberFormat"
], function (controller, JSONModel, MessageBox, Locale, LocaleData, Currency, NumberFormat) {
    "use strict";

    return controller.extend("sap.ui.demo.walkthrough.controller.Table", {
        
        onInit: function () {
            // Register the view with the message manager
            // var oView = this.getView();
            // sap.ui.getCore().getMessageManager().registerObject(oView, true);

            var oViewModel = new JSONModel([]);
            this.getView().setModel(oViewModel, "view");

            var oSelectedModel = new JSONModel([]);
            this.getView().setModel(oSelectedModel, "selected");

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

            // if (oTableDataModel.length === 0) {
            //     MessageBox.alert("선택된 리스트가 없습니다.", {
            //         actions: [MessageBox.Action.OK]
            //     })
            // }

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
            var that = this;
            var aIndices = this.getView().byId("uiTable").getSelectedIndices();

            var oModel = that.getView().getModel("view");
            var oSelectedModel = that.getView().getModel("selected");
            
            var aModelData = oModel.getProperty("/");
            var aSelectedModelData = that.getView().getModel("selected").getProperty("/");
            var iSelectedLength = aSelectedModelData.length;

            if (aIndices.length < 1) {
                MessageBox.alert("상품을 선택해주세요.", {
                    actions: [MessageBox.Action.OK]
                })
            } else {
                var check      = true,
                    countCheck = true,
                    priceCheck = true;

                for (var i = 0; i < aSelectedModelData.length; i++) {
                    // 선택된 상품값 하나라도 입력안 할 시, 에러창
                    if (aSelectedModelData[i].productName == "" || aSelectedModelData[i].date === undefined || aSelectedModelData[i].category == "" || aSelectedModelData[i].count == "" || aSelectedModelData[i].price == "") {
                        check = false;
                    }
                    if (isNaN(Number(aSelectedModelData[i].count))) {
                        // check = false;
                        countCheck = false;
                    }
                    if (isNaN(Number(aSelectedModelData[i].price))) {
                        // check = false;
                        priceCheck = false;
                    }
                }
                console.log(check);
                if (check && countCheck && priceCheck) {
                    MessageBox.confirm("상품 내역을 생성하시겠습니까?", {
                        actions: [MessageBox.Action.OK, MessageBox.Action.NO],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {
                            if (sAction === MessageBox.Action.OK) {
                                var aIndices = that.getView().byId("uiTable").getSelectedIndices();

                                var oModel = that.getView().getModel("view");
                                var oSelectedModel = that.getView().getModel("selected");
                                
                                var aModelData = oModel.getProperty("/");
                                var aSelectedModelData = that.getView().getModel("selected").getProperty("/");
                                var iSelectedLength = aSelectedModelData.length;

                                // m table에 배열을 만들고, ui table에서 선택된 값만 집어넣기
                                console.log("=== m Table로 옮기기 ===");
                                for (var i = 0; i < aIndices.length; i++) {       
                                    var electronic = that.getView().getModel("category").getProperty("/")["categories"][0]["type"];
                                    if (aModelData[aIndices[i]].category == "" || aModelData[aIndices[i]].category == undefined) {
                                        aModelData[aIndices[i]].category = electronic;
                                    }                    

                                    aSelectedModelData.push({
                                        productName: aModelData[aIndices[i]].productName,
                                        date: aModelData[aIndices[i]].date,
                                        category: aModelData[aIndices[i]].category,
                                        count: aModelData[aIndices[i]].count,
                                        price: aModelData[aIndices[i]].price
                                    });
                                    // aSelectedModelData[iSelectedLength + i].productName = aModelData[aIndices[i]].productName;
                                    // aSelectedModelData[iSelectedLength + i].date = aModelData[aIndices[i]].date;
                                    // aSelectedModelData[iSelectedLength + i].category = aModelData[aIndices[i]].category;
                                    // aSelectedModelData[iSelectedLength + i].count = aModelData[aIndices[i]].count;
                                    // aSelectedModelData[iSelectedLength + i].price = aModelData[aIndices[i]].price;
                                }
                                
                                // oSelectedModel.setProperty("/", aModelData);
                                oModel.refresh();
                                oSelectedModel.refresh();
                                console.log(oModel);
                                console.log(oSelectedModel);
                            }
                        }
                    })
                } else if (check === false) {
                    MessageBox.alert("상품 값을 제대로 입력해주세요.", {
                        actions: [MessageBox.Action.OK]
                    })
                } else if (countCheck === false) {
                    MessageBox.alert("갯수를 숫자로 입력해주세요.", {
                        actions: [MessageBox.Action.OK]
                    })
                } else if (priceCheck === false) {
                    MessageBox.alert("가격을 숫자로 입력해주세요.", {
                        actions: [MessageBox.Action.OK]
                    })
                }
            }
        },

        formatNumber : function (value) {
            var oFloatFormatter = NumberFormat.getFloatInstance({
				style: "int",
				decimals: 0
			});
			return oFloatFormatter.format(value);
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