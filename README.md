# The Shoppies
The Shoppies is a website for users to nominate up to 5 of their favorite movies.


## Installation

No Installation Required.

Web View Link: https://hennessyisrael.github.io/The-Shoppies

## Tools

`
HTML
`
`
CSS
`
`
VANILA JAVASCRIPT
`
## Usage
The Shoppies contains one Express API server at the root of the project structure, and one React app in `~/the-shoppies/client/`.

When the viewer searches for a movie, the React app calls the Express API, which calls the [OMDb API](https://www.omdbapi.com/) to find results. These results then flow in the opposite direction going through the Express API and the React app for the user to see.

After that they can nominate movies and remove them. Users can select up to 5 movies.

<img width="1280" alt="Screen Shot 2020-09-08 at 5 08 32 AM" src="https://user-images.githubusercontent.com/10281272/92456770-5cefe900-f191-11ea-90a7-6c56d099dbfe.png">


## License
[MIT](https://choosealicense.com/licenses/mit/)
