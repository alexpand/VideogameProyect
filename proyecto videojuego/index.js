window.onload = () => {
    let start = document.getElementById("start")
    let audioTheme = document.getElementById("theme")

    start.onclick = () => {

        start.className = "out"
        Game.init()
        audioTheme.play()
    }
}