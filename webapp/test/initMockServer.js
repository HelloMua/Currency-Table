sap.ui.define([
    "../localService/mockserver"
], function(mockserver) {
    'use strict';
    
    // initialise the mock server
    mockserver.init();

    // initalise the embedded dcomponent on the HTML page
    sap.ui.require(["sap/ui/core/ComponentSupport"]);
});