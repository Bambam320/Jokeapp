document.querySelector('#main-search').addEventListener('click', (e) => {
  e.preventDefault()
  //console.log(e)

  const jokeServer = 'https://v2.jokeapi.dev/joke/'
  const category = function() {
    let categorySelector = Object.entries(document.getElementsByName('category'))
    let selectedCategory = categorySelector.reduce((accum, val) => {
      console.log(val)
    })
    console.log(selectedCategory)
  }
  // Programming,Miscellaneous,Dark,Pun,Spooky,Christmas
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
  const amount = `amount=${e.target.parentElement.childNodes[23].value}`
  
  // console.log(category())
  // console.log(`${jokeServer}${category()}${style()}${amount}`)
  // fetch(`${jokeServer}${category()}${style()}${amount}`)
  //   .then(res => res.json())
  //   .then(data => amount.charAt(7) === '1' ? postListing(data) : postListings(data.jokes))
  //   .catch(error => alert(error.message))
})

function postListing(listing) {
  console.log(listing)
}

function postListings(listings) {
  console.log(listings)
}

function createJokeBlock() {
  let jokeContainer = document.createElement('span')
  let jokeSetup = document.createElement('h3')
  let 
}