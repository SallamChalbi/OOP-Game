import {Ui} from './ui.module.js'
export class Details {
    constructor(){
        this.details = document.querySelector(".details");
        this.home = document.querySelector(".games");
        this.btnClose = document.querySelector("#btnClose");
    }

    async run(){
        this.btnClose.addEventListener("click", () => {
            this.details.classList.add("d-none");
            this.home.classList.remove("d-none");
        });
    }
}