//event listener for search, builds URL for fetch based on selection
document.querySelector('#main-search').addEventListener('click', (e) => {
  e.preventDefault()
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
  let jokeContainer = document.createElement('span')
  let joke = document.createElement('b')
  let setup = document.createElement('b')
  let delivery = document.createElement('b')
  let lineBreak = document.createElement('br')
  let category = document.createElement('p')
  let id = document.createElement('p')
  let flags = document.createElement('ul')
  let saveButton = document.createElement('button')
  let deleteButton = document.createElement('button')
  let jokeList = document.querySelector('.listing')
  const appliedFlags = function() {
    return Object.entries(listing.flags).reduce(function(accum, val) {
      return accum += val[1] === true ? `${val[0]}, ` : '' 
    }, '')
  }
  jokeContainer.className = 'joke-card'
  flags.textContent = `Flags Applied : ${appliedFlags() != '' ? appliedFlags().slice(0,-2) : 'none'}`
  joke.textContent = listing.joke
  setup.textContent = listing.setup
  delivery.textContent = listing.delivery
  category.textContent = `Category : ${listing.category}`
  id.textContent = `Joke Id : ${listing.id}`
  saveButton.textContent = 'Save This Joke!'
  deleteButton.textContent = 'Delete This Joke!'
  jokeList.appendChild(jokeContainer)
  if (listing.type === 'single') {
    jokeContainer.append(joke, category, id, flags, saveButton, deleteButton)
  } else {
    jokeContainer.append(setup, lineBreak, delivery, category, id, flags, saveButton, deleteButton)
  }
}

//deletes all jokes from the page
document.querySelector('#delete_all_jokes').addEventListener('click', (e) => {
  document.querySelector('.listing').removeChild()
})

//saves a joke to the favorites folder