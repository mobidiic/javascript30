let countdown
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')
const form = document.querySelector('#custom')

function timer(seconds){
    clearInterval(countdown)
    const now = Date.now()
    const then = now + seconds*1000
    countdown = setInterval(()=>{
        const secondLeft = Math.round((then - Date.now())/1000)
        if(secondLeft < 0){
            clearInterval(countdown)
            return
        }
        displayTimeLeft(secondLeft)
    }, 1000)
    displayEndTime(then)
}


function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds/60)
    let second = seconds % 60
    let display = `${minutes}:${second<10 ? '0'+second : second}`
    timerDisplay.textContent = display
    document.title = display
}


function displayEndTime(timestamp){
    const end = new Date(timestamp)
    const hours = end.getHours()
    const minutes = end.getMinutes()
    endTime.textContent = `Be Back at ${hours}:${minutes}`
}

function startTimer(){
    const seconds = parseInt(this.dataset.time)
    timer(seconds)
}


buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e){
    e.preventDefault()
    const mins = this.minutes.value
    timer(mins * 60)
    this.reset()
})