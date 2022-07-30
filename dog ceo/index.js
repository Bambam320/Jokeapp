//console.log('%c HI', 'color: firebrick')

//listen for Dom and perform fetch of required URL's
document.addEventListener('DOMContentLoaded', () => {
    fetchWoof()
    document.querySelector('#breed-dropdown').addEventListener('change', (event) => {
        const doggies = document.querySelector('#dog-breeds').getElementsByTagName('li')
        Array.from(doggies).forEach((e) => {
            if (event.target.value === 'a' && e.id.charAt(0) === 'a') {
                e.hidden = false
            } else if (event.target.value === 'b' && e.id.charAt(0) === 'b') {
                e.hidden = false 
            } else if (event.target.value === 'c' && e.id.charAt(0) === 'c') {
                e.hidden = false
            } else if (event.target.value === 'd' && e.id.charAt(0) === 'd') {
                e.hidden = false
            } else {e.hidden = true}
        })
    })


});
    
function fetchWoof () {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'    
    Promise.all([
        fetch(imgUrl).then(res => res.json()).then(data => loadImages(data.message)),
        fetch(breedUrl).then(res => res.json()).then(data => loadBreeds(data.message))
    ]).then(values => values)
}

//allocate pictures per requirements
function loadImages(images) {
    //debugger
    images.forEach((e) => {
        const imgBlock = document.querySelector('#dog-image-container')
        const newImg = document.createElement('img') 
        newImg.src = e
        imgBlock.appendChild(newImg)
    })
}

// allocate breeds per requirements and change color of text wen clicked
function loadBreeds(breeds) {
    //    debugger
    for (const breed in breeds) {
        const breedList = document.querySelector('#dog-breeds')
        const newBreed = document.createElement('li')
        newBreed.id = breed
        newBreed.textContent = breed
        newBreed.style.cursor = 'pointer';
        breedList.appendChild(newBreed)
    }
    document.querySelector('#dog-breeds').addEventListener('click', (e) => {
        e.target.style.color = '#5A82EF'
        e.target.style.fontSize = '25px'
        e.target.style.textTransform = 'uppercase'
    })
}