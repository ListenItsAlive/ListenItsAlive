let detections
let Neutral, Happy1, Happy2, Happy3, Sad1, Sad2, Sad3, Angry1, Angry2, Fear1, Fear2, Fear3
let allMusic=[]
let vidNeutral, vidHappy1, vidHappy2, vidHappy3, vidSad1, vidSad2, vidSad3, vidAngry1, vidAngry2, vidFear1, vidFear2, vidFear3
let allVideo=[]
let lastVersion = 0
var btn1
music16MidPos = {'Neutral':[0.281,0.715,0.867,1.025,2.090,2.700,3.306,4.217,5.115,5.574,5.879,6.332,6.937,7.536,8.141,9.223],
                'Happy':[0.235,0.6455,0.879,1.053,1.519,2.335,2.918,3.385,3.968,4.377,4.610,4.786,5.252,6.184,6.998,8.173],
                'Sad':[0.359,0.887,1.235,1.765,2.467,3.519,4.392,5.085,5.957,6.485,6.839,7.366,8.062,9.108,10.512,12.00],
                'Angry':[0,0.794,1.176,1.557,2.320,3.162,3.989,4.767,6.372,7.183,7.564,7.930,8.756,9.567,10.361,11.156],
                'Fear':[0,0.678,1.100,1.577,2.383,3.209,4.822,5.152,6.381,7.133,7.591,7.976,8.783,9.572,11.167,12.762]
}

//预读器（新建函数用来读取上传的音频）
function preload(){
    Neutral = loadSound('./musicDemo/Neutral/Neutral.wav');
    Happy1 = loadSound('./musicDemo/Happy/Happy1.wav');
    Happy2 = loadSound('./musicDemo/Happy/Happy2.wav');
    Happy3 = loadSound('./musicDemo/Happy/Happy3.wav');
    Sad1 = loadSound('./musicDemo/Sad/Sad1.wav');
    Sad2 = loadSound('./musicDemo/Sad/Sad2.wav');
    Sad3 = loadSound('./musicDemo/Sad/Sad3.wav');
    Angry1 = loadSound('./musicDemo/Angry/Angry1.wav');
    Angry2 = loadSound('./musicDemo/Angry/Angry2.wav');
    Fear1 = loadSound('./musicDemo/Fear/Fear1.wav');
    Fear2 = loadSound('./musicDemo/Fear/Fear2.wav');
    Fear3 = loadSound('./musicDemo/Fear/Fear3.wav');
    loadVid()
    allMusic = [Neutral, Happy1, Happy2, Happy3, Sad1, Sad2, Sad3, Angry1, Angry2, Fear1, Fear2, Fear3]
  }

function loadVid(){
    vidNeutral = createVideo('./videoDemo/Neutral/Neutral.mp4',videoPlay);
    // vidHappy1 = createVideo('./videoDemo/Happy/Happy1.mp4',videoPlay);
    // vidHappy2 = createVideo('./videoDemo/Happy/Happy2.mp4',videoPlay);
    // vidHappy3 = createVideo('./videoDemo/Happy/Happy3.mp4',videoPlay);
    // vidSad1 = createVideo('./videoDemo/Sad/Sad1.mp4',videoPlay);
    // vidSad2 = createVideo('./videoDemo/Sad/Sad2.mp4',videoPlay);
    // vidSad3 = createVideo('./videoDemo/Sad/Sad3.mp4',videoPlay);
    // vidAngry1 = createVideo('./videoDemo/Angry/Angry1.mp4',videoPlay);
    // vidAngry2 = createVideo('./videoDemo/Angry/Angry2.mp4',videoPlay);
    // vidFear1 = createVideo('./videoDemo/Fear/Fear1.mp4',videoPlay);
    // vidFear2 = createVideo('./videoDemo/Fear/Fear2.mp4',videoPlay);
    // vidFear3 = createVideo('./videoDemo/Fear/Fear3.mp4',videoPlay);
    //vidNeutral.size(300,100);
    vidNeutral.id('vidN');
    vidHappy1.id('vidH1');
    vidHappy2.id('vidH2');
    vidHappy3.id('vidH3');
    vidSad1.id('vidS1');
    vidSad2.id('vidS2');
    vidSad3.id('vidS3');
    vidAngry1.id('vidA1');
    vidAngry2.id('vidA2');
    vidFear1.id('vidF1');
    vidFear2.id('vidF2');
    vidFear3.id('vidF3');

    allVideo=[vidNeutral, vidHappy1, vidHappy2, vidHappy3, vidSad1, vidSad2, vidSad3, vidAngry1, vidAngry2, vidFear1, vidFear2, vidFear3]
}

