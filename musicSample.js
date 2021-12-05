let soundFile, soundFile2;
 let loopStart = 0.5;
 let loopDuration = 0.2;
 let pos = 1;
 function preload() {
   soundFile = loadSound('./musicDemo/Happy/Happy1.wav');
   soundFile2 = loadSound('./musicDemo//Happy/Happy2.wav')
 }
 function setup() {

  let btn = createButton('play')
  btn.mousePressed(btnClicked)

   let cnv = createCanvas(100, 100);
   
   cnv.mousePressed(canvasPressed);
   background(220);
 }
 function canvasPressed() {
   pos = soundFile.currentTime();
   console.log(pos)
   soundFile.setVolume(0,1,1);
   soundFile.pause(2);
   soundFile2.setVolume(1,1);
   soundFile2.loop();
   soundFile2.jump(pos)
   background(0, 200, 50);
 }

 function btnClicked(){
  soundFile && soundFile.loop(0);
 }