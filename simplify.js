function add(x,y)
{
	var s = [];
	for(var i = 0;  i < x.length || i <y.length; i++)
	{
		var add = 0;
		if(i<x.length)
		{
			add+=x[i];
		}
		if(i<y.length)
		{
			add+=y[i];
		}
		s.push(add);
	}

	return s;
}

function subtract(x,y)
{
	var s = [];
	for(var i = 0;  i < x.length || i <y.length; i++)
	{
		var add = 0;
		if(i<x.length)
		{
			add+=x[i];
		}
		if(i<y.length)
		{
			add-=y[i];
		}
		s.push(add);
	}

	return s;
}

//adds a linear combination of two functions
function addMultiple(x, a , y , b)
{
	var s = [];
	for(var i = 0;  i < x.length || i <y.length; i++)
	{
		var add = 0;
		if(i<x.length)
		{
			add+=x[i]*a;
		}
		if(i<y.length)
		{
			add+=y[i]*b;
		}
		s.push(add);
	}

	return s;
}

function multiply(x,y)
{
	var s = [];
	yprime = y.slice();
	for(var i = 0; i<x.length; i++)
	{
		s = addMultiple(s, 1, yprime, x[i]);
		yprime.unshift(0);
	}
	return s;
}

function power(x,y)
{
	if(y[0] > 0)
	{	
		var s = x.slice();
		for(var i = 1; i < y[0]; i++)
		{
			s = multiply(s, x);
		}

		return s;
	}
	else
	{
		return [0, 0]
	}
}
function interpretOperator(thisGroup, nextGroup, command)
{
	if(nextGroup.length == 0)
	{
		return thisGroup;
	}
	if(command == ')' || command == '(')
	{
		if(isNaN(nextGroup[0]) && nextGroup[0]!='x')
		{
			return interpretOperator(thisGroup, nextGroup.substring(1), nextGroup[0]);
		}
		else if(command == '(')
		{
			var i = 0
			var bracketDifference = 0;
			while(i<nextGroup.length && nextGroup[i]!=')' || bracketDifference > 0)
				{
					if(nextGroup[i] == '(')
						bracketDifference++;
					if(nextGroup[i] == ')')
						bracketDifference--;
					i++;
				}
			if(i==nextGroup.length)
			{
				return multiply(thisGroup, interpretGroup(nextGroup));
			}
			else
			{
				var s = multiply(thisGroup, interpretGroup(nextGroup.substring(0, i)));
				var s = interpretOperator(s, nextGroup.substring(i+1), nextGroup[i]);
				return s;
			}
		}
		else
		{
			return interpretGroup(nextGroup);
		}
	}

	if(command == '+')
	{
		var i = 0
		var bracketDifference = 0;
		while(i<nextGroup.length && nextGroup[i]!= '+' && nextGroup[i]!= '-' && nextGroup[i]!=')' || bracketDifference > 0)
		{
			if(nextGroup[i] == '(')
				bracketDifference++;
			if(nextGroup[i] == ')')
				bracketDifference--;
			i++;
		}
		if(i==nextGroup.length)
		{
			return add(thisGroup, interpretGroup(nextGroup));
		}
		else
		{
			var s = add(thisGroup, interpretGroup(nextGroup.substring(0, i)));
			var s = interpretOperator(s, nextGroup.substring(i+1), nextGroup[i]);
			return s;
		}
	}

	if(command == '-')
	{
		var i = 0
		var bracketDifference = 0;
		while(i<nextGroup.length && nextGroup[i]!= '+' && nextGroup[i]!= '-'  && nextGroup[i]!=')' || bracketDifference > 0)
		{
			if(nextGroup[i] == '(')
				bracketDifference++;
			if(nextGroup[i] == ')')
				bracketDifference--;
			i++;
		}
		if(i==nextGroup.length)
		{
			return subtract(thisGroup, interpretGroup(nextGroup));
		}
		else
		{
			var s = subtract(thisGroup, interpretGroup(nextGroup.substring(0, i)));
			var s = interpretOperator(s, nextGroup.substring(i+1), nextGroup[i]);
			return s;
		}
	}

	if(command == '*')
	{
		var i = 0
		var bracketDifference = 0;
		while(i<nextGroup.length && nextGroup[i]!= '+' && nextGroup[i]!= '-'  && nextGroup[i]!=')' && nextGroup[i]!='*' || bracketDifference > 0)
			{
				if(nextGroup[i] == '(')
					bracketDifference++;
				if(nextGroup[i] == ')')
					bracketDifference--;
				i++;
			}
		if(i==nextGroup.length)
		{
			return multiply(thisGroup, interpretGroup(nextGroup));
		}
		else
		{
			var s = multiply(thisGroup, interpretGroup(nextGroup.substring(0, i)));
			var s = interpretOperator(s, nextGroup.substring(i+1), nextGroup[i]);
			return s;
		}	
	}

	if(command == '^')
	{
		var i = 0
		var bracketDifference = 0;
		while(i<nextGroup.length && nextGroup[i]!= '+' && nextGroup[i]!= '-'  && nextGroup[i]!=')'  && nextGroup[i]!='*' && nextGroup[i]!='^' || bracketDifference > 0)
			{
				if(nextGroup[i] == '(')
					bracketDifference++;
				if(nextGroup[i] == ')')
					bracketDifference--;
				i++;
			}

		if(i==nextGroup.length)
		{
			return power(thisGroup, interpretGroup(nextGroup));
		}
		else
		{
			var s = power(thisGroup, interpretGroup(nextGroup.substring(0, i)));
			var s = interpretOperator(s, nextGroup.substring(i+1), nextGroup[i]);
			return s;
		}	
	}
	return thisGroup;
}

function interpretGroup(remainingFunc)
{
	//no more function left to process
	if(remainingFunc.length == 0)
	{
		return [0];
	}

	if(remainingFunc[0] == ')' || remainingFunc[0] == '(')
	{
		var s = interpretGroup(remainingFunc.substring(1));
		return s;
	}

	var thisGroup = remainingFunc.substring(0,1);
	if(thisGroup == '-')
	{
		return interpretOperator([-1],remainingFunc.substring(1),'*');
	}

	if(thisGroup == 'x')
	{
		thisGroup = [0, 1];
		remainingFunc.slice(0, 1);
		remainingFunc = remainingFunc.substring(1);
		if(!remainingFunc)
		{
			return thisGroup;
		}
	}

	else if(!isNaN(thisGroup))
	{
		var i = 0;
		while(i<remainingFunc.length && !isNaN(remainingFunc[i]))
		{
			i++;
		}
		thisGroup = [parseInt(remainingFunc.slice(0, i))];
		if(remainingFunc.length == 0)
		{
			return thisGroup;
		}
		remainingFunc = remainingFunc.substring(i);
		if(remainingFunc.length == 0)
		{
			return thisGroup;
		}
		if(remainingFunc[0] == 'x')
		{
        	thisGroup = interpretOperator(thisGroup, remainingFunc, '*');
	        if(remainingFunc.length == 0)
			{
				return thisGroup;
			}
		}
	}

	return interpretOperator(thisGroup, remainingFunc.substring(1), remainingFunc[0]);
}

function simplify(func)
{
	func = func.replace(/\s+/g, '');
	var expandedFunction = interpretGroup(func);
	return expandedFunction;
}