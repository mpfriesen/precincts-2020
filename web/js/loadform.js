// function onSelectReportType(ele){
//     var form = $(ele).parent().parent();
//     var label = $(form).find(".additional_msg");
//     var select = $(form).find(".additional_msg_select");
//
//     switch (ele.value) {
//         case "2016":
//             label.text("Joe Biden");
//             select.find('input').remove();
//             select.append($("<input></input>")
//                 .attr("placeholder")
//                 .attr("value","")
//                 .text("Choose the resource type"));
//             selectValues = ['water', 'food', 'money', 'medicine', 'cloth',
//                 'rescue/volunteer'];
//             $.each(selectValues, function(index,value) {
//                 select.append($("<option></option>")
//                     .attr("value",value)
//                     .text(value));
//             });
//             break;
//         case "2020":
//             label.text("Damage Type:");
//             select.find('option').remove();
//             select.append($("<option></option>")
//                 .attr("value","")
//                 .text("Choose the damage type"));
//             selectValues = ['pollution', 'building damage', 'road damage', 'casualty',
//                 'other'];
//             $.each(selectValues, function(index,value) {
//                 select.append($("<option></option>")
//                     .attr("value",value)
//                     .text(value));
//             });
//             break;
//         default:
//             $(form).find(".additional_msg_div").css("visibility", "hidden");
//             return;
//     }
//     $(form).find(".additional_msg_div").css("visibility", "visible");
// }
//


function createReport(event) {
    event.preventDefault(); // stop form from submitting normally

    var a = $("#create_report_form").serializeArray();
    a.push({ name: "tab_id", value: "0" });
    a = a.filter(function(item){return item.value != '';});
    // Post new data to server
    $.ajax({
        url: 'HttpServlet',
        type: 'POST',
        data: a,
        success: function() {
            alert("The report is successfully submitted!");
            // Reset form
            document.getElementById("create_report_form").reset();
            $.ajax({
                url: 'HttpServlet',
                type: 'POST',
                data: { "tab_id": "1"},
                success: function() {
                    // mapInitialization(reports);
                },
                error: function(xhr, status, error) {
                    alert("An AJAX error occurred: " + status + "\nError: " + error);
                }
            });
        },
        error: function(xhr, status, error) {
            alert("Status: " + status + "\nError: " + error);
        }
    });
}



$("#create_report_form").on("submit",createReport);