function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

let mainCard = document.getElementsByClassName("main_card")[0]
let data = [
    {
        name: "js",
        img: "https://www.citypng.com/public/uploads/preview/js-javascript-round-logo-icon-png-11662226392lsrrajcm0y.png"
    },
    {
        name: "html",
        img: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_1280.png"
    },
    {
        name: "css",
        img: "https://cdn.mos.cms.futurecdn.net/Vp9WvV7YKdH4k8sKRePcE8.jpg"
    },
    {
        name: "python",
        img: "https://www.freecodecamp.org/news/content/images/2020/05/Python-language.png"
    },
    {
        name: "jquery",
        img: "https://uploads.sitepoint.com/wp-content/uploads/2016/07/1469747664Fotolia_81411059_Subscription_Monthly_M.jpg"
    },
    {
        name: "sql",
        img: "https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2019/07/image2-1.png?fit=600%2C315&ssl=1"
    }
]
data = data.concat(data)
data = shuffle(data)

data.forEach((element) => {
    let card = document.createElement("div")
    let cardChild = document.createElement("div")
    card.classList.add("card")
    cardChild.classList.add("card_child")
    card.dataset.name = element.name
    card.style.backgroundImage = `url("${element.img}")`
    mainCard.appendChild(card)
    card.appendChild(cardChild)
})

count = 0
let first = ""
let second = ""
mainCard.childNodes.forEach((element) => {
    element.addEventListener("click", () => {
        count++;
        element.childNodes[0].classList.add("flip")
        if (count === 1) {
            first = element;
        } else {
            second = element
            if (first.dataset.name === second.dataset.name) {
                setTimeout(() => {
                    first.classList.add("match_card")
                    second.classList.add("match_card")
                }, 600);
                count = 0
            } else {
                setTimeout(() => {
                    if(first.classList.contains("match_card") && second.classList.contains("match_card")) {
                        return;
                    }
                    first.childNodes[0].classList.remove("flip")
                    second.childNodes[0].classList.remove("flip")
                }, 600);
                count = 0
            }
        }

    })
})


