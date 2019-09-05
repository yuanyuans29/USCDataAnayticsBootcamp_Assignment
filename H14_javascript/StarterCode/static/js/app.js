// from data.js
var tableData = data;
//input date
var inputField = d3.select("#datetime");
var filterbtn = d3.select("#filter-btn");
// trigger data change when new datetime is entered.
inputField.on("change", function() {
    var inputdate = d3.event.target.value;
    console.log(inputdate);
    filterbtn.on("click", function() {
        d3.select("tbody").html("")
        // inputField.on("change", function() {
        //     var inputdate = d3.event.target.value;
        //     console.log(inputdate)
        ufodata(inputdate)
});
});
//     //Select filtertable button

//     rows.filter(":contains('OK')").show()
// filterbtn.click(function() {
//     return ufodata(inputdate)
// });
// YOUR CODE HERE!
// select "tbody"
function ufodata(inputdate){
var tbody = d3.select("tbody");
    //function ufodata(date) {
    //selectdatedata = [arr for arr in arr1];
var arr1 = tableData.filter(d => d.datetime == inputdate);

arr1.forEach(function(ufodata) {
        //console.log(ufodata);
        var row = tbody.append("tr");
        Object.entries(ufodata).forEach(function([key, value]) {
        console.log(key, value);
        // Append a cell to the row for each value
        // in the weather report object
        var cell = tbody.append("td");
        cell.text(value);
        });
    });
};