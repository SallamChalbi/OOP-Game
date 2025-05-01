export class Ui{
    constructor(){
        this.gamesData = document.getElementById("gamesData");
        this.details = document.getElementById("detailsContent");
        this.loading = document.querySelector(".loading");
    }

    async getAPIData(category){
        this.loading.classList.remove("d-none");
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '366abb66e9msh6f6e6a76883d526p173fc0jsncbf0ce9c297d',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
        const response = await api.json();
        this.loading.classList.add("d-none");
        return response;
    }
    async display(game){
        const result = await this.getAPIData(game);
        // console.log(result);
        let data = '';

        for(let i = 0; i < result.length; i++){
            data += `
                <div class="col">
                    <div game-id="${result[i].id}" class="card h-100 bg-transparent" role="button">
                        <div class="card-body">
                            <figure class="position-relative">
                                <img class="card-img-top object-fit-cover" src="${result[i].thumbnail}" alt="${result[i].title}">
                            </figure>
                        
                            <figcaption>
                                <div class="hstack justify-content-between">
                                <h3 class="h6 small">${result[i].title}</h3>
                                <span class="badge text-bg-primary p-2">Free</span>
                                </div>
                                <p class="card-text small text-center opacity-50">
                                    ${result[i].short_description}
                                </p>
                            </figcaption>
                        </div>
                        
                        <footer class="card-footer small hstack justify-content-between">
                            <span class="badge badge-color">${result[i].genre}</span>
                            <span class="badge badge-color">${result[i].platform}</span>
                        </footer>
                    </div>
                </div>
            `
        }
        this.gamesData.innerHTML = data;
    }

    async gameDetails(game){
        this.loading.classList.remove("d-none");
        this.details.classList.remove("d-none");
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '366abb66e9msh6f6e6a76883d526p173fc0jsncbf0ce9c297d',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${game}`, options);
        const response = await api.json();
        // console.log(response);
        this.loading.classList.add("d-none");
        this.details.innerHTML = `
            <div class="col-md-4">
               <img src="${response.thumbnail}" class="w-100" alt="image details">
            </div>
            <div class="col-md-8">
               <h3>Title: ${response.title}</h3>
               <p>Category: <span class="badge text-bg-info"> ${response.genre}</span> </p>
               <p>Platform: <span class="badge text-bg-info"> ${response.platform}</span> </p>
               <p>Status: <span class="badge text-bg-info"> ${response.status}</span> </p>
               <p class="small">${response.description}</p>
               <a class="btn btn-outline-warning" target="_blank" href="${response.game_url}">Show Game</a>
            </div>
        `
    }
}

/* const ui = new Ui();
// ui.display('gameData[0]');
ui.display('shooter');
ui.gameDetails(100) */