
//kokonaisuus on kootu api kirjaston ympärille.
//tässä tekstikentän avulla haetaa elokuvan nimen perusteella se itse elokuva.
$(document).ready(() => {
    $('#headerDisplay').hide();
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();

    });
});

//Tähän on rakennettu funktio, joka hakee ja näyttä tiedot kaikista elokuvista käyttämällä omdbapia.
//Jos jokin elokuvan nimi on kirjoitettu väärin niin se antaa virheen.
//Tämä on tehty mahdollisimman responsiiviseksi ja lisätty pieni hover animaatio.
//Sisältää myös mahdollisuuden avata elokuvan tiedot esiin klikattua kuvaa.
function getMovies(searchText){
    let apiKey = 'thewdb';
    let x = `https://www.omdbapi.com?s=${searchText}&apikey=${apiKey}`;
    axios.get(`https://www.omdbapi.com?s=${searchText}&apikey=${apiKey}`)
        .then((response) => {
            if (response.data.Response == "False"){
                $('#headerDisplay').hide();
                let output = `<h3>Elokuvasi Ei löytynyt!</h3>`
                $('#movies').html(output);
            } else {
            $('#headerDisplay').show();
            let movies = response.data.Search;
            let output=``;
            $.each(movies, (index, movie) => {
                let image;
                if (movie.Poster !== "N/A") 
                    image = movie.Poster;
                else 
                    image = "https://cdn-icons.flaticon.com/png/512/666/premium/666201.png?token=exp=1638637941~hmac=389a944d45df025473accc33164e0189";
                output += `
                <style>
                #zoom:hover {
                    transform: scale(1.05); 
                  }
                </style>

                    <div class="col-md-3">
                        <div class="movieBox text-center" id="zoom">                            
                            <a onclick="movieSelected('${movie.imdbID}')" href="#"><img src="${image}"> </a>
                            <h5 class="movieTitle">${movie.Title}</h5>
                        </div>
                    </div>
                `;
            });
        
            //Tämähän muuttaa näkymän html:n näköiseksi.
            $('#movies').html(output);
        }

        })
        .catch((err) => {
            console.log(err);
        });
}
//valitaan elokuva id sijainnin mukaan ja mahdollisesti tallentaa istunnon.
function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'info.html';
    return false;
}

//Tässä haetaan suoraan omdb api kirjasto, johon on listattu elokuvan tiedot, sitä varten on tehty erikseen toinen html sivu.
//Bootstrapilla on rakennettu se miten elokuvan tiedot tulee esiin. 
//Voit sivustolta tarkastaa elokuvan kaikki tiedot ja myös löytyy synopsis, sekä linkki suoraan imdb sivustolle.
function getMovie(){    
    let movieId = sessionStorage.getItem('movieId');
    let apiKey = 'thewdb';
    axios.get(`https://www.omdbapi.com?i=${movieId}&apikey=${apiKey}`)
    .then((response) => {
        let movie = response.data;
        let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Genre: ${movie.Genre} </li>
                        <li class="list-group-item"> Julkaistu: ${movie.Released} </li>
                        <li class="list-group-item"> Ikäraja: ${movie.Rated} </li>
                        <li class="list-group-item"> IMBD Arvio: ${movie.imdbRating} </li>
                        <li class="list-group-item"> Ohjaaja: ${movie.Director} </li>
                        <li class="list-group-item"> Käsikirjoittajat: ${movie.Writer} </li>
                        <li class="list-group-item"> Pääosissa: ${movie.Actors} </li>
                    </ul>
                </div>
            </div>
            <div class="jumbotron">
                <div class="movieDiv">
                    <h3> Elokuvan Synopsis </h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Katso IMDB:stä</a>
                </div>
            </div>
        `;

        $('#movie').html(output);

    })
    .catch((err) => {
        console.log(err);
    });

}