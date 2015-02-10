function calculate(x, func)
{
	var sum = 0;
	for(var i = 0; i<func.length; i++)
	{
		sum += func[i] * Math.pow(x, i);
	}
	return sum;
}

function derive(func)
{
	for(var i = 0; i<func.length-1; i++)
	{
		func[i] = func[i+1]*(i+1);
	}
	func.pop();	
	return func;
}

function draw(ctx, xfrom, yfrom, xto, yto)
{
	ctx.beginPath();
	ctx.moveTo(xfrom, yfrom);
	ctx.lineTo(xto,yto);
	ctx.strokeStyle= 'black';
	ctx.stroke();	
}

function draw(ctx, xfrom, yfrom, xto, yto, strokeColor)
{
	ctx.beginPath();
	ctx.moveTo(xfrom, yfrom);
	ctx.lineTo(xto,yto);
	ctx.strokeStyle = strokeColor;
	ctx.stroke();	
}

function drawGrid(c)
{
	ctx = c.getContext('2d');
	gridy = c.height*.5;
	gridx = c.width*.5;
	if(range >= 0  && rangeLow <= 0)
	{
		gridy = (range)/(range-rangeLow) * c.height;
	}
	if(domain >= 0  && domainLow <= 0)
	{
		gridx = (-domainLow)/(domain-domainLow) * c.width;
	}
	draw(ctx, gridx, 0, gridx, c.height, 'blue');
	draw(ctx, 0, gridy, c.width, gridy, 'blue');
	ctx.font = "10px Arial";
	ctx.fillStyle = "blue";	
	for(var i = 1; i < 20;i++)
	{
		ctx.fillText(Math.round(10*(range - i*(range-rangeLow)/20))/10, gridx + 5, i/20 * c.height - 4);
		if(Math.abs(i*(domain-domainLow)/20 + domainLow, i/20 - gridx/c.width) < .1)
			continue;	
		ctx.fillText(Math.round(10*(i*(domain-domainLow)/20 + domainLow))/10, i/20 * c.width, gridy - 2);
	}
}

function drawDeg(c, func, color)
{
	ctx = c.getContext('2d');
	ctx.beginPath();
	for(var i = 1; i < c.width; i++)
	{
		var y = calculate(i*(domain-domainLow)/c.width + domainLow, func);
		y = (1-(y-domainLow)/(domain-domainLow)) * c.height;
		ctx.lineTo(i, y);
	}
	ctx.strokeStyle = color;
	ctx.stroke();
}

/*function drawDeg(c, func)
{
	ctx = c.getContext('2d');
	ctx.beginPath();
	for(var i = 1; i < c.width; i++)
	{
		var y = calculate(i*(domain-domainLow)/c.width + domainLow, func);
		if(y>range || y<rangeLow)
			continue;
		y = (1-(y-domainLow)/(domain-domainLow)) * c.height;
		ctx.lineTo(i, y);
	}
	ctx.stroke();
}*/

function polyDegree(p)
{
	var i = p.length - 1;
	while (p.length >= 0)
		if (p.length != 0)
			return i;
	return 0;
}

function addCoefficient(s, n)
{
	if (n == 0)
		return s;
	if (n == 1)
	{
		s+='x';
		return s;
	}

	s+=n+'x';
	return s;
}

function addPower(s,n)
{
	if (n == 0 || n == 1)
		return s;

	s+= "^" + n;
	return s;
}

function print(a)
{
	var s = "";
	var i = a.length;
	var check = 0;
	while (i > 0 && check == 0)
	{
		if (Math.abs(a[i]) >= .0000001)
		{
			if (a[i] < 0)
				s+="-";
			s = addCoefficient(s, Math.abs(a[i]));
			s = addPower(s,i);
			check++;
		}
		i--;
	}

	while (i > 0)
	{
		if (a[i] != 0)
		{
			if (a[i] > 0)
				s+= " + ";
			if (a[i] < 0)
				s+= " - ";
			s = addCoefficient(s, Math.abs(a[i]));
			s = addPower(s,i);
		}
		i--;
	}

	if(Math.abs(a[0]) > .0000001)
	{
		if(s!="")
		{
			if (a[0] > 0)
				s+= " + ";
			else if (a[0] < 0)
				s+= " - ";
			s+=Math.abs(a[0]);
		}
		else{s = a[0];}
	}
	if(s=="")
		return "0";
	return s;
}

function polyPrint(p)
{
	p = print(p);
	p = "f(x) = " + p;
    document.getElementById("equation").innerHTML= p;
}

function hide(val)
{
	if(layers[val].style.display!='none')
		layers[val].style.display = 'none';
	else
	{
		layers[val].style.display = 'block';
	}
}

function graph()
{
	var func = document.getElementById('inputFunction').value;
	var simplifiedFunction = simplify(func);
	polyPrint(simplifiedFunction);
	var canvas = document.getElementById("canvas");
	while (canvas.firstChild) 
	{
   		canvas.removeChild(canvas.firstChild);
	}	
	for(var i = 0; i<4; i++)
	{
		var layer = document.createElement('canvas');
		layer.className = 'layers';
		layer.height = window.innerHeight*.7;
		layer.width = window.innerWidth*.7;
		canvas.appendChild(layer);
	}
	layers = document.getElementsByClassName("layers");
	var x;
	range = 10;
	domain = 10;
	domainLow = -10;
	rangeLow = -10;
	if(x = parseInt(document.getElementById('domain').value))
		domainLow = x;
	if(x = parseInt(document.getElementById('range').value))
		rangeLow = x;
	if(x = parseInt(document.getElementById('domainmax').value))
		domain = x;
	if(x = parseInt(document.getElementById('rangemax').value))
		range = x;
	drawGrid(layers[0]);
	drawDeg(layers[1], simplifiedFunction, 'black');
	drawDeg(layers[2], derive(simplifiedFunction), "blue");
	drawDeg(layers[3], derive(simplifiedFunction), "red");
	return;
}

range = 10;
rangeLow = -10;
domain = 10;
domainLow = -10;
gridx = 0;
gridy = 0;