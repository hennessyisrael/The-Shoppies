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
    //  Search Result
        for (i = 0; i < MoviesData.length ; i++) {
            console.log(MoviesData[i].Title);
            movies.innerHTML += `
            <div class="movie">
                        <img src="${ MoviesData[i].Poster}" alt="Movie Cover">
                        <div class="content">
                            <h5>${ MoviesData[i].Title}</h5>
                            <p>Year of Release : ${ MoviesData[i].Year}</p>
                            <button class="nominate-btn" data-btn-id="${i}" data-btn-title="${ MoviesData[i].Title}" onclick="add_to_nomination(${i},${ MoviesData[i].Title},${MoviesData[i].Poster},event)">Add to Nomination</button>
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
    
    // IF Movie Title is aleady added to Search List
    for (i = 0; i < Nominations.length; i++) {
        if(Nominations[i].title == MoviesData[i]['title']){
                    
            }
        }


    if(search.value != ''){
        getMovie(search.value);
        search_title.innerHTML = `You Search for ${search.value}`;
        movie_to_html()
       
    }
    disable_nominated_button();   
}

function disable_nominated_button(){
    let btn = document.querySelectorAll('.nominate-btn');
    // console.log(btn)
    // for (i = 0; i < btn.length; i++){
    //     for (j = 0; j < Nominations.length; j++){
    //         if(btn[i].dataset.btnTitle == Nominations[j].title){
    //             console.log("True")
    //             // btn[i].disabled = true;
    //             // btn[i].backgroundColor = "lightgrey";
    //             // console.log(btn[i].disabled)
    //             // console.log(Nominations[j].title)
    //         }
    //     }
    // }
}




// Add Movie to Nominations 
function add_to_nomination(movie_id,movie_title,movie_poster, e){
    //Check if Movie not already Nominated
    for (i = 0; i < Nominations.length; i++) {
        if(Nominations[i].title == e.target.dataset.btnTitle){
            return
        }
    }
    // Push Obj To Nomination Array
   const Movie = {
        id: movie_id,
        title: movie_title,
        img : movie_poster,          

    }
    nomination_to_html();

    Nominations.push(Movie);

     //Display Number of Nomination Length and load nomination to html
    number_of_nominations.innerHTML = Nominations.length;

     // Display a banner to the user when Nominatios Array length is upto 5
    if(Nominations.length > 4){
        banner = document.querySelector('.banner');
        banner.classList.remove('hide')
        return
    } 
    

    // Diasble Nomination Button When Nominated
    e.target.disabled = true;
    e.target.style.backgroundColor = "lightgrey";
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
    //Remove Movie For Nominations array
    for (i = 0; i < Nominations.length; i++) {
        if(Nominations[i].id == id){
            Nominations.splice(i, 1);  
        }  
    }

        // Update Nomination Html
        for (i = 0; i < Nominations.length; i++) {
            nominated.innerHTML += `
                <div class ="nominee">
                <img src="${Nominations[i].cover}" alt="Movie Poster">
                <span>${Nominations[i].title}</span>
                <button class="delete" onclick="delete_nominated_movie(${Nominations[i].id})">X</button>
                </div>
                `
        }

        // Undisabled Nominee Button
        let btn = document.querySelectorAll('.nominate-btn');
        for (i = 0; i < btn.length; i++){
           if(btn[i].dataset.btnId == id){
            btn[i].disabled = false;
            btn[i].style.backgroundColor = "green";
           }
        }

         // Hide Display banner to the user when Nominatios Array length is upto 5
        if(Nominations.length <= 4){
            banner = document.querySelector('.banner');
            banner.classList.add('hide')
        } 
        

        //Update length of Nomination 
        number_of_nominations.innerHTML = Nominations.length;      
}





    // IF Movie Title is aleady added to Search List
    // for (i = 0; i < Nominations.length; i++) {
    //     if(MoviesData[i].title == MoviesData[i]['title']){
                   
    //         }
    //     }


      // Diasble Nomination Button When Nominated
      e.target.disabled = true;
      e.target.style.backgroundColor = "lightgrey";