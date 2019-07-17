window.onload = () => {
    let start = document.getElementById("start")
    let audioDoom = document.getElementById("theme")

    start.onclick = () => {

        start.className = "out"
        Game.init()
        audioDoom.play()
    }
}