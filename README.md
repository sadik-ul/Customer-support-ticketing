# Customer-support-ticketing
Google Form + Sheet + Apps Script ticketing system

# Customer Support Ticketing System

A simple **helpdesk/ticketing system** built using **Google Forms**, **Google Sheets**, and **Google Apps Script**.  
It allows customers to submit issues, automatically generates a **Ticket ID**, and sends **email notifications** to both the client and support team.  

---

## 🚀 Features
- Submit support requests via Google Form.
- Automatically generate unique Ticket IDs.
- Store all tickets in Google Sheets with details:
  - Ticket ID
  - Client Name
  - Email
  - Issue Description
  - Status (Open / In Progress / Resolved)
- Email notifications to client + support team.
- Status can be updated directly from Google Sheets.

---

## 🛠️ Tools Used
- **Google Forms** – collect client issues  
- **Google Sheets** – manage tickets  
- **Google Apps Script** – automate Ticket IDs + emails  

---

## 📷 Demo (Screenshots)
- `demo-form.png` → Example of customer support form  
- `demo-sheet.png` → Example of ticket tracking sheet  

---

## ⚡ Setup Instructions
1. Create a **Google Form** with fields:
   - Name
   - Email
   - Issue Description
2. Link the Form to a **Google Sheet**.
3. Rename the sheet tab to `Tickets`.
4. Add these column headers in Row 1:
   - Ticket ID | Name | Email | Issue Description | Status
5. Open `Extensions → Apps Script` in the Sheet.
6. Copy-paste the code from `script.gs`.
7. Deploy the trigger:
   - Click **Triggers** → add trigger on `onFormSubmit` event.
8. Test by submitting the form.

---

## 📜 Apps Script Code

```javascript
function onFormSubmit(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tickets");
  var row = e.range.getRow();

  // Generate unique Ticket ID
  var ticketId = "TICKET-" + new Date().getTime();
  sheet.getRange(row, 1).setValue(ticketId);

  // Collect client info
  var clientName = sheet.getRange(row, 2).getValue();
  var clientEmail = sheet.getRange(row, 3).getValue();
  var issue = sheet.getRange(row, 4).getValue();

  // Send confirmation email to client
  MailApp.sendEmail({
    to: clientEmail,
    subject: "Support Ticket Created: " + ticketId,
    htmlBody: "Hello " + clientName + ",<br><br>" +
              "Your support request has been received.<br>" +
              "<b>Ticket ID:</b> " + ticketId + "<br>" +
              "<b>Issue:</b> " + issue + "<br><br>" +
              "Our support team will get back to you shortly.<br><br>" +
              "Thank you,<br>Support Team"
  });

  // Send notification email to support team
  MailApp.sendEmail({
    to: "support@yourcompany.com", // replace with your support email
    subject: "New Support Ticket: " + ticketId,
    htmlBody: "New issue submitted.<br><br>" +
              "<b>Ticket ID:</b> " + ticketId + "<br>" +
              "<b>Name:</b> " + clientName + "<br>" +
              "<b>Email:</b> " + clientEmail + "<br>" +
              "<b>Issue:</b> " + issue
  });
}

