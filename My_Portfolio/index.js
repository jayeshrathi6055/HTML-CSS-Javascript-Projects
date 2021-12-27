let aboutMe = document.getElementById("aboutMe");
let len = aboutMe.innerText.length
let skills = ['an Electrical Engineer', 'a Full Stack Developer']
let index = 0;
let stirngIndex = 1;

setInterval(()=>{
    const strDecrement = setInterval(()=>{
        len = aboutMe.innerText.length;
        if(len==0){
            stirngIndex = 1;
            index++;
            if(index == skills.length){
                index = 0;
            }
            clearInterval(strDecrement);
        }else{
            aboutMe.innerText = stirngDecrement(aboutMe.innerText);
        }
    },50);
},4500);

setInterval(()=>{
    if(len==0){
        aboutMe.innerText = stirngIncrement();
    }
},40)

function stirngDecrement(text) {
    return text.slice(0, text.length - 1)
}
function stirngIncrement() {
let val = skills[index].slice(0,stirngIndex);
stirngIndex++;
    return val;
}