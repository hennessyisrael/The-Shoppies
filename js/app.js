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
       if(MoviesData.length > 0){

        // Latest Search
        movies.innerHTML += `
        <div class="movie current-movie">
                    <img src="${ MoviesData[MoviesData.length - 1]['cover']}" alt="Movie Cover">
                    <div class="content">
                        <h5>${ MoviesData[MoviesData.length - 1]['title']}</h5>
                        <p>Year of Release : ${ MoviesData[MoviesData.length - 1]['year']}</p>
                        <p>Genre : ${ MoviesData[MoviesData.length - 1]['genre']}</p>
                        <p>Director : ${ MoviesData[MoviesData.length - 1]['director']}</p>
                        <button onclick="add_to_nomination(${ MoviesData[MoviesData.length - 1]['id']})">Add to Nomination</button>
                    </div>
            </div>
        `
    // Recently Search
        for (i = 0; i < MoviesData.length -1 ; i++) {
            
            movies.innerHTML += `
            <div class="movie">
                        <img src="${ MoviesData[i]['cover']}" alt="Movie Cover">
                        <div class="content">
                            <h5>${ MoviesData[i]['title']}</h5>
                            <p>Year of Release : ${ MovieData['year']}</p>
                            <p>Genre : ${ MoviesData[i]['genre']}</p>
                            <p>Director : ${ MoviesData[i]['director']}</p>
                            <button onclick="add_to_nomination(${ MoviesData[i]['id']})">Add to Nomination</button>
                        </div>
                </div>
            `
        
              } 
       }
}



//Load the Movie Data to the Movies Array
let movie_id = 0;
function loadMovie(data){
    if(data.Title){     
        MovieData = {
            id: movie_id,
            cover : data.Poster,
            title : data.Title,
            genre : data.Genre,
            director : data.Director,
            year : data.Year,
        }
        MoviesData.push(MovieData);
        movie_to_html();
        movie_id++;
    }
    else{
        // Log User friendly Error to User if movie is undefined
        error_ele.innerHTML = "Movie Title Doesn't Exist, Please try searching again with the correct title";
    
        
    }
   
}



//Get Movies
function getMovie(moviename) {
    return fetch(`http://omdbapi.com/?i=tt3896198&apikey=7497c18&t=${moviename}&type=movie`)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function(data) {
                     // IF Movie Title is aleady added to Search List
                    for (i = 0; i < MoviesData.length; i++) {
                        if(MoviesData[i].title == data.Title){
                            alert("Movie Already Added");
                            return
                        }
                    }

                    loadMovie(data);
                });
            }
        )
        //Log Error to console for dev analysis
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}


// Search and Display Movie Content
function searchMovie(){
    //    Alert user when Notification is Completed
    if(Nominations.length == 5){
        alert(" 5 Nomination Completed, Thanks!");
        return
        }


    if(search.value != ''){
        getMovie(search.value);
        search_title.innerHTML = `You Search for ${search.value}`;
        movie_to_html()
       
    }
       
    
}





// Add Movie to Nominations 
function add_to_nomination(id){
    if(Nominations.length == 5){
        alert(" 5 Nomination Completed, Thanks!");
        return
    }
   
    // Push Obj To Nomination Array
    Nominations.push(MoviesData[id]);
     //Display Number of Nomination Length and load nomination to html
    number_of_nominations.innerHTML = Nominations.length;
    nomination_to_html()
        

}


//Nominatiomn data to html
function nomination_to_html(){
    nominated.innerHTML ="";
    for (i = 0; i < Nominations.length; i++) {
      nominated.innerHTML += `
              <div class ="nominee">
              <img src="${Nominations[i].cover}" alt="Movie Poster">
              <span>${Nominations[i].title}</span>
              <button class="delete" onclick="delete_nominated_movie(${Nominations[i].id})">X</button>
              </div>
          `
  
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
        for (i = 0; i < Nominations.length; i++) {
            if(Nominations[i].id == id){
                Nominations.splice(i, 1);  
            }  
        }

        for (i = 0; i < Nominations.length; i++) {
            nominated.innerHTML += `
                <div class ="nominee">
                <img src="${Nominations[i].cover}" alt="Movie Poster">
                <span>${Nominations[i].title}</span>
                <button class="delete" onclick="delete_nominated_movie(${Nominations[i].id})">X</button>
                </div>
                `
        }
           
            number_of_nominations.innerHTML = Nominations.length;      
}


//Dark and Light Mode Toggle
function changeMode(){
    document.body.classList.toggle("dark");
    header.classList.toggle("dark_sec");
                                                
    nominated.classList.toggle("dark_sec");

}



