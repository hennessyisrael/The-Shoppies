const header = document.querySelector("header");
const movies = document.querySelector("#movies");
const search = document.querySelector("#search");
const search_title = document.querySelector("#search-title");
const error_ele = document.querySelector(" .error");
const number_of_nominations = document.querySelector("#number-of-nomination");
const nominated = document.querySelector(".nominated");



// Movie Objects Data
let MoviesData = [];
//Nominations Data 
const Nominations = [];

//Load Movies Data to Html
// movies.innerHTML = "";

function movie_to_html(){
    //Sort Movies In Desc Order
    movies.innerHTML = "";
        if(MoviesData && MoviesData.length > 0){
    //  Search Result
        for (i = 0; i < MoviesData.length; i++) {
            check_if_nominated(MoviesData[i].Title);
            let movie_title =  MoviesData[i].Title
            movies.innerHTML += `
            <div class="movie">
                        <div class="content">
                            <h5>${ MoviesData[i].Title}</h5>
                            <p>Year of Release : ${ MoviesData[i].Year}</p>
                            <button ${disabled} class="nominate-btn" data-btn-title="${movie_title}" onclick='add_to_nomination(${i}, "${movie_title}", event )'>Add to Nomination</button>
                        </div>
                </div>
            `
        
        } 
        
    }
}



//Get Movies
function getMovie(moviename) {
    return fetch(`http://omdbapi.com/?i=tt3896198&apikey=7497c18&s=${moviename}&type=movie&page=9`)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }                
                response.json().then(function(data) {
                    MoviesData=data.Search;
                    movie_to_html();
                });
            }
        )
        //Log Error to console for dev analysis
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
            error_ele.innerHTML = "Movie Title Doesn't Exist, Please try searching again with the correct title";
        });
}


// Search and Display Movie Content
function searchMovie(){
    if(search.value != ''){
        getMovie(search.value);
        search_title.innerHTML = `You Search for ${search.value}`;
        movie_to_html()
       
    }
}




// Add Movie to Nominations 
function add_to_nomination(movie_id,movie_title, e){
   if(Nominations.length <= 4){
        //Check if Movie not already Nominated
    for (i = 0; i < Nominations.length; i++) {
        if(Nominations[i].title === movie_title){
            return
        }
    }
    // Push Obj To Nomination Array
   const Movie = {
        id: movie_id,
        title: movie_title,
    }

    // Push Newly Nominated Movie to the Nomination Array
    Nominations.push(Movie);

    // Display Nomionation Html
    nomination_to_html()
    
    //Check and Show banner to user
    banner_nomination_check()

    //Diasble Nomination Button
    e.target.disabled = true;
   }
 
}



//Nominatiomn data to html
function nomination_to_html(){
    nominated.innerHTML ="";
    if(Nominations){
        for (i = 0; i < Nominations.length; i++) {
            nominated.innerHTML += `
                    <div class ="nominee">
                    <span>${Nominations[i].title}</span>
                    <button class="delete" onclick="delete_nominated_movie(${Nominations[i].id})">X</button>
                    </div>
                `
        
              } 
        //Update length of Nomination 
        number_of_nominations.innerHTML = Nominations.length; 
    }
        
 }

  //Show Nominated Movies 
function show_nominations(){
    if(Nominations.length > 0 ){
        nominated.classList.toggle("hide");
    }
}

function delete_nominated_movie(id){
    nominated.innerHTML ="";
    let btnTitle ="";

    //Remove Movie For Nominations array
    for (i = 0; i < Nominations.length; i++) {
        if(Nominations[i].id === id){
            btnTitle = Nominations[i].title;
            if(!Nominations.splice(i, 1)){
                return
            }   
             
        }   
    }
    
        // Update Nomination Html
        for (i = 0; i < Nominations.length; i++) {
            nominated.innerHTML += `
                <div class ="nominee">
                    <span>${Nominations[i].title}</span>
                    <button class="delete" onclick="delete_nominated_movie(${Nominations[i].id})">X</button>
                </div>
                `
        }
      
        //Update length of Nomination 
        number_of_nominations.innerHTML = Nominations.length; 
        
        //Check and Show banner to user
         banner_nomination_check()

        const btns = document.querySelectorAll(".nominate-btn");
        for (i = 0; i < btns.length; i++) {
            if(btns[i].dataset.btnTitle == btnTitle){
                btns[i].disabled = false;
            }
        }
}



// Display a banner to the user when Nominatios Array length is up to 5
function banner_nomination_check(){
    banner = document.querySelector('.banner');
       if(Nominations.length <= 4){
            banner.classList.add('hide')
        } 
        else{
            banner.classList.remove('hide')
        }
}
let disabled  = "";
function check_if_nominated(title){
    disabled  = "";
    let check = Nominations.some( key => key['title'] === title )
    if(check){
        disabled = "disabled";
    }
    
}



