const video = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip')
const snap = document.querySelector('.snap')


function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream)
            try{
                video.srcObject = localMediaStream
            }catch(e){
                video.src = window.URL.createObjectURL(localMediaStream)
            }
            video.play()
        })
        .catch(err => {
            console.error('error : ', err)
        })
}


getVideo()

function redEffect(pixels){
    for(let i =0; i<pixels.data.length; i+=4){
        pixels[i+0] = pixels[i+0] + 100
        pixels[i+1] = pixels[i+1] - 50
        pixels[i+2] = pixels[i+0] * 0.5
    }
    return pixels
}

function rgbSplit(pixels){
    for(let i =0; i<pixels.data.length; i+=4){
        pixels[i-150] = pixels[i+0] 
        pixels[i+100] = pixels[i+1] 
        pixels[i-150] = pixels[i+0]
    }
    return pixels
}



function paintToVideo(){
    const width = 200
    const height = 150
    canvas.width = width
    canvas.height = height
    console.log(width, height, video)

    return setInterval(()=>{
        ctx.drawImage(video, 0, 0, width, height)
        let pixels = ctx.getImageData(0,0, width, height)
        pixels = rgbSplit(pixels)
        ctx.putImageData(pixels, 0, 0)
    }, 16)
}

video.addEventListener('canplay', paintToVideo)

function takePhoto(){
    //sounds
    snap.currentTime = 0
    snap.play()

    //get the data out
    const data = canvas.toDataURL('image/jpeg')
    const link = document.createElement('a')
    link.href = data
    link.setAttribute('download', 'screenshot')
    link.innerHTML =`<img src=${data} alt="screenshot"></img>`
    strip.insertBefore(link, strip.firstChild)
}


