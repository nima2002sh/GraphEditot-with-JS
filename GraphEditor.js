var nodeNumber = 1;
var drowNode = false;
var insideNode = false;
var startPath = false;
var selected = false;
let nodeListX = [];
let nodeListY = [];
let nodeListN = [];
let edgeNode1 = [];
let edgeNode1X = [];
let edgeNode1Y = [];
let edgeNode2 = [];
let edgeNode2X = [];
let edgeNode2Y = [];
let edgeType = [];



function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  stroke(255, 255, 255)
  quad(1,600,1,550,199,550,199,600);
  text(0,100,575);
  quad(201,600,201,550,399,550,399,600);
  text(1,300,575);
  quad(401,600,401,550,599,550,599,600);
  text(2,500,575);

  quad(0,20,0,0,20,0,20,20);
  text('end',0,15);

  if (drowNode){
    drowThis = true;
    for (let i = 0; i < nodeListN.length; i++){
      if (inNode(i)) drowThis = false;
    }
    if (drowThis){
      nodeListX.push(mouseX);
      nodeListY.push(mouseY);
      nodeListN.push(nodeNumber);
      nodeNumber += 1;
    }
  }
  drowNode = false;

  for (let i = 0; i < nodeListN.length; i++){
    if (inNode(i)){
      stroke(200, 200, 200);
    }
    else{
      stroke(255, 255, 255);
    }
    circle(nodeListX[i], nodeListY[i], 25);
    text(nodeListN[i], nodeListX[i]-10, nodeListY[i]+5)
    insideNode = false;
  }

  for (let i = 0; i < edgeNode2.length; i++){
    stroke(255, 255, 255);
    line(edgeNode1X[i], edgeNode1Y[i], edgeNode2X[i], edgeNode2Y[i]);
  }
}

function doubleClicked() {
  drowNode = true;
}

function inNode(i){
    insideNode = false;
    if (mouseX <= nodeListX[i]+15 && mouseX >= nodeListX[i]-15 && mouseY <= nodeListY[i]+15 && mouseY >= nodeListY[i]-15 ){
      insideNode = true;
    } 
  return insideNode;
}

function mouseClicked() {
  if(mouseX <= 20 && mouseX >= 0 && mouseY <= 20 && mouseY >= 0 ){
    endF();
  }

  if(!selected){
    if(mouseY <= 600 && mouseY >= 550){
      if(mouseX <= 199 && mouseX >= 1){
        edgeType.push(0);
      }
      if(mouseX <= 399 && mouseX >= 201){
        edgeType.push(1);
      }
      if(mouseX <= 599 && mouseX >= 401){
        edgeType.push(2);
      }
      selected = true;
    }
  }

  else{
    if(!startPath){
      for (let i = 0; i < nodeListN.length; i++){
        if (inNode(i)){
          startPath = true;
          edgeNode1.push(nodeListN[i]);
          edgeNode1X.push(nodeListX[i]);
          edgeNode1Y.push(nodeListY[i]);
        }
      }
    }
    else{
      selected = false;
      startPath = false;
      for (let i = 0; i < nodeListN.length; i++){
        if (inNode(i)){
            ready = true;
            secendNode = i;
        }
      }
      if(ready){
        ready = false;
        edgeNode2.push(nodeListN[secendNode]);
        edgeNode2X.push(nodeListX[secendNode]);
        edgeNode2Y.push(nodeListY[secendNode]);
      }
      else{
        edgeNode1.pop();
        edgeNode1X.pop();
        edgeNode1Y.pop();
        edgeType.pop();
      }
    }
  }
}

function endF(){
  let Nodes = [];
  for (let i = 0; i < nodeListN.length; i++){
    newPosition = new Position(nodeListX[i], 0, nodeListY[i]);
    newNode = new Node(nodeListN[i], newPosition);
    Nodes.push(newNode);
  }
  let Edges = [];
  for (let i = 0; i < edgeNode1.length; i++){
    newPosition1 = new Position(edgeNode1X[i], 0, edgeNode1Y[i]);
    newPosition2 = new Position(edgeNode2X[i], 0, edgeNode2Y[i]);
    newEdge = new Edge(edgeNode1[i], edgeNode2[i], edgeType[i], newPosition1, newPosition2)
    Edges.push(newEdge);
  }
  console.log(JSON.stringify({nodes:Nodes,eddges:Edges}))
}

class Node{
  constructor(id, x, y, z){
    this.id = id;
    this.position = new Position(x, y, z);
  }
}

class Position{
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class Edge{
  constructor(node1Id, node2Id, edgeType, position1, position2){
    this.node1Id = node1Id;
    this.node2Id = node2Id;
    this.edgeType = edgeType;
    this.splinePoints = [position1, position2];
  }
}
