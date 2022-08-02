document.querySelector('#main-search').addEventListener('click', (e) => {
  e.preventDefault()
  console.log(e)

  const jokeServer = 'https://v2.jokeapi.dev/joke/Any'

  fetch(`${jokeServer}${amount}`)
    .then(res => res.json())
    .then(data => postListings(data))
    .catch(error => alert(error.message))
})

function postListings(listings) {
  for (const listing of listings) {
    console.log(listing)
  }
}