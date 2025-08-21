function onFormSubmit(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tickets");
  var row = e.range.getRow();

  // Generate Ticket ID
  var ticketId = "TICKET-" + new Date().getTime();
  sheet.getRange(row, 1).setValue(ticketId);

  // Collect client info
  var clientName = sheet.getRange(row, 3).getValue();
  var clientEmail = sheet.getRange(row, 4).getValue();
  var issue = sheet.getRange(row, 5).getValue();

  // Email to client
  MailApp.sendEmail({
    to: clientEmail,
    subject: "Support Ticket Created: " + ticketId,
    htmlBody: "Hello " + clientName + ",<br>Your ticket has been received.<br>" +
              "<b>Ticket ID:</b> " + ticketId + "<br><b>Issue:</b> " + issue
  });

  // Email to support team
  MailApp.sendEmail({
    to: "support@yourcompany.com",
    subject: "New Support Ticket: " + ticketId,
    htmlBody: "New ticket submitted:<br>" +
              "<b>Ticket ID:</b> " + ticketId + "<br>" +
              "<b>Name:</b> " + clientName + "<br>" +
              "<b>Email:</b> " + clientEmail + "<br>" +
              "<b>Issue:</b> " + issue
  });
}


