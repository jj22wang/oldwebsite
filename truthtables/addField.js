function addFields(){
    // Number of inputs to create
    number = document.getElementById("val").value;
    // Container <div> where dynamic content will be placed
    var container = document.getElementById("container");
    // Clear previous contents of the container
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    var exp = document.getElementById("expression");
    // Clear previous contents of the container
    while (exp.hasChildNodes()) {
        exp.removeChild(exp.lastChild);
    }
    //Create the HTML table to hold the truth table.
    var table = "<table><tr>";
    //Add the header
    headerString=new Array("a","b","c","d","e","f");
    for(l=0;l<number;l++)
    {
        table+="<th>"+ headerString[l]+"</th>";
    }
    table+="<th>f(x)</th></tr>";

    for (var i=0;i<Math.pow(2,number);i++){
        //Break down i into binary representation
        var a=new Array();
        var k=i;
        for(c=0;c<number;c++)
        {
            a[c]=k%2;
            k=(k-k%2)/2;
        }
        //a is in reverse order
        table+="<tr>";
        for (j=number-1;j>=0;j--)
        {
            if(a[j]==0)
            {
                table+="<td>0</td>";
            }
            else
            {
                table+="<td>1</td>";
            }
        }
        table+="<td><select id=\"row"+i+"\" name=\"val\" value=\"\" style=\"width:\"100%\" class=\"tableTruth\"><option value=\"0\">0</option><option value=\"1\">1</option></select>";
        table+="</tr>";
    }
    table+="</table>";

    var inputFormula;
    inputFormula = document.getElementById("table");
    inputFormula.innerHTML=table;
    document.getElementById('calculate').style.display = 'inline';
}