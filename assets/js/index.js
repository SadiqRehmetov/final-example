let iframeDiv = document.querySelector(".iframe")
let closeIframe = document.querySelector(".iframe-close")
let playIframe = document.querySelector(".play-iframe")
playIframe.addEventListener("click", ()=>{
    iframeDiv.style.display="flex";
})
closeIframe.addEventListener("click",()=>{
    iframeDiv.style.display="none";
})