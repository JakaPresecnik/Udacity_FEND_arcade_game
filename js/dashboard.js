var dashImages = [
  'dash-img/dash-chest-key.png',
  'dash-img/dash-gate-key.png',
  'dash-img/dash-health.png'
]

var DashInfo = function(x, i) {
  this.x = x;
  this.y = 545;
  this.sprite = dashImages[i];
}
DashInfo.prototype.render = function (numberOf) {
  for(var i = 0; i < numberOf; i++){
    ctx.drawImage(Resources.get(this.sprite), this.x + i * 25, this.y);
  }
};

var health = new DashInfo(10, 2);
var chestKey = new DashInfo(350, 0);
var gateKey = new DashInfo(320, 1);
