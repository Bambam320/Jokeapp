let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// const toyFormContainer = document.querySelector(".container");
// toyFormContainer.style.display = "block";

//Listen for DOM load and return toys
document.addEventListener('DOMContentLoaded', fetchToyData())
function fetchToyData(){
  const toyServer = 'http://localhost:3000/toys'
  fetch(toyServer)
    .then(res => res.json())
    .then(data => {
      postToys(data)})
    .catch(error => document.body.append(error.message))
}

//Iterate over toys fetched, then fill and post cards
function postToys(toyData) {
  for (const toy of toyData) {
    const toyCard = document.createElement('div')
    toyCard.className = 'card'
    toyCard.id = toy.id
    toyCard.setAttribute('data-num', `${toy.id.toString()}`)
    const toyName = document.createElement('h2')
    toyName.textContent = toy.name
    const toyImg = document.createElement('img')
    toyImg.src = toy.image
    toyImg.className = 'toy-avatar'
    const toyLikes = document.createElement('p')
    toyLikes.textContent = `${toy.likes} likes`
    const toyLikeButton = document.createElement('button')
    toyLikeButton.className = 'like-btn'
    toyLikeButton.textContent = 'Like ❤️'
    toyLikeButton.addEventListener('click', (e) => updateLikes(e))
    toyCard.append(toyName,toyImg,toyLikes,toyLikeButton)
    document.querySelector('#toy-collection').appendChild(toyCard)
  }
}

//post new toy and create new card for it
const createToyForm = document.querySelector('.add-toy-form')
createToyForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const toyServer = 'http://localhost:3000/toys'
  const postToyData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'name': `${e.target.children[1].value}`,
      'image': `${e.target.children[3].value}`,
      'likes': 0
    })
  }
  fetch(toyServer, postToyData)
  .then(res => res.json())
  .then(data => {
    postAnotherToy(data)})
  .catch(error => console.log(error))
})

function postAnotherToy(toy) {
  const toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.id = toy.id
  toyCard.setAttribute('data-num', `${toy.id.toString()}`)
  const toyName = document.createElement('h2')
  toyName.textContent = toy.name
  const toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.className = 'toy-avatar'
  const toyLikes = document.createElement('p')
  toyLikes.textContent = `${toy.likes} likes`
  const toyLikeButton = document.createElement('button')
  toyLikeButton.className = 'like-btn'
  toyLikeButton.textContent = 'Like ❤️'
  toyLikeButton.addEventListener('click', (e) => updateLikes(e))
  toyCard.append(toyName,toyImg,toyLikes,toyLikeButton)
  document.querySelector('#toy-collection').appendChild(toyCard)
}
//------------------------------------

// Like button listener to increment likes and post
function updateLikes(like) {
  const toyServer = 'http://localhost:3000/toys'
  const currentLikes = like.composedPath()[0].previousSibling.textContent.replace(" likes", "")
  //debugger
  const currentId = parseInt(like.target.parentElement.id, 10)
  newLikeCount = parseInt(currentLikes, 10) + 1
  const updateLikes = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'likes': newLikeCount
    })
  }
  fetch(`${toyServer}/${currentId}`, updateLikes)
    .then(res => res.json())
    .then(data => updateToyLikes(data))
    .catch(error => alert(error.message))
}

function updateToyLikes(likedToy) {
  const cardToUpdate = document.querySelector(`[data-num="${likedToy.id}"]`)
  cardToUpdate.childNodes[2].textContent = `${likedToy.likes} likes`
}
//typeof(likedToy.id) = number
//
