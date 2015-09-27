function removeDuplicates(SOP)
{
    for(var i = 0; i<SOP.length-1; i++)
    {
        for(var j = i+1; j<SOP.length; j++)
        {
            if(SOP[i] == SOP[j])
            {
                SOP.splice(j,1);
                j-=1;
            }
        }
    }
    return SOP;
}

function combineTerms(SOP)
{
    var SOPnew = SOP.slice();
    var changed = 0;
    for(var i = 0; i<SOPnew.length; i++)
    {
        var matched = 0;
        for(var j = 0; j<SOP.length && !matched; j++)
        {
            var difference = Math.abs(SOPnew[i] - SOP[j]);
            for(var k = number; k>=0 && !matched; k--)
            {
                if(difference==Math.pow(10,k) && (((Math.max(SOPnew[i],SOP[j]))-difference)%Math.pow(10,k+1)/Math.pow(10,k)<1))
                {
                    var alreadyPresent = 0;
                    var mergedterm = Math.max(SOPnew[i], SOP[j]) + difference;
                    for(var b = 0; b<SOPnew.length; b++)
                    {
                        if(SOPnew[b] == mergedterm)
                        {
                            alreadyPresent = 1;
                        }
                    }
                    if(!alreadyPresent)
                    {
                        SOPnew[i] = mergedterm;
                        changed = 1;
                        matched = 1;
                    }
                }
            }
        }
    }
    if(!changed)
        return SOPnew;
    return combineTerms(removeDuplicates(SOP.concat(SOPnew)));
}

