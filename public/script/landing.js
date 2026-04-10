import * as utilities from '/api/src/script/utilities.js';

document.addEventListener("DOMContentLoaded", () => {
    
    const body = document.getElementById("outer-container")
    const bounds = body.getBoundingClientRect();
    console.log(bounds.top, bounds.bottom, bounds.left, bounds.right);

    for (var i = 0; i < 250; i++) {
        var star = CreateStar(bounds.top, bounds.bottom, bounds.left, bounds.right);
        body.appendChild(star);
    }
})

function CreateStar() {
    var star = document.createElement("div");
    const kStarSize = utilities.random(1,3);
    star.classList.add("star")
    star.style.left = utilities.random(0, document.body.clientWidth - kStarSize) + "px";
    star.style.top = utilities.random(0, document.body.clientHeight - kStarSize) + "px";
    star.style.width = kStarSize + "px";
    star.style.height = kStarSize + "px";
    star.style.opacity = "" + (utilities.random(0, 75)*(1/100));

    setInterval(() => {
        star.classList.add("sparkle");
    }, utilities.random(0,10) * 1000)

    return star;
}