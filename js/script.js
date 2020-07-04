{
    const tasksList = [
        {
            content: "wstać",
            done: true,
        },
        {
            content: "zjeść",
            done: false,
        }
    ];

    const reloadList = () => {
        const listElement = document.querySelector(".js-tasksList");

        for(const task of tasksList){
            listElement.innerHTML += `
                ${(task.done) ? "<li class=\" taskList__item taskList__item--done \" >" :  "<li class=\" taskList__item \" >" }
                    <div class="taskList__toggleButton">
                        ${(task.done) ? "✔" : ""}
                    </div> 
                        ${task.content}
                    <div class="taskList__removeButton">
                        🗑
                    </div>
                </li> 
            `;
        }
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
    }

    const init = () => {
        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormSubmit);
        reloadList();
    }

    

    init();
}