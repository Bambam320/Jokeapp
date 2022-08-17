# Joke Search App

This is a single page application that allows the user to search for jokes based on several filters
including category, style, flags, text and quantity. There is a search bar that takes keywords and returns
jokes that contain text that matches. The user can save their favorite jokes in a folder
and the contents of the folder can be viewed or deleted or deleted.

## Installation

The app is a single HTML page. It is accessible through a local browser and the user data is established
on a local JSON file using relative paths. After cloning the repository, open the index.html file and
enjoy.

## Usage

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

# <Joke Search App>

## Description

A list describing some of the operations of, ideas used and motivations for this SPA.

- The first main motivation I had required spending some time researching API's to find the right one that I wanted to use. The JokeAPI was chosen because it fit the criteria of complexity I wanted for my project. The use of several filters for the joke search provided the right technical difficulty needed to build requests that I was aiming for.
- The use of a JSON server is the second motivation. I wanted to include all the HTTP verbs in this assignment which required a local server. Users are able to interact with a local server to delete, create, change and retrieve data.
- This SPA uses all of the information I've recently learned in Phase 1 and bringing it all together on an interactive page was the best learning experience so far.
- What problem does it solve?
- What did you learn?

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.

## Usage

Provide instructions and examples for use. Include screenshots as needed.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ```

## Credits

List your collaborators, if any, with links to their GitHub profiles.

If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

If you followed tutorials, include links to those here as well.

## License

![](LICENSE.txt)

## Badges

![](https://img.shields.io/github/commit-activity/w/Bambam320/phase-1-github-search-app)

## Features

1. Search for jokes based on 6 categories, 2 styles, 6 flags, up to 7 quantities and any search term.
2. Save an individual joke or all jokes into a favorites folder.
3. Delete an individual joke or all jokes from the favorites folder.
4. Remove an individual joke or all jokes from the page.
5. Use the option to clear jokes on the page before loading favorites or searching for new jokes.
6. Display jokes from favorites folder onto the page.