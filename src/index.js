//event listener for search, builds URL for fetch based on selection
document.querySelector('#main-search').addEventListener('click', (e) => {
  e.preventDefault()
  //clear jokes before displaying new ones
  if (document.getElementById('clear_submit').checked === true) {
    removeAll()
  }
  // adding joke selection information to variables
  const jokeServer = 'https://v2.jokeapi.dev/joke/'
  const category = function() {
    let categorySelections = Object.entries(document.getElementsByName('category'))
    let selectedCategories = categorySelections.reduce(function(accum, val) {
      return accum += val[1].checked === true ? `${val[1].id},` : ''
    }, '')
    return selectedCategories != '' ? `${selectedCategories.slice(0,-1)}?` : selectedCategories
  }
  const flags = function() {
    let flagSelections = Object.entries(document.getElementsByName('flags'))
    let selectedFlags = flagSelections.reduce(function(accum, val) {
      return accum += val[1].checked === true ? `${val[1].id},` : ''
    }, '')
    return selectedFlags != '' ? `blacklistFlags=${selectedFlags.slice(0,-1)}&` : selectedFlags
  }
  const style = function() {
    let styleSelector = Object.entries(document.getElementsByName('style'))
    let selectedStyle = styleSelector.find(element => element[1].checked == true)
    if (selectedStyle[1].id === 'doublestyle') {
      return 'type=twopart&'
    } else if (selectedStyle[1].id === 'singlestyle') {
      return 'type=single&'
    } else {
      return ''
    }
  }
  const searchText = document.getElementById('search-text').value
  const searchField = `contains=${searchText.replace(/ /g, '%20')}&`
  const amount = `amount=${e.target.parentElement.childNodes[23].value}`
  //fetching the jokes from the api by interpolating the variables for joke selection
  console.log(`${jokeServer}${category() === '' ? 'Any?' : category()}${flags()}${style()}${searchText != '' ? searchField : ''}${amount}`)
  fetch(`${jokeServer}${category() === '' ? 'Any?' : category()}${flags()}${style()}${searchText != '' ? searchField : ''}${amount}`)
    .then(res => res.json())
    .then(data => amount.charAt(7) === '1' ? postListing(data) : postListings(data.jokes))
    .catch(error => alert(error.message))
})

//posts a single listing to the page
function postListing(listing) {
  if (listing.error === true) {
    return alert('No Matching Jokes Found')
  } else if(listing.error === false || listing.id != NaN) {
    jokeListBuilder(listing)
  }
}

//posts multiple listings to the page
function postListings(listings) {
  if (listings === undefined) {
    return alert('No Matching Jokes Found')
  } else {
    for (const listing of listings) {
      postListing(listing)
    }
  }
}

//takes a listing and builds a joke card and adds it the page
function jokeListBuilder(listing) {
  //creating new elements for posting the jokes
  let jokeContainer = document.createElement('span')
  let joke = document.createElement('b')
  let setup = document.createElement('b')
  let delivery = document.createElement('b')
  let lineBreak = document.createElement('br')
  let category = document.createElement('p')
  let id = document.createElement('p')
  let flags = document.createElement('ul')
  let saveButton = document.createElement('button')
  let removeButton = document.createElement('button')
  let deleteButton = document.createElement('button')
  let jokeList = document.querySelector('.listing')
  //applying classes and filling new elements with appropriate information
  jokeContainer.className = 'joke-card'
  const appliedFlags = function() {
    return Object.entries(listing.flags).reduce(function(accum, val) {
      return accum += val[1] === true ? `${val[0]}, ` : '' 
    }, '')
  }
  flags.textContent = `Flags Applied : ${appliedFlags() != '' ? appliedFlags().slice(0,-2) : 'none'}`
  joke.textContent = listing.joke
  setup.textContent = listing.setup
  delivery.textContent = listing.delivery
  category.textContent = `Category : ${listing.category}`
  category.className = 'cat'
  id.textContent = `Joke Id : ${listing.id}`
  id.id = listing.id
  id.className = 'jokeID'
  saveButton.textContent = 'Save This Joke!'
  saveButton.addEventListener('click', (e) => {
    saveThisJoke(e)
  })
  removeButton.textContent = 'Remove This Joke!'
  removeButton.addEventListener('click', (e) => {
    removeThisJoke(e)
  })
  deleteButton.textContent = 'Delete This Joke From Favorites!'
  deleteButton.addEventListener('click', (e) => {
    deleteThisJoke(e)
  })
  //appending the elements to the main container based on joke type
  jokeList.appendChild(jokeContainer)
  switch(true) {
    case listing.type === 'single' && listing.local === undefined:
    jokeContainer.append(joke, category, id, flags, saveButton, removeButton)
    break;
    case listing.type === 'twopart' && listing.local === undefined:
    jokeContainer.append(setup, lineBreak, delivery, category, id, flags, saveButton, removeButton)
    break;
    case listing.type === 'single' && listing.local === true:
    jokeContainer.append(joke, category, id, flags, saveButton, removeButton, deleteButton)
    break;
    case listing.local === 'twopart' && listing.local === true:
    jokeContainer.append(setup, lineBreak, delivery, category, id, flags, saveButton, removeButton, deleteButton)
    break;
  }
}

