
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault(e)
    document.addEventListener('submit', (e) => {
        e.preventDefault(e)
        const userSearchEntry = e.target.children[0].value
        const userServer = 'https://api.github.com/search/users?q='
        fetch(`${userServer}${userSearchEntry}`)
            .then(res => res.json())
            .then(data => listUsers(data.items))
            .catch(error => alert(error.message))
    })
})

function listUsers(users) {
    for (const user of users) {
    const userCard = document.createElement('li')
    userCard.className = 'card'
    const userName = document.createElement('span')
    userName.textContent = user.login
    const userAvatar = document.createElement('img')
    userAvatar.src = user.avatar_url
    userAvatar.className = 'avatars'
    const userProfile = document.createElement('link')
    userProfile.href = user.url
    const userRepoButton = document.createElement('button')
    userRepoButton.textContent = 'See My Repo\'s'
    userRepoButton.className = 'button'
    userRepoButton.addEventListener('click', (e) => fetchRepo(e))
    userCard.append(userName,userAvatar,userProfile,userRepoButton)
    document.querySelector('#user-list').appendChild(userCard)
    }
}

function fetchRepo(user) {
    function removeAllChildNodes() {
        const parentNode = document.querySelector('#repos-list')
        while (parentNode.firstChild) {
            parentNode.removeChild(parentNode.firstChild);
        }
    }
    removeAllChildNodes()
    const repoServerLeft = 'https://api.github.com/users/'
    const repoServerRight = '/repos'
    const userName = user.target.parentElement.childNodes[0].textContent
    fetch(`${repoServerLeft}${userName}${repoServerRight}`)
        .then(res => res.json())
        .then(data => displayRepos(data))
        .catch(error => alert(error.message))
}

function displayRepos(repos) {
    for (const repo of repos) {
        const repoInfo = document.createElement('li')
        repoInfo.className = 'list'
        repoInfo.textContent = `Name: ${repo.full_name}, `
        repoInfo.insertAdjacentText('beforeend', `Id: ${repo.id}, `)
        repoInfo.insertAdjacentText('beforeend', `Size: ${repo.size}.`)
        const linkParagraph = document.createElement('p')
        const repoLink = document.createElement('a')
        repoLink.textContent = 'Click here to view the data.json'
        repoLink.href = repo.url
        linkParagraph.append(repoLink)
        repoInfo.append(linkParagraph)
        document.querySelector('#repos-list').appendChild(repoInfo)
    }
}


//Accept: application/vnd.github.v3+json