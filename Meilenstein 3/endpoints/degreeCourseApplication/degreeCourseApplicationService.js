/**
 * 1. POST Anlegen einer Studienbewerbung durch einen User
 * 
 * Ein Nutzer kann eine Studienbewerbung für sich anlegen. 
 * Dabei wird die User-ID über den Token bestimmt
 * 
 * GET https://localhost/api/degreeCourseApplications/myApplications
 * Authorization: {{manfredToken}}
 * 
 * Eigentlich eher das als Beispiel nehemen, das von oben ist aus Meilenstein 3 vorgaben, also ein Test.
 * 
 * POST https://localhost/api/degreeCourseApplications
 * Authorization: {{manfredToken}}
 * Content-Type: application/json
 * 
 * {
 *     "degreeCourseID": "{{degreeCourseID}}",
 *     "targetPeriodYear": 2024,
 *     "targetPeriodShortName": "WiSe"
 * }
 */

/**
 * 2. GET Suche nach den Studienbewerbungen des aktuellen Nutzers
 * In der Web-Anwendung soll der Studierende seine eigenen Studienbewerbungen ansehen können.
 * Hierzu soll der folgende Request umgesetzt werden:
 * 
 * GET https://localhost/api/degreeCourseApplications?applicantUserID=manfred
 * Authorization: {{adminToken}}
 * 
 * Diese Suche sollen nur User durchführen können, die Administrator sind.
 */

/**
 * 3. GET Suche nach Studienbewerbungen für einen Studiengang
 * Der Administrator soll die Möglichkeit haben, 
 * die Bewerbungen für einen bestimmten Studiengang abzurufen.
 * 
 * GET https://localhost/api/degreeCourseApplications?courseDegreeID={{degreeCourseID}}
 * Authorization: {{adminToken}}
 * 
 * Auch diese Suche sollen nur Administratoren ausführen können.
 */

/**
 * 4. PUT Updaten einer bereits existierenden Bewerbung
 * 
 * PUT https://localhost/api/degreeCourseApplications/{{applicationID}}
 * Authorization: {{adminToken}}
 * Content-Type: application/json
 * 
 * {
 *    "targetPeriodYear": 2025
 * }
 */

/**
 * 5. DELETE Löschen der Bewerbung
 * 
 * DELETE  https://localhost/api/degreeCourseApplications/{{applicationID}}
 * Authorization: {{adminToken}}
 */