//listens for remove all button and uses remove all function
document.querySelector('#remove_all_jokes').addEventListener('click', (e) => {
  e.preventDefault()
  removeAll()
}) 

//removes all jokes from the page
const removeAll = function() {
  const container = document.querySelector('.listing')
  while(container.firstChild) {
    container.removeChild(container.firstChild)
  }
}

//removes a single joke from the page
function removeThisJoke(joke) {
  joke.target.parentElement.remove()
}

//deletes a joke from the local server
function deleteThisJoke(joke) {
  fetch(`http://localhost:3000/Favorites/${joke.target.parentElement.querySelector('.jokeID').id}`, {method: 'DELETE'})
  .then(res => res.json())
  .then(data => joke.target.parentElement.remove())
}

//iterates through jokes in favorites and passes them through function that deletes them
document.querySelector('#delete_all_saved_jokes').addEventListener('click', (e) => {
  e.preventDefault()
  fetch('http://localhost:3000/Favorites')
  .then(res => res.json())
  .then(data => deleteAllJokes(data))
})

//deletes all jokes from the json server
function deleteAllJokes(jokes) {
  for (const joke of jokes) {
    fetch(`http://localhost:3000/Favorites/${joke.id}`, {method: 'DELETE'})
    .then(res => res.json())
  }
  alert('All jokes have been deleted from the favorites folder!'))
}

//saves a joke to the favorites folder
function saveThisJoke(joke) {
  const myJokesFolder = 'http://localhost:3000/Favorites'
  const addJoke = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'joke_id': `${joke.target.parentElement.querySelector('.jokeID').id}`,
      'id' : `${joke.target.parentElement.querySelector('.jokeID').id}`,
      'joke': `${joke.target.parentElement.querySelector('.cat').textContent.slice(11)}`,
    })
  }
  fetch(myJokesFolder, addJoke)
    .then(res => res.json())
    .then(data => (data))
    .catch(error => alert('This joke has already been saved'))
}

//Saves all jokes to favorites folder
document.querySelector('#save_all_jokes').addEventListener('click', (e) => {
  e.preventDefault()
  let jokeArray = document.getElementsByClassName('joke-card')
  for (const joke of jokeArray) {
    const myJokesFolder = 'http://localhost:3000/Favorites'
    const addJoke = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        'joke_id': `${joke.querySelector('.jokeID').id}`,
        'id' : `${joke.querySelector('.jokeID').id}`,
        'joke': `${joke.querySelector('.cat').textContent.slice(11)}`,
      })
    }
    fetch(myJokesFolder, addJoke)
      .then(res => res.json())
      .then(data => (data))
      .catch(error => alert('This joke has already been saved'))
  }
})

//Listen for favorites folder request and pass jokes to lister function
document.querySelector('#favorite_button').addEventListener('click', (e) => {
  e.preventDefault()
  fetch('http://localhost:3000/Favorites')
    .then(res => res.json())
    .then(data => listFavorites(data))
    .catch(error => alert(error))
})

//iterate over the jokes on the local server and request each joke from the API then pass to function for modification
function listFavorites(jokes) {
  if (jokes.length === 0) {
    alert('No jokes are stored in the Favorites Folder')
  } else {
    for (const joke of jokes) {
      fetch(`https://v2.jokeapi.dev/joke/Any?idRange=${joke.joke_id}`)
      .then(res => res.json())
      .then(data => modifyAndPostListing(data))
    }  
  }
}

//add a key value pair to the joke then pass to postListing function which will add a delete button because its a saved joke
function modifyAndPostListing(jokes) {
  jokes.local = true
  postListing(jokes)
}