function videoPlay(videoName){
    // console.log(vidNeutral.currentTime);
//    vidNeutral.loop()
//    console.log(vidNeutral);
}

function emotionToVersion(emotion){
    let version = 100
    if (emotion[0] == 'neutral')
        version = 1
    else if (emotion[0] == 'happy' && emotion[1] > 0 && emotion[1] <= 0.3)
        version = 2
    else if (emotion[0] == 'happy' && emotion[1] > 0.3 && emotion[1] <= 0.99)
        version = 3
    else if (emotion[0] == 'happy' && emotion[1] > 0.99 && emotion[1] <= 1)
        version = 4
    else if (emotion[0] == 'sad' && emotion[1] > 0 && emotion[1] <= 0.3)
        version = 5
    else if (emotion[0] == 'sad' && emotion[1] > 0.3 && emotion[1] <= 0.93)
        version = 6
    else if (emotion[0] == 'sad' && emotion[1] > 0.93 && emotion[1] <= 1)
        version = 7
    else if ((emotion[0] == 'angry' || emotion[0] == 'disgusted') && emotion[1] > 0 && emotion[1] <= 0.9)
        version = 8
    else if ((emotion[0] == 'angry' || emotion[0] == 'disgusted') && emotion[1] > 0.9 && emotion[1] <= 1)
        version = 9
    else if ((emotion[0] == 'fearful' || emotion[0] == 'surprised') && emotion[1] > 0 && emotion[1] <= 0.3)
        version = 10
    else if ((emotion[0] == 'fearful' || emotion[0] == 'surprised') && emotion[1] > 0.3 && emotion[1] <= 0.93)
        version = 11
    else if ((emotion[0] == 'fearful' || emotion[0] == 'surprised') && emotion[1] > 0.93 && emotion[1] <= 1)
        version = 12
    else
        version = emotion
    return version
}

function musicGetPos(){
    for (i = 0, len = allMusic.length; i < len ; i++)
    {
        let pos
        console.log(allMusic[i])
        if (allMusic[i].isPlaying())
        {
            pos = allMusic[i].currentTime()
            console.log('stopTime=' + pos)
            allMusic[i].setVolume(0,1,1)
            allMusic[i].pause(2)
            allMusic[i].setLoop(false)
            return pos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        }
    }
    return 0
}

function musicPlay(version){
    let pos = musicGetPos()
    //播放相应版本的音乐
    console.log('startTime=' + pos)
    if (version == 1)
    {
        Neutral.setVolume(1,1)
        Neutral.loop()
        Neutral.jump(cueTime = pos)

    }
    else if (version == 2)
    {
        Happy1.setVolume(1,1)
        Happy1.loop()
        Happy1.jump(cueTime = pos)
    }
    else if (version == 3)
    {
        Happy2.setVolume(1,1)
        Happy2.loop()
        Happy2.jump(cueTime = pos)
    }
    else if (version == 4)
    {
        Happy3.setVolume(1,1)
        Happy3.loop()
        Happy3.jump(cueTime = pos)
    }
    else if (version == 5)
    {
        Sad1.setVolume(1,1)
        Sad1.loop()
        Sad1.jump(cueTime = pos)
    }
    else if (version == 6)
    {
        Sad2.setVolume(1,1)
        Sad2.loop()
        Sad2.jump(cueTime = pos)
    }
    else if (version == 7)
    {
        Sad3.setVolume(1,1)
        Sad3.loop()
        Sad3.jump(cueTime = pos)
    }
    else if (version == 8)
    {
        Angry1.setVolume(1,1)
        Angry1.loop()
        Angry1.jump(cueTime = pos)
    }
    else if (version == 9)
    {
        Angry2.setVolume(1,1)
        Angry2.loop()
        Angry2.jump(cueTime = pos)
    }
    else if (version == 10)
    {
        Fear1.setVolume(1,1)
        Fear1.loop()
        Fear1.jump(cueTime = pos)
    }
    else if (version == 11)
    {
        Fear2.setVolume(1,1)
        Fear2.loop()
        Fear2.jump(cueTime = pos)
    }
    else if (version == 12)
    {
        Fear3.setVolume(1,1)
        Fear3.loop()
        Fear3.jump(cueTime = pos)
    }
    else
    {
        console.log('error')
        console.log(version)
    }
}

