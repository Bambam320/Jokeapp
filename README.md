# Joke Search App

This is a single page application that allows the user to search for jokes based on several filters
including category, style, flags, text and quantity. There is a search bar that takes keywords and returns
jokes that contain text that matches. The user can save their favorite jokes in a folder
and the contents of the folder can be viewed or deleted or deleted.

## Table of Contents

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- 
## Installation

The app is a single HTML page. It is accessible through a local browser and the user data is established
on a local JSON file using relative paths. After cloning the repository, open the index.html file and
enjoy.

Clone the repo [from Github here](https://github.com/Bambam320/phase-1-jokeapp-project)

## Usage

The SPA's functions are described below with imagery and code to best demonstrate their use.

![Joke Search Menu](images/Search menu.png)

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ```

## Description

- The JokeAPI was chosen because it fit the criteria of complexity I wanted for this project as it is my first one. The use of several filters for the joke search provided the right technical difficulty I wanted to aim for.
- The use of a JSON server is a challenge I decided to pursue because of the additional methods of deleting and posting I could use. I wanted to include some of the HTTP verbs in this assignment which required a local server. Users are able to interact with a local server to delete, create and display jokes.
- This SPA uses all of the information I've recently learned in Phase 1 and bringing it all together on an interactive page was the best learning experience so far.
- Some important concepts I learned during this project:
    - How to create a README file, there is alot involved with it and even has its own language.
    - How to break down something large into steps that are necessary for the process of building such an interactive SPA.
    - How github is used to collect, display and store the projects files and information.
    - Using the same 3 index files; .js, .css, .html to control everything a user interacts with on a website while sending and receiving information from many different sources.
    - The JavaScript language offers so many options for writing the same thing that based on each application with the same function, the code can be written in vastly different ways. While writing this code, I was able to visualize different options for doing the same thing. This allowed me to understand DRY code from the writers perspective and not only the readers.

## Instructional GIF

![](https://media.giphy.com/media/iEVHoQiil5rvuyAF43/giphy.gif) 
***Searching and Saving***

![](https://media.giphy.com/media/Cei4BQea2ESoRs12PI/giphy.gif)
***Manipulating Favorites***

## Video Describing Functionality

[![Watch the video](https://i.imgur.com/tFpeM1l.png)](https://youtu.be/THSd4kodg4E)

## Credits

This project uses the free API from [Joke API by sv443](https://sv443.net/jokeapi/v2/#info)

## License

MIT License

Copyright (c) 2022 Igor M.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, 
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is 
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice (including the next paragraph) shall 
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Badges

![](https://img.shields.io/github/commit-activity/w/Bambam320/phase-1-jokeapp-project)

## Features

1. Search for jokes based on 6 categories, 2 styles, 6 flags, up to 7 quantities and any search term.
2. Save an individual joke or all jokes into a favorites folder.
3. Delete an individual joke or all jokes from the favorites folder.
4. Remove an individual joke or all jokes from the page.
5. Use the option to clear jokes on the page before loading favorites or searching for new jokes.
6. Display jokes from favorites folder onto the page.