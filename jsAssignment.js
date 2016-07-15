var flag=0;
var X = [];
var Y = [];
var IntersectX=[];
var IntersectY=[];
var xCenter;
var yCenter;
var radius;
function createDot(event) {
	for(i=0; i<X.length; i++){
		if(event.x==X[i] && event.y==Y[i]){
			var str="dotId"+i;
			X.splice(i, 1);
			Y.splice(i, 1);
			document.getElementById(str).remove();
			removeDrawCircle();
			return;
		}
	}
	var str="dotId"+X.length;
	var obj=document.createElement("div");
	X.push(event.x);
	Y.push(event.y);
	obj.setAttribute("class", "existingDot");
	obj.id=str;
	obj.style.top=Y[Y.length-1]-2+'px';
	obj.style.left=X[X.length-1]-1+'px';
	document.getElementById("container").appendChild(obj);
	drawCircle();
}
function distance(x1, y1, x2, y2){
	return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}
function drawCircle(){
	if(X.length==1){
		return;
	}
	if(X.length==2){
		xCenter=((X[0]+X[1])/2);
		yCenter=((Y[0]+Y[1])/2);
		radius=Math.ceil((Math.sqrt((X[1]-X[0])*(X[1]-X[0])+(Y[1]-Y[0])*(Y[1]-Y[0])))/2);
		document.getElementById("circle").style.cx = xCenter-8;
		document.getElementById("circle").style.cy = yCenter-18;
		document.getElementById("circle").style.r = radius;
		return;
	}
	if(distance(X[X.length-1], Y[Y.length-1], xCenter, yCenter)<= radius){
		return;
	}
	var iMaxFar=0;
	var maxDistance=0;
	for(i=0; i<X.length-1; i++){
		var dist=distance(X[X.length-1], Y[Y.length-1], X[i], Y[i]);
		var distPoint=distance(xCenter, yCenter, X[i], Y[i]);
		if(dist>maxDistance && distPoint>=radius-1 && distPoint<=radius+1){
			iMaxFar=i;	
			maxDistance=dist;
		}
	}
	xCenter=((X[iMaxFar]+X[X.length-1])/2);
	yCenter=((Y[iMaxFar]+Y[Y.length-1])/2);
	radius=(distance(xCenter, yCenter, X[X.length-1], Y[Y.length-1]));
	for(i=0; i<X.length-1; i++){
		var dist=distance(xCenter, yCenter, X[i], Y[i]);
		if(dist>radius && i!=iMaxFar){
			var A=(Y[iMaxFar]+Y[Y.length-1])/2;
			var B=(X[iMaxFar]+X[X.length-1])/2;
			var C=(X[iMaxFar]-X[X.length-1])/(Y[Y.length-1]-Y[iMaxFar]);
			var D=(Y[i]+Y[Y.length-1])/2;
			var E=(X[i]+X[X.length-1])/2;
			var F=(X[i]-X[X.length-1])/(Y[Y.length-1]-Y[i]);
			xCenter=(D-A+(C*B)-(F*E))/(C-F);
			yCenter=C*(xCenter-B)+A;
			radius=distance(xCenter, yCenter, X[i], Y[i]);
		}
	}
	document.getElementById("circle").style.cx = xCenter-8;
	document.getElementById("circle").style.cy = yCenter-18;
	document.getElementById("circle").style.r = radius;
}
function removeDrawCircle(){
	if(X.length==1){
		xCenter=X[0];
		yCenter=Y[0];
		radius=0;
	}
	else if(X.length==2){
		xCenter=((X[0]+X[1])/2);
		yCenter=((Y[0]+Y[1])/2);
		radius=Math.ceil((Math.sqrt((X[1]-X[0])*(X[1]-X[0])+(Y[1]-Y[0])*(Y[1]-Y[0])))/2);
	}
	else{
		var duplicateX=X.slice();
		var duplicateY=Y.slice();
		X=[];
		Y=[];
		for(i=0; i<duplicateY.length; i++){
			X[i]=duplicateX[i];
			Y[i]=duplicateY[i];
			drawCircle();
		}
	}
	document.getElementById("circle").style.cx = xCenter-8;
	document.getElementById("circle").style.cy = yCenter-18;
	document.getElementById("circle").style.r = radius;
}