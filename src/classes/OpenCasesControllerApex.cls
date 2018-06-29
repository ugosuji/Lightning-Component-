public class OpenCasesControllerApex {
	@AuraEnabled
    public static List<Case> getCasesDB() {
       
        return[SELECT Id
               FROM Case
               WHERE IsClosed = false
               ];
    }
}