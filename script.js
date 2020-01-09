'use strict';

// Hit GitHub Api with the search term / username the user enters
function getGithubRepos(username){
    const url = `https://api.github.com/users/${username}/repos`;
    const options = {
        headers: new Headers({
          Accept: "application/vnd.github.nebula-preview+json"
        })
    };
    console.log(`Finding repos for ${username}`);

    fetch(url, options)
    .then(response => {
        if(response.ok) {
            return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            $('#js-error-message').text(`Boo! Something went wrong: ${error.message}`)
            console.log(error);
        });
     }

// Display a list of repos that return for the username entered
function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    responseJson.forEach(obj => {
        $('#results-list').append(
            `<li><h3><a href="${obj.url}">${obj.name}</a></h3></li>`)
        });
        $('#results').removeClass("hidden");   
};

// Event listener to watch the form when a user hits the submit button. Also clears out any previous results
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const username = $('#js-search-term').val();
        getGithubRepos(username);
    });
}

// Function to start the functions once the submit button on the form is clicked
function startFunctions() {
  watchForm();
}

startFunctions();