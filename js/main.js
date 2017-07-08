var app = angular.module('app', []);

// app.config(function($routeProvider, $locationProvider) {
//     $locationProvider.html5Mode(true);
// });

app.controller('MainController', function($scope, $timeout){
//   INIT PAGE
  var tload = 3000;  
  $(".banner").css('opacity', 0);
  $timeout(function(){
    $(".loader").addClass('fadeOut');
  }, tload);
  
  $timeout(function(){
    $(".banner").addClass('fadeIn');
    $(".loader").css('display', "none");
  }, tload + 700);  
  
  $timeout(function(){
    $(".banner").removeClass('fadeIn');
    $(".banner").css('opacity', 1);
    bgAnimate();
  }, tload + 1400);  
  
  var q = Math.floor(quotes.length * Math.random());
  $scope.quote = quotes[q];
  $scope.color = colors[Math.floor(colors.length * Math.random())];
  
//   LISTENER
  $scope.tweet = function() {    
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + $scope.quote.text + '" ' + $scope.quote.name));
  };
  
  $scope.changeQuote = function() {
    var newQ;
    while(newQ == undefined || quotes[newQ].name === $scope.quote.name) {
      newQ = Math.floor(quotes.length * Math.random());
    }

    $timeout(function(){      
      $scope.quote = quotes[newQ];    
      $scope.color = colors[Math.floor(colors.length * Math.random())];
    }, 1000);

    $(".banner").addClass('fadeOut');
   
    $timeout(function(){
      $(".banner").removeClass('fadeOut');
    }, 2000);
    // setTimeout(function(){
    //   $(".banner").removeClass('fadeIn');
    // }, 2400);
    
    $scope.$apply();
  }; // end Change Quote
});

function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
};

var colors = [
  '#ff9a9e',
  '#fcb69f',
  '#ff9a9e',
  '#a1c4fd',
  '#66a6ff',
  '#a3bded',
  '#80d0c7',
  '#93a5cf',
  '#ff758c',
  '#ee9ca7',
  '#B7F8DB'
];

var quotes = [
  {
    name:"Stephen King",
    text:"Description begins in the writer's imaggination, but should finish in the reader's",
    img:"https://image.ibb.co/enPY2a/1.png"
  },{
    name:"Jack London",
    text:"You can't wait for inspiration. You have to go after it with a club.",
    img:"https://image.ibb.co/k97m5v/5.png"
  },{
    name:"George R.R. Martin",
    text:"A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    img:"https://image.ibb.co/eZUcTF/6.png"
  },{
    name:"Mark Twain",
    text:"Good friends, good books, and a sleepy conscience: this is the ideal life.",
    img:"https://image.ibb.co/iBzoJF/3.png"
  },{
    name:"Albert Einstein",
    text:"Everything should be made as simple as possible, but not simpler",
    img:"https://image.ibb.co/d9aHCa/9.png"
  },{
    name:"Don A. Norman",
    text:"No product is an island. A product is more than the product. It is a cohesive, integrated set of experiences",
    img:"https://image.ibb.co/mrnm5v/8.png"
  },{
    name:"George Bernard Shaw",
    text:"Life isn't about finding yourself. Life is about createing yourself.",
    img:"https://image.ibb.co/m1348F/7.png"
  },{
    name:"Mark Twain",
    text:"If you tell the truth, you don't have to remember anything",
    img:"https://image.ibb.co/iBzoJF/3.png"
  },{
    name:"Oscar Wilde",
    text:"Be yourself, everyone else is already taken.",
    img:"https://image.ibb.co/eeNVXa/2.png"
  },{
    name:"Maya Angelou",
    text:"There is no greater agony than bearing an untold story inside you.",
    img:"https://image.ibb.co/miJFFv/4.png"
  }
];

// Particle effect

function bgAnimate() {
  var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    MAX_PARTICLES = 100,
    DRAW_INTERVAL = 60,
    container = document.querySelector('#container'),
    canvas = document.querySelector('#pixie'),
    context = canvas.getContext('2d'),
    gradient = null,
    pixies = new Array();

function setDimensions(e) {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    container.style.width = WIDTH+'px';
    container.style.height = HEIGHT+'px';
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
}
setDimensions();
window.addEventListener('resize', setDimensions);

function Circle() {
    this.settings = {ttl:8000, xmax:5, ymax:2, rmax:10, rt:1, xdef:960, ydef:540, xdrift:4, ydrift: 4, random:true, blink:true};

    this.reset = function() {
        this.x = (this.settings.random ? WIDTH*Math.random() : this.settings.xdef);
        this.y = (this.settings.random ? HEIGHT*Math.random() : this.settings.ydef);
        this.r = ((this.settings.rmax-1)*Math.random()) + 1;
        this.dx = (Math.random()*this.settings.xmax) * (Math.random() < .5 ? -1 : 1);
        this.dy = (Math.random()*this.settings.ymax) * (Math.random() < .5 ? -1 : 1);
        this.hl = (this.settings.ttl/DRAW_INTERVAL)*(this.r/this.settings.rmax);
        this.rt = Math.random()*this.hl;
        this.settings.rt = Math.random()+1;
        this.stop = Math.random()*.2+.4;
        this.settings.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
        this.settings.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
    }

    this.fade = function() {
        this.rt += this.settings.rt;
    }

    this.draw = function() {
        if(this.settings.blink && (this.rt <= 0 || this.rt >= this.hl)) {
            this.settings.rt = this.settings.rt*-1;
        } else if(this.rt >= this.hl) {
            this.reset();
        }

        var newo = 0.6-(this.rt/this.hl);
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        context.closePath();

        var cr = this.r*newo;
        gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        gradient.addColorStop(0.0, 'rgba(255,255,255,'+newo+')');
        gradient.addColorStop(this.stop, 'rgba(255,255,255,'+(newo*.6)+')');
        gradient.addColorStop(1.0, 'rgba(255,255,255,0)');
        context.fillStyle = gradient;
        context.fill();
    }

    this.move = function() {
        this.x += (this.rt/this.hl)*this.dx;
        this.y += (this.rt/this.hl)*this.dy;
        if(this.x > WIDTH || this.x < 0) this.dx *= -1;
        if(this.y > HEIGHT || this.y < 0) this.dy *= -1;
    }

    this.getX = function() { return this.x; }
    this.getY = function() { return this.y; }
}

for (var i = 0; i < MAX_PARTICLES; i++) {
    pixies.push(new Circle());
    pixies[i].reset();
}

function draw() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    for(var i = 0; i < pixies.length; i++) {
        pixies[i].fade();
        pixies[i].move();
        pixies[i].draw();
    }
}

setInterval(draw, DRAW_INTERVAL);
};