function expressionRecognize(detections){
    let emotion
    if(detections&&detections.length>0)
    {
        let exp = Object.entries(detections[0].expressions)

        let expSorted = exp.sort((a, b) => {
            return b[1] - a[1]
        })
        emotions = expSorted.slice(0, 3)
        if (emotions[0][0]=='neutral'&&emotions[0][1]<0.999)
            //console.log(emotions[1])
            emotion = emotions[1]
        else
            //console.log(emotions[0])
            emotion = emotions[0]
    }
    else 
        emotion = 'error'
    return emotion
}

//——————————————————————————————————————————————————————————————————————————————————-

  function detect() {
    setInterval(async () => {
        detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.5 })).withFaceExpressions()
        emotion = expressionRecognize(detections)
        version = emotionToVersion(emotion)
        //打印
        //if (emotion[0] != 'neutral' && emotion != 'error')
          console.log(emotion)
        //console.log(version)
        if (lastVersion == 0){ //首次播放
            musicPlay(version)
        }
        else if (lastVersion == version){
        }
        else
            musicPlay(version)
        //console.log(lastVersion)
        //console.log(version)
        lastVersion = version
    }, 2000)
}

  window.onload = () => {
    let video = document.querySelector('#video')
    let currentVideo, oldVideo

    let video1 = document.querySelector('#video1')
    video1.currentTime = 3
    video1.volume = 0

    let video2 = document.querySelector('#video2')
    video2.currentTime = 3
    video2.volume = 0

    let btn = document.querySelector('#btn1')
    let btn2 = document.querySelector('#btn2')

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream
            video.play()
        })

    Promise.all([
        faceapi.nets.tinyFaceDetector.load(),
        faceapi.nets.faceExpressionNet.load()
    ]).then(() => {
        detect()
    })

    btn.addEventListener('click', function () {
        playVideo(video1)
    })
    btn2.addEventListener('click', function () {
        playVideo(video2)
    })

    function playVideo(video) {
        if (currentVideo) oldVideo = currentVideo
        currentVideo = video
        currentVideo.style.zIndex= 10
        oldVideo.style.zIndex= -1
        video.play()

        const volume = { val: 0 } // Start at (0, 0)
        const tween = new TWEEN.Tween(volume) // Create a new tween that modifies 'coords'.
            .to({ val: 1 }, 3000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .onUpdate(() => {
                currentVideo.volume = volume.val
                currentVideo.style.opacity = volume.val
            })
            .start()

        const volume2 = { val: 1 } // Start at (0, 0)
        const tween2 = new TWEEN.Tween(volume2) // Create a new tween that modifies 'coords'.
            .to({ val: 0 }, 3000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .onUpdate(() => {
                if(oldVideo) oldVideo.volume = volume2.val
                if(oldVideo) oldVideo.style.opacity = volume.val
            })
            .onComplete(()=>{
                setTimeout(() => {
                    if(oldVideo) oldVideo.pause()
                }, 1000);
            })
            .start()

    }

    // Setup the animation loop.
    function animate(time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
    }
    requestAnimationFrame(animate)
}

 function setup(){
     createCanvas(1000,1000)
 }

 function draw(){
     clear()
    //  image(0,0,100,100,vidNeutral)
     emotion = expressionRecognize(detections)
     if (emotion[0] != 'neutral' && emotion != 'error')
     {
         //通过圆的大小来表现表情强度
         let val = emotion[1]
         circle(100,100,map(val,0,1,20,200))
     }
 }