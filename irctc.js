// To be used in conjunction with [Magic Autofill](http://ctrlq.org/irctc/)

/****************************
 * TESTED ON CHROME ONLY.
 ****************************/

// Absolutely required function because of IRCTC's stupid ID naming scheme.
function jq( myid ) {
    return "#" + myid.replace( /(:|\.|\[|\]|,)/g, "\\$1" );
}

// Step 1: Login
// Step 2: Go to the "Booked Ticket history (New)" page. This will work only if you have made 
//         at least 1 booking in the past via IRCTC
// Step 3: Open the developer console
// Step 4: Paste the following in
window.IRCTCJS = {};
window.IRCTCJS.intervalId = setInterval(function(){
  $(jq("txnHistory:bookedTicketHistoryDataTable:0:txnid")).trigger("click");
  setTimeout(function() {
    RichFaces.$('txnHistory:txnDtlPopup').hide(); 
  }, 5000);
}, 10000); // This will keep trigger clicks on the first booking every 5 seconds, 
          // helping to keep the session alive :)

// Step 5: At 9:59:55 ish, run the following to stop the clicks and take you to your booking (should be customized everytime)
clearInterval(window.IRCTCJS.intervalId);
$(jq("jpform:fromStation")).val("BANGALORE CY JN - SBC");
$(jq("jpform:toStation")).val("CHENNAI CENTRAL - MAS");
$(jq("jpform:journeyDateInputDate")).val("20-07-2015");
$(jq("jpform:jpsubmit")).trigger("click");

// Step 7: Select the tatkal category and your train of choice
// Step 8: Use magic autofill from there on.
// Step 9: YOU BOOKED AN IRCTC TATKAL ticket, WOOHOO!