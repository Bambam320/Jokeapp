document.querySelector('#main-search').addEventListener('click', (e) => {
  e.preventDefault()
  //console.log(e)

  const jokeServer = 'https://v2.jokeapi.dev/joke/Any'
  const amount = `?amount=${e.target.parentElement.childNodes[23].value}`

  fetch(`${jokeServer}${amount}`)
    .then(res => res.json())
    .then(data => postListings(data.jokes))
    .catch(error => alert(error.message))
})

function postListings(listings) {
  for (const listing of listings) {
    let category = listing.category
    
    if (listing.type === 'twopart') {

    }
    console.log(listing)
  }
}