function calculateSOP()
{
    //Array for Can-SOP
    var SOP = new Array();
    //read in each minterm and converts to binary eq
    for(var i=0;i<Math.pow(2,number);i++)
    {
        if(document.getElementById("row"+i).value == 1)
        {
            var s = 0;
            var k = i;
            for(var j=number; j>=0;j--)
            {
                if(Math.pow(2,j)<=k)
                {
                    s+=Math.pow(10,j);
                    k-=Math.pow(2,j);
                }
            }

            SOP[SOP.length] = s;
        }
    }
    //creates a string for SOP and writes boolean values as variables
    var printOut = "<br/>"

    //if no minterms, expression is true
    if(SOP.length == 0)
    {
        printOut="<br/>0";
        document.getElementById("expression").innerHTML=printOut;
        return 0;
    }
    else if(SOP.length == Math.pow(2,number))
    {
        printOut="<br/>1";
        document.getElementById("expression").innerHTML=printOut;
        return 0;
    }
    //combines terms to form array of all possible implicants.
    var reducedSOP = combineTerms(SOP);

    //converts the implicants to digital values + reduces removes all non-prime implicants
    var digitalArray = removeDuplicatesDigital(convertArray(reducedSOP));

    //
    digitalArray=primeImplicant(digitalArray);
    for(var i = 0; i<digitalArray.length; i++)
    {
        var term = ""
        for(var j = 0; j<number;j++)
        {
            if(digitalArray[i][j] == '1')
                term+= headerString[j];
            else if(digitalArray[i][j] =='0')
                term+= '!' + headerString[j];
        }
        printOut+=term;
        printOut+= ' + ';
    }
    printOut = printOut.substring(0, printOut.length - 3);
    document.getElementById("expression").innerHTML=printOut;
}