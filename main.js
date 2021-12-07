let detections
//let Neutral, Happy1, Happy2, Happy3, Sad1, Sad2, Sad3, Angry1, Angry2, Fear1, Fear2, Fear3
let allMusic = []
let vidNeutral, vidHappy1, vidHappy2, vidHappy3, vidSad1, vidSad2, vidSad3, vidAngry1, vidAngry2, vidFear1, vidFear2, vidFear3
let allVideo = []
let lastVersion = 0
var btn1
let currentVideo, oldVideo
let pos = 0
music16MidPos = [ [0.281, 0.715, 0.867, 1.025, 2.090, 2.700, 3.306, 4.217, 5.115, 5.574, 5.879, 6.332, 6.937, 7.536, 8.141, 9.223],
[0.235, 0.6455, 0.879, 1.053, 1.519, 2.335, 2.918, 3.385, 3.968, 4.377, 4.610, 4.786, 5.252, 6.184, 6.998, 8.173],
[0.359, 0.887, 1.235, 1.765, 2.467, 3.519, 4.392, 5.085, 5.957, 6.485, 6.839, 7.366, 8.062, 9.108, 10.512, 12.00],
[0, 0.794, 1.176, 1.557, 2.320, 3.162, 3.989, 4.767, 6.372, 7.183, 7.564, 7.930, 8.756, 9.567, 10.361, 11.156],
[0, 0.678, 1.100, 1.577, 2.383, 3.209, 4.822, 5.152, 6.381, 7.133, 7.591, 7.976, 8.783, 9.572, 11.167, 12.762]  ]

