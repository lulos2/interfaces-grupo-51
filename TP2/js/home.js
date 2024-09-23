document.querySelectorAll(".card").forEach((e)=>{e.addEventListener("click",()=>{changeRoute("pdp")})})
document.querySelectorAll(".gallery-card").forEach((e)=>{e.addEventListener("click",()=>{changeRoute("pdp")})})
document.getElementById("arrow-left").addEventListener('click',(e)=>{
    let carousel = e.target.parentElement.nextElementSibling.firstElementChild
    let minX = 0;
    let maxX = (carousel.querySelectorAll(".card").length * 400) - 1200;
    console.log(carousel)
    carousel.style.transition = `1s ease`
    carousel.style.transform = `translateX(-${Math.max(carousel.dataset.scroll - 1200,minX)}px)`;
    carousel.dataset.scroll = Math.max(carousel.dataset.scroll - 400,minX)

})

document.getElementById("arrow-right").addEventListener('click',(e)=>{
    let carousel = e.target.parentElement.previousElementSibling.firstElementChild
    let minX = 0;
    let maxX = (carousel.querySelectorAll(".card").length * 420)  - 1200;
    carousel.style.transition = `1s ease`
    carousel.style.transform = `translateX(-${Math.min(Number(carousel.dataset.scroll) + 1200,maxX)}px)`;
    carousel.dataset.scroll = Math.min(Number(carousel.dataset.scroll) + 400,maxX)
})

//const baseImageGamePath =  "../TP2/media/images/games/"; //Deploy path
const baseImageGamePath = "../../TP2/media/images/games/";//Local path
document.querySelectorAll(".card img").forEach((e)=>{
    let fileName = e.src.split("/").pop()
    e.src = `${baseImageGamePath}${fileName}`;
    console.log(e.src)
});
