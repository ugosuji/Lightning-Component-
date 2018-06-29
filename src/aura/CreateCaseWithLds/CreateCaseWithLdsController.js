({
	doInit : function(component, event, helper) {
		component.find("caseRecordCreator").getNewRecord(
            "Case",
            null,
            null,
            false,
            $A.getCallback(function() {
                var rec = component.get("v.newCase");
                var error = component.get("v.caseError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                }
            })
        );
		
	},
	saveCase: function(component, event, helper) {
        component.set("v.hasErrors", false);
        component.set("v.newCase.Status", 'New');
        component.set("v.newCase.ContactId", component.get("v.recordId"));
        component.set("v.newCase.AccountId", component.get("v.contact.AccountId"));
        component.find("caseRecordCreator").saveRecord(
            function(saveResult) {
                if(saveResult.state === "SUCCESS") {
                    component.set("v.message", "Case was saved sucessfully!");
                } else if (saveResult.state === "ERROR") {
                    component.set("v.hasErrors", true);
                    console.log('Problem saving case, response state: ' + saveResult.error);
                } else {
                    component.set("v.hasErrors", true);
                    console.log('Unknown problem, response state: ' + JSON.stringify(saveResult.state));
                }
            }
        );
    }
	
})