//预读器（新建函数用来读取上传的视频）
function emotionToVersion(emotion) {
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

function isSame(oldVersion, newVersion) {
    return false
}

function videoSelect(version) {
    //let pos = musicGetPos()
    //播放相应版本的音乐
    //console.log('startTime=' + pos)
    let video
    if (version == 1) {
        video = vidNeutral
    }
    else if (version == 2) {
        video = vidHappy1
    }
    else if (version == 3) {
        video = vidHappy2
    }
    else if (version == 4) {
        video = vidHappy3
    }
    else if (version == 5) {
        video = vidSad1
    }
    else if (version == 6) {
        video = vidSad2
    }
    else if (version == 7) {
        video = vidSad3
    }
    else if (version == 8) {
        video = vidAngry1
    }
    else if (version == 9) {
        video = vidAngry2
    }
    else if (version == 10) {
        video = vidFear1
    }
    else if (version == 11) {
        video = vidFear2
    }
    else if (version == 12) {
        video = vidFear3
    }
    else {
        console.log('error')
        console.log(version)
    }
    return video
}

function expressionRecognize(detections) {
    let emotion
    if (detections && detections.length > 0) {
        let exp = Object.entries(detections[0].expressions)

        let expSorted = exp.sort((a, b) => {
            return b[1] - a[1]
        })
        emotions = expSorted.slice(0, 3)
        if (emotions[0][0] == 'neutral' && emotions[0][1] < 0.95)
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

function videoPlay(version) {
    let video = videoSelect(version)

    let tonic = 0
    //判断version是在哪个情绪版本的区间内
    let lastVZone,VZone=0
    if (lastVersion==1) 
        lastVZone=1
    else if (lastVersion>1&&lastVersion<=4)
        lastVZone=2
    else if (lastVersion>4&&lastVersion<=7)
        lastVZone=3   
    else if (lastVersion>7&&lastVersion<=9)
        lastVZone=4
    else if (lastVersion>9&&lastVersion<=12)
        lastVZone=5

    if (version==1) 
        VZone=1
    else if (version>1&&version<=4)
        VZone=2
    else if (version>4&&version<=7)
        VZone=3   
    else if (version>7&&version<=9)
        VZone=4
    else if (version>9&&version<=12)
        VZone=5
    if (oldVideo) pos = oldVideo.currentTime
    //console.log(pos)
    if (currentVideo) oldVideo = currentVideo
    currentVideo = video
    currentVideo.style.zIndex = 10
    oldVideo.style.zIndex = -1

    if (lastVZone == VZone)
    {
        pos = pos
        console.log('!!!!!!!!!!!')
    }
    else
    {
        var musicTemp = [].concat(music16MidPos[lastVZone-1])
        musicTemp.push(pos)
        musicTemp.sort()
        tonic=musicTemp.indexOf(pos)
        pos = music16MidPos[VZone-1][(tonic+1)%16]
    }
    currentVideo.currentTime = pos

    //for (vid of allVideo)
    //    if (!vid.paused) vid.pause()
    if (!oldVideo.paused) oldVideo.pause()

    currentVideo.play()

    if (isSame()) {
        const volume = { val: 0 } // Start at (0, 0)
        const tween = new TWEEN.Tween(volume) // Create a new tween that modifies 'coords'.
            .to({ val: 1 }, 1000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .onUpdate(() => {
                currentVideo.volume = volume.val
                currentVideo.style.opacity = volume.val
            })
            .start()

        const volume2 = { val: 1 } // Start at (0, 0)
        const tween2 = new TWEEN.Tween(volume2) // Create a new tween that modifies 'coords'.
            .to({ val: 0 }, 1000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .onUpdate(() => {
                if (oldVideo) oldVideo.volume = volume2.val
                if (oldVideo) oldVideo.style.opacity = volume.val
            })
            .onComplete(() => {
                setTimeout(() => {
                    if (oldVideo) oldVideo.pause()
                }, 1000);
            })
            .start()
    } else {
        currentVideo.volume = 1
        currentVideo.style.opacity = 1
        setTimeout(() => {
            if (oldVideo) oldVideo.volume = 0
            if (oldVideo) oldVideo.style.opacity = 0
            if (oldVideo) oldVideo.pause()
        }, 300);
    }

}

function detect() {
    setInterval(async () => {
        console.log('新的一轮!')
        detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.5 })).withFaceExpressions()
        emotion = expressionRecognize(detections)
        version = emotionToVersion(emotion)

        let emoType = document.querySelector('#emotionType')
        let emoValue = document.querySelector('#emotionValue')

        if (version==1)
            emoType.innerHTML = 'Neutral'
        else if (version>1&&version<=4)
            emoType.innerHTML = 'Happy'
        else if (version>4&&version<=7)
            emoType.innerHTML = 'Sad'
        else if (version>7&&version<=9)
            emoType.innerHTML = 'Angry'
        else if (version>9&&version<=12)
            emoType.innerHTML = 'Fearful'
        else
            emoType.innerHTML = '(☉_☉)'
        
        if(emotion === 'error'){
            emoValue.innerHTML = ':D'
        }else{
            emoValue.innerHTML = emotion[1].toFixed(2)*100 + '%'
        }

        //打印
        //if (emotion[0] != 'neutral' && emotion != 'error')
        console.log(emotion)
        console.log(version)
        if (lastVersion == 0) { //首次播放
            videoPlay(version)
        }
        else if (lastVersion == version) {
        }
        else
        {
            videoPlay(version)
        }
        //console.log(lastVersion)
        //console.log(version)
        lastVersion = version
    }, 2100)
}

window.onload = () => {
    [vidNeutral, vidHappy1, vidHappy2, vidHappy3, vidSad1, vidSad2, vidSad3, vidAngry1, vidAngry2, vidFear1, vidFear2, vidFear3] =
        [
            document.querySelector('#videoN'),
            document.querySelector('#videoH1'),
            document.querySelector('#videoH2'),
            document.querySelector('#videoH3'),
            document.querySelector('#videoS1'),
            document.querySelector('#videoS2'),
            document.querySelector('#videoS3'),
            document.querySelector('#videoA1'),
            document.querySelector('#videoA2'),
            document.querySelector('#videoF1'),
            document.querySelector('#videoF2'),
            document.querySelector('#videoF3'),
        ]
    allVideo = [vidNeutral, vidHappy1, vidHappy2, vidHappy3, vidSad1, vidSad2, vidSad3, vidAngry1, vidAngry2, vidFear1, vidFear2, vidFear3]

    // let video1 = document.querySelector('#video1')
    // video1.currentTime = 3
    // video1.volume = 0

    // let video2 = document.querySelector('#video2')
    // video2.currentTime = 3
    // video2.volume = 0

    let btn = document.querySelector('#btn1')
    let btn2 = document.querySelector('#btn2')

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream
            video.play()
        })

    Promise.all([
        faceapi.nets.tinyFaceDetector.load('./models'),
        faceapi.nets.faceExpressionNet.load('./models'),

    ]).then(() => {
        detect()
    })

    btn.addEventListener('click', function () {
        videoPlay(1)
    })
    btn2.addEventListener('click', function () {
        videoPlay(2)
    })



    // Setup the animation loop.
    function animate(time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
    }
    requestAnimationFrame(animate)
}

function setup() {
    createCanvas(1000, 1000)
}

function draw() {
    clear()
    //  image(0,0,100,100,vidNeutral)
    emotion = expressionRecognize(detections)
    if (emotion[0] != 'neutral' && emotion != 'error') {
        //通过圆的大小来表现表情强度
        let val = emotion[1]
        circle(100, 100, map(val, 0, 1, 20, 200))
    }
}
