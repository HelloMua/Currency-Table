sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/XMLView",
    "sap/ui/core/format/NumberFormat"
], function (controller, JSONModel, XMLView, NumberFormat) {
    "use strict";

    return controller.extend("sap.ui.demo.walkthrough.CurrencyList", {

        onInit: function () {
            // var oViewModel = new JSONModel({
            //     "KRW" : [1000, "KRW"],
            //     "USD" : [0.84, "USD"],
            //     "EUR" : [0.72, "EUR"],
            //     "JPY" : [100, "JPY"]
            // });
            // this.getView().setModel(oViewModel, "view");

            // var oViewModel = new JSONModel({
            //     currency : "KRW"
            // });
            // this.getView().setModel(oViewModel, "view");

        //     var oInputModel1 = new JSONModel([
        //         {
        //             input : null,
        //             currencyType : "USD" 
        //         }
        //     ]);
        //     this.getView().setModel(oInputModel1, "inputData1");

        //     var oInputModel2 = new JSONModel([
        //         {
        //             input : null,
        //             currencyType : "ERO" 
        //         }
        //     ]);
        //     this.getView().setModel(oInputModel2, "inputData2");

        //    var oInputModel3 = new JSONModel([
        //         {
        //             input : null,
        //             currencyType : "JPY" 
        //         }
        //     ]);
        //     this.getView().setModel(oInputModel3, "inputData3");

            var oTableModel = new JSONModel([
                {
                    currencyName : "달러",
                    currencyType : "USD",
                    rate         : null,
                    value        : null
                },
                {
                    currencyName : "유로",
                    currencyType : "EUR",
                    rate         : null,
                    value        : null
                },
                {
                    currencyName : "엔화",
                    currencyType : "JPY",
                    rate         : null,
                    value        : null
                }
            ]);
            this.getView().setModel(oTableModel, "tableData");


            var oInputModel = new JSONModel({
                    krwInput  : null,
                    usdInput  : null,
                    eurInput  : null,
                    jpyInput  : null
            });

            // var oInputModel = new JSONModel({
            //         krwInput  : [null, "KRW"],
            //         usdInput  : [null, "USD"],
            //         eurInput  : [null, "EUR"],
            //         jpyInput  : [null, "JPY"]
            // });

            this.getView().setModel(oInputModel, "inputData");
        },

        onPress: function () {
            var amountInputField = this.getView().byId("input1");
            console.log("입력금액 :" + amountInputField.getValue());
            
            if (!amountInputField.getValue()) {
                amountInputField.setValueState("Error");
                amountInputField.setValueStateText("값을 입력해 주세요.");
                // focus 유무 차이점?? Sets the focus to the stored focus DOM reference.
                amountInputField.focus();
            } else {
                amountInputField.setValueState("Success");
                // amountInputField.setValueStateText("입력 성공!");
            }

            var amountInputField2 = this.getView().byId("input2");
            console.log("달러 :" + amountInputField2.getValue());

            if (!amountInputField2.getValue()) {
                amountInputField2.setValueState("Error");
                amountInputField2.setValueStateText("값을 입력해 주세요.");
                amountInputField.focus();
            } else {
                amountInputField2.setValueState("Success");
                amountInputField2.setValueStateText("");
            }

            var amountInputField3 = this.getView().byId("input3");
            console.log("유로 :" + amountInputField3.getValue());

            if (!amountInputField3.getValue()) {
                amountInputField3.setValueState("Error");
                amountInputField3.setValueStateText("값을 입력해 주세요.");
                amountInputField3.focus();
            } else {
                amountInputField3.setValueState("Success");
                amountInputField3.setValueStateText("");
            }

            var amountInputField4 = this.getView().byId("input4");
            console.log("엔화 :" + amountInputField4.getValue());

            if (!amountInputField4.getValue()) {
                amountInputField4.setValueState("Error");
                amountInputField4.setValueStateText("값을 입력해 주세요.");
                amountInputField4.focus();
            } else {
                amountInputField4.setValueState("Success");
                amountInputField4.setValueStateText("");
            }

            // getProperty의 쓰임새??
            var oTableDataModel = this.getView().getModel("tableData").getProperty("/");
            var oInputDataModel = this.getView().getModel("inputData").getProperty("/");

            var aCurrency = [1196.00, 1382.82, 1069.67];

            oInputDataModel.usdInput = amountInputField.getValue() / aCurrency[0];
            oInputDataModel.eurInput = amountInputField.getValue() / aCurrency[1];
            oInputDataModel.jpyInput = amountInputField.getValue() / aCurrency[2];  

            // for (var i=0; i<oInputDataModel.length; i++) {
            //     oInputDataModel[i] = amountInputField.getValue() / aCurrency[i];
            //     console.log(isNaN(amountInputField.getValue()));
            // }
            console.log(oInputDataModel);

            // oTableDataModel[0].value = amountInputField2.getValue();
            // oTableDataModel[1].value = amountInputField3.getValue();
            // oTableDataModel[2].value = amountInputField4.getValue();
            
            oTableDataModel[0].value = oInputDataModel.usdInput;
            oTableDataModel[1].value = oInputDataModel.eurInput;
            oTableDataModel[2].value = oInputDataModel.jpyInput;    

            console.log(isNaN(amountInputField.getValue()));

            for (var i=0; i<oTableDataModel.length; i++) {
                // js는 문자열에 숫자를 곱하면 숫자 / 숫자타입에 문자열을 더하면 문자
                oTableDataModel[i].rate = oTableDataModel[i].value * amountInputField.getValue();
            }
            console.log(oTableDataModel);

            this.getView().getModel("inputData").refresh(true);
            this.getView().getModel("tableData").refresh(true);
        },

        // 입력 필드의 텍스트가 변경되고 포커스가 입력 필드를 벗어나거나 Enter 키를 누르면 시작됩니다.
        onChange: function (oEvent) {
            var inputItem = oEvent.getSource();

            // 정규식 사용
            var regex = /[^0-9]/g;      // 0-9 : 숫자, [^문자] : 문자 제외, g: 모든 문자 검색
            var result = inputItem.getValue().replace(regex, "");       // regex(/정규표현식/)에 매칭되는 항목을 ""(대체문자열)로 바꿈
            inputItem.setValue(result);
        },

        // 각 키 입력, 삭제, 붙여넣기 등의 사용자 상호 작용에 의해 입력 값이 변경될 때 발생합니다.
        onLiveChange: function (oEvent) {
            var inputItem = oEvent.getSource();
            var oInputDataModel = this.getView().getModel("inputData").getProperty("/");
            var amountInputField = this.getView().byId("input1");
            var aCurrency = [1196.00, 1382.82, 1069.67];

            if (amountInputField.getValue()) {
                oInputDataModel.usdInput = amountInputField.getValue() / aCurrency[0];
                oInputDataModel.eurInput = amountInputField.getValue() / aCurrency[1];
                oInputDataModel.jpyInput = amountInputField.getValue() / aCurrency[2];
            }

            var regex = /[^0-9]/g; 
            var result = inputItem.getValue().replace(regex, "");
            inputItem.setValue(result);
        },

        formatNumber : function (value) {
			var oFloatFormatter = NumberFormat.getFloatInstance({
				style: "float",
				decimals: 2 		// short는 정수형이므로 decomals 0은 의미가 없음
			});
            return oFloatFormatter.format(value);

			// var oCurrencyFormatter = NumberFormat.getCurrencyInstance({
			// 	currencyCode: false,
			// 	customCurrencies: {
			// 		myCurrency: {
			// 			isoCode: "KRW",
			// 			decimals: 0
			// 		}
			// 	}
			// });
			// return oCurrencyFormatter.format(value, "myCurrency");
		}
    });
});