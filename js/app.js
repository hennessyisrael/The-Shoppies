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
let Nominations = [];




//Get Saved Nomination 
function get_saved_nomination(){
    let json_str = getCookie('c_nominations');
    let saved_nomination =  JSON.parse(json_str);
    if(Nominations.length <= 0 && saved_nomination.length > 0 ){
        //Clone Nomationtion from the cookie to Nomination Array
        Nominations = [...saved_nomination]
        //Output Nomination 
        nomination_to_html();

        // Display Banner when Nomination is upto 5
        banner_nomination_check();
    }
}



//Load Movies Data to Html
function movie_to_html(){
    
    movies.innerHTML = "";

        if(MoviesData && MoviesData.length > 0){
            // Loop Through the Movies Data that were returned
        for (i = 0; i < MoviesData.length; i++) {
            check_if_nominated(MoviesData[i].Title);
            //Escape charcters
            let movie_title =  MoviesData[i].Title.replace(/' '"[.*+?^${}()|[\]\\]/g, '\\$&');  
            // Add Data to Html
            movies.innerHTML += `
            <div class="movie">
                        <div class="content">
                            <h3>${ movie_title}</h3>
                            <p>Year of Release : ${ MoviesData[i].Year}</p>
                            <button ${disabled} class="nominate-btn" data-btn-title="${movie_title}" onclick="add_to_nomination(${i},\`${movie_title}\`, event )">Add to Nomination</button>
                        </div>
                </div>
            `
        
        } 
        
    }
}



//Fetch Movies Data from OMDBAPI
function getMovie(moviename) {
    return fetch(`http://omdbapi.com/?i=tt3896198&apikey=7497c18&s=${moviename}&type=movie`)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }                
                response.json().then(function(data) {
                    
                    if(data.Search){
                        // Add Returned Seach Data to MoviesData Array
                        MoviesData  =data.Search;
                        // Output Movies in Html
                        movie_to_html();

                        error_ele.innerHTML = "";
                        movies.classList.remove("hide")

                    }
                    else{
                        // If movie can't be fetch, Output userfiendly error
                        error_ele.innerHTML = "Movie Title Doesn't Exist, Please try searching again with the correct title";
                        movies.classList.add("hide")
                        
                    }
                   
                });
            }
        )
    //    if FetchApi return error
        .catch(function(err) {
             //Log Error to console for dev analysis
            console.log('Fetch Error :-S', err);
            //Output userfiendly error
            error_ele.innerHTML = "Movie Title Doesn't Exist, Please try searching again with the correct title";
        });
}


// Search and Display Movie Content
function searchMovie(){
    if(search){
        // Get Search Value
        search_value = search.value
        // Fetch the Move
        getMovie(search_value);
        //Output what user search
        search_title.innerHTML = `You Search for "${search.value}"`;
        //output movie to html
        movie_to_html();
    }
}

// Listen for User Input and Search Movie 3 Seconds after Keyup
search.addEventListener('keyup', function(){     
    setTimeout(searchMovie,3000);  
})

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
    if(Nominations && Nominations.length > 0){
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

//Show Nominated Movies DOM
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



//SetSaved Nomination before leaving page
function set_saved_nomination(){
    if(Nominations.length > 0){
        let arr = [...Nominations];
        let json_str = JSON.stringify(arr);
        createCookie('c_nominations', json_str);
    }
}

// Create Cookie Function
function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Get Cookie Function
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

// let something =  "kdkkdkd'jdkdkdkdkdkd"