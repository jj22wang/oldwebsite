function calculate()
{

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
	ctx.strokeStyle= strokeColor;
	ctx.stroke();	
}

function drawGrid(c)
{
	ctx = c.getContext('2d');
	draw(ctx, c.width*.5, 0, c.width*.5, c.height, 'blue');
	draw(ctx, 0, c.height*.5, c.width, c.height*.5, 'blue');
}

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
	for(var i = 0; i<3; i++)
	{
		var layer = document.createElement('canvas');
		layer.className = 'layers';
		layer.height = window.innerHeight*.7;
		layer.width = window.innerWidth*.7;
		canvas.appendChild(layer);
	}
	var layers = document.getElementsByClassName("layers");
	drawGrid(layers[0]);
	return;
}