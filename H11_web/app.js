d3.csv("Resources/cities.csv").function(data){
    data.forEach()
}

function makeTable ( csv ) {

    var rows = csv.split('\n'),
    table = document.createElement('table'),
    tr = null, td = null,
    tds = null;

    for ( var i = 0; i < rows.length; i++ ) {
        tr = document.createElement('tr');
        tds = rows[i].split(',');
        for ( var j = 0; j < tds.length; j++ ) {
           td = document.createElement('td');
           td.innerHTML = tds[j];
           tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    document.appendChild(table);

}