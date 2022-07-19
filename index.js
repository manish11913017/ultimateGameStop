// A $( document ).ready() block.
$(document).ready(function() {
    
    const topSection = ["Console", "andriod", "pc-text", "apple-devices"]; 
    // for(var i=0; i<4; i++){
    //     document.getElementById("topSection")[i] = function(){
    //         if(topSection[i] == "Console"){
    //             alert("Console");
    //         }
    //         else if(topSection[i] == "andriod"){
    //             alert("andriod");
    //         }
    //         else if(topSection[i] == "pc-text"){
    //             alert("pc-text");
    //         }
    //         else if(topSection[i] == "apple-devices"){
    //             alert("apple-devices");
    //         }
    //     }
    // }

    // 
    const userCardTemplate = document.querySelector("[data-user-template]")
    const userCardContainer = document.querySelector("[data-user-cards-container]")
    const searchInput = document.querySelector("[data-search]")

    let users = []

    searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
        const isVisible =
        user.title.toLowerCase().includes(value) ||
        user.platform.toLowerCase().includes(value)
        user.element.classList.toggle("hide", !isVisible)
    })
    })

    fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json")
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
        const card = userCardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")
        header.textContent = user.title
        body.textContent = user.platform
        userCardContainer.append(card)
        return { title: user.title, platform: user.platform, element: card }
        })
    })

});