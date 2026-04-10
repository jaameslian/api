document.addEventListener("DOMContentLoaded", () => {
    start_time = Date.now();


    console.log(start_time);

    setInterval(() => {
        updateTimer(start_time);
    }, 1000)

})

function updateTimer(start_time) {
    now = Date.now();

    elasped_time = now - start_time;

    seconds = Math.floor(elasped_time / 1000);
    minutes = Math .floor(seconds / 60);
    hours = Math.floor(minutes/60);

    seconds%=60;
    minutes%=60;

    document.getElementById("time-elasped").innerText = hours.toString().padStart(2,'0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

    // console.log("" + hour + ":" + minutes + ":" + seconds);


}