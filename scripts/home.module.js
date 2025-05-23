import {Ui} from './ui.module.js'
import {Details} from './details.module.js'
export class Home {
    constructor(){
        this.ui = new Ui();
        this.links = document.querySelectorAll(".nav-link");
        this.home = document.querySelector(".games");
        this.details = document.querySelector(".details");
    }

    cardEvents(){
        this.cards.forEach(card => {
            card.addEventListener("click", async (e) => {
                const gameId = e.currentTarget.getAttribute("game-id");
                this.home.classList.add("d-none");
                this.details.classList.remove("d-none");
                this.ui.gameDetails(gameId);
                
                const details = new Details();
                details.run();
            });
        });
    }

    async run(){
        await this.ui.display("mmorpg")
        this.cards = document.querySelectorAll(".card");
        this.cardEvents();

        for(let i = 0; i < this.links.length; i++){
            this.links[i].addEventListener("click", (e) => {
                this.links.forEach(link => link.classList.remove("active"));
                e.target.classList.add("active");
                const category = e.target.getAttribute("data-category");
                this.ui.display(category).then(() => {
                    this.cards = document.querySelectorAll(".card");
                    this.cardEvents();
                });
            });
        }
    }
}