function removeDuplicatesDigital(SOP)
{
    for(var i = 0; i<SOP.length; i++)
    {
        for(var j = 0; j<SOP.length; j++)
        {
            if(i!=j)
            {
                var c = 0;
                for(var k = 0; k<SOP[i].length && (SOP[i][k]==SOP[j][k] || SOP[i][k] =='2'); k++)
                {
                    if(k==SOP[i].length-1)
                        c = 1;
                }
                if(c==1)
                {
                    if(i>j)
                        i--;
                    SOP.splice(j,1);
                    j--;
                }
            }
        }
    }
    return SOP;
}
function convertArray(SOPi)
{
    SOP = SOPi.slice()
    var digitalSOP = new Array();
    for(var i = 0; i<SOP.length; i++)
    {
        digitalSOP[i] = new Array();
        for(var j = number-1; j>=0; j--)
        {
            if(SOP[i] >= Math.pow(10,j)*2)
            {
                digitalSOP[i][number-1-j]='2';
                SOP[i]-=Math.pow(10,j)*2;
            }
            else if(SOP[i] >= Math.pow(10,j))
            {
                digitalSOP[i][number-1-j] = '1';
                SOP[i]-=Math.pow(10,j);
            }
            else
            {
                digitalSOP[i][number-1-j] = '0';
            }
        }
    }
    return digitalSOP;
}
function arrayUnique(array)
{
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}
function trimIndices(indiceCount)
{
    indiceCount.sort(function(a, b){return a-b});
    for(i=1;i<indiceCount.length;i++)
    {
        if(indiceCount[i]==indiceCount[i-1])
        {
            indiceCount.splice(i,1);
            i--;
        }
    }
}
function primeImplicant(digitalArray)
{
    //Construct a list of indices the reduced mapping can represent
    var implicants=new Array();
    for(i=0;i<digitalArray.length;i++)
    {
        implicants.push(new Array());
    }
    //implicants contains an array of all the indices and the corresponding reduced digit array
    for(i=0;i<digitalArray.length;i++)
    {
        implicants[i].push([0]);
        implicants[i].push(digitalArray[i]);

        for(j=0;j<digitalArray[i].length;j++)
        {
            if(digitalArray[i][j]==1)
            {
                for(k=0;k<implicants[i][0].length;k++)
                {
                    implicants[i][0][k]+=Math.pow(2,number-j-1);
                }
            }
            else if(digitalArray[i][j]==2)
            {
                l=implicants[i][0].length;
                for(k=0;k<l;k++)
                {
                    implicants[i][0].push(implicants[i][0][k]+Math.pow(2,number-j-1));
                }
            }
        }
    }
    /*
     var testText3="<table>";
     for(i=0;i<implicants.length;i++)
     {
     testText3+="<tr>";
     for(j=0;j<implicants[i].length;j++)
     {
     testText3+="<td>"+implicants[i][j]+"</td>";
     }
     testText3+="</tr>";
     }
     testText3+="</table>";
     document.getElementById("test3").innerHTML=testText3;*/
    //Determine all the essential prime implicants
    //and throw them into the return array

    //First we determine which indices we care about
    var tempList=implicants.slice();
    var indiceList=new Array();
    for(i=0;i<implicants.length;i++)
    {
        indiceList=indiceList.concat(implicants[i][0]);
    }

    indiceList=arrayUnique(indiceList);
    indiceList.sort(function(a, b){return a-b});
    /*
     var txt="";
     for(i=0;i<indiceList.length;i++)
     {
     txt+=indiceList[i]+",";
     }

     document.getElementById("test4").innerHTML=indiceList;*/

    //Next we find the essential prime implicants
    var returnArray=new Array();
    var implicantChart=new Array();
    indiceList.sort(function(a, b){return a-b});

    for(i=0;i<implicants.length;i++)
    {
        for(k=0;k<indiceList.length;k++)
        {
            implicantChart.push(new Array());
            implicantChart[i][k]=[0];
            for(j=0;j<implicants[i][0].length;j++)
            {
                if(indiceList[k]==implicants[i][0][j])
                {
                    implicantChart[i][k]=1;
                    break;
                }
            }
        }
    }

    //PRINT OUT THE Implicant Chart
    /*
     var testText5="<table><tr>";
     testText5+="<th>Rows</th>";
     for(i=0;i<indiceList.length;i++)
     {
     testText5+="<th>"+indiceList[i]+"</th>";
     }
     testText5+="</tr>";
     for(i=0;i<implicants.length;i++)
     {
     testText5+="<tr>";
     testText5+="<td>"+implicants[i][0]+"</td>";
     for(j=0;j<implicantChart[i].length;j++)
     {
     testText5+="<td>"+implicantChart[i][j]+"</td>";
     }
     testText5+="</tr>";
     }
     testText5+="</table>";
     document.getElementById("test5").innerHTML=testText5;*/
    var essentialArray= new Array();
    var containedArray= new Array();
    var essentialRows= new Array();
    //Trim extra rows (THIS IS A HACK NOT A BUGFIX) I HAVE NO CLUE WHY ImplicantChart HAS ~60 ROWS
    implicantChart.splice(implicants.length,implicantChart.length-implicants.length);
    var implicantsCopy=implicants.slice();


    //We've created the Prime Implicant chart now we determine the "essential" prime implicants
    for(i=0;i<implicantChart[0].length;i++)
    {
        var sum=0;
        var loc=-1;
        var rowLoc=-1;
        var isEssential=false;
        for(j=0;j<implicantChart.length;j++)
        {
            if(implicantChart[j][i]==1)
            {
                sum+=1;
                loc=j;
                rowLoc=i;
            }
            if(sum>1)
            {
                isEssential=false;
                break;
            }
            else if(sum==1)
            {
                isEssential=true;
            }
        }

        if(isEssential)
        {
            for(l=0;l<implicantChart[loc].length;l++)
            {
                if(implicantChart[loc][l]==1)
                {
                    for(m=0;m<implicantChart.length;m++)
                    {
                        implicantChart[m][l]=0;
                    }
                }
            }

            essentialArray.push(implicants[loc][1]);
            containedArray.push(implicants[loc][0]);
            essentialRows.push(loc);
        }
    }
    removeDuplicatesDigital(essentialArray);
    //removeDuplicatesDigital(containedArray);
    trimIndices(essentialArray);

    //Prune the implicantChart
    essentialRows.sort(function(a, b){return b-a});
    for(i=0;i<essentialRows.length;i++)
    {
        implicantsCopy.splice(essentialRows[i],1);
        implicantChart.splice(essentialRows[i],1);
    }
    //TEST
    //PRINT OUT THE reduced Implicant Chart
    /*
     var testText8="Reduced Table: <br/><table>";
     for(i=0;i<implicantChart.length;i++)
     {
     testText8+="<tr>";
     testText8+="<td>"+implicantsCopy[i][0]+"</td>";
     for(j=0;j<implicantChart[i].length;j++)
     {
     testText8+="<td>"+implicantChart[i][j]+"</td>";
     }
     testText8+="</tr>";
     }
     testText8+="</table>";
     document.getElementById("test8").innerHTML=testText8;*/
    /*
     var testText6="";
     for(i=0;i<essentialArray.length;i++)
     {
     testText6+=essentialArray[i]+"<br/>";
     }

     document.getElementById("test6").innerHTML=testText6;*/

    var indiceCount=new Array();
    for(i=0;i<containedArray.length;i++)
    {
        indiceCount=indiceCount.concat(containedArray[i]);
    }
    trimIndices(indiceCount);
    /*
     var testText7="IndiceCount: ";
     for(i=0;i<indiceCount.length;i++)
     {
     testText7+=indiceCount[i]+",<br/>";
     }
     document.getElementById("test7").innerHTML=testText7;*/
    //If all terms are essential we're done.
    if(indiceCount.length==indiceList.length)
        return essentialArray;
    //Otherwise..
    //Take the row with the most 1s if there's multiple choose the first one. This might work idk. Testing needed.
    while(indiceCount.length!=indiceList.length)
    {
        var maxSum=0;
        var bestRow=0;
        for(i=0;i<implicantChart.length;i++)
        {
            var currentSum=0;
            for(j=0;j<implicantChart.length;j++)
            {
                if(implicantChart[i][j]==1)
                {
                    currentSum+=1;
                }
            }
            if(currentSum>maxSum)
            {
                bestRow=i;
            }
        }
        //alert(bestRow);
        //alert(implicantsCopy[bestRow][0]);
        indiceCount=indiceCount.concat(implicantsCopy[bestRow][0]);
        //alert(indiceCount);
        trimIndices(indiceCount);
        //alert("IndiceCount length" +indiceCount.length+"indiceList length"+indiceList.length);
        essentialArray.push(implicantsCopy[bestRow][1]);

        implicantChart.splice(bestRow,1);
        implicantsCopy.splice(bestRow,1);

    }

    return essentialArray;
}
