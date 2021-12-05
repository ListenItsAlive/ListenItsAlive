window.onload = () => {
    let currentVideo, oldVideo

    let video1 = document.querySelector('#video1')
    video1.currentTime = 3
    video1.volume = 0


    let video2 = document.querySelector('#video2')
    video2.currentTime = 3
    video2.volume = 0

    let btn = document.querySelector('#btn1')
    let btn2 = document.querySelector('#btn2')

    btn.addEventListener('click', function () {
        playVideo(1)
    })
    btn2.addEventListener('click', function () {
        playVideo(2)
    })

    function playVideo(versioo) {
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