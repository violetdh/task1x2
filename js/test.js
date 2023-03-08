var app = new PIXI.Application(1000, 800, { backgroundColor: 0x111111 });
app.stage.interactive = true;
document.body.appendChild(app.view);

PIXI.loader
  .add("symbol00", "assets/symbols/symbol_00.json", { crossOrigin: true })
  .load(onAssetsLoaded);

var spine, spine2;
var spineData1, spineData2;