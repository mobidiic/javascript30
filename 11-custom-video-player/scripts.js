const video = document.getElementsByClassName('player__video viewer')[0]
const playButton = document.querySelector('.toggle.player__button')
const volumeSlider = document.getElementsByClassName('player__slider')[0]
const playbackSlider = document.getElementsByClassName('player__slider')[1]
const skipForward = document.querySelector('button[data-skip="10"]')
const skipBackward = document.querySelector('button[data-skip="-10"]')
const currentProgress = document.querySelector('.progress__filled')

console.log(document.getElementsByClassName('player__video viewer'))
console.log(document.getElementsByClassName('player__slider'))

function clickToPlay(){
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
}

function volumeSliding(){
    video.volume = this.value
}
function playbackRating(){
    video.playbackRate = this.value
}
function skipToward(time){
    if(time > 0){
        if((video.currentTime + time) > video.duration ){
            video.currentTime = video.duration
        }else{
            video.currentTime += time
        }
    }else{
        if((video.currentTime + time) < 0){
            video.currentTime = 0
        }else{
            video.currentTime += time
        }
    }
}

function currentTimeBar(){
    let currentRatio = video.currentTime / video.duration * 100
    currentProgress.style.flexBasis = `${currentRatio}%`
    currentProgress.style.width = `${currentRatio}%`
}

setInterval(currentTimeBar, 100)


video.addEventListener('click', clickToPlay)

playButton.addEventListener('click', ()=>{
    if(video.paused){
        video.play()
        playButton.innerHTML = '►'
    }else{
        video.pause()
        playButton.innerHTML = '||'
    }
})
volumeSlider.addEventListener('mousemove', volumeSliding)
playbackSlider.addEventListener('mousemove', playbackRating)
skipForward.addEventListener('click',()=>skipToward(10))
skipBackward.addEventListener('click', ()=>skipToward(-10))
document.addEventListener('keydown',(e)=>{
    if(e.keyCode == 32){
        clickToPlay()
    }
    else if(e.keyCode == 39){
        skipToward(10)
    }
    else if(e.keyCode == 37){
        skipToward(-10)
    }else if(e.keyCode == 38){
        volumeSlider.stepUp()
        volumeSliding()
    }else if(e.keyCode == 40){
        volumeSlider.stepDown()
        volumeSliding()
    }
})
