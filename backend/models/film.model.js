function Film(release_Date, title, overview, popularity, vote_Count, vote_Average, original_Language, genre, poster_Url) {
    let film = {
        Release_Date: release_Date,
        Title: title,
        Overview: overview,
        Popularity:  popularity,
        Vote_Count: vote_Count,
        Vote_Average: vote_Average,
        Original_Language: original_Language,
        Genre: genre,
        Poster_Url: poster_Url
    }
    return film;
}
module.exports = {
    Film: Film
}