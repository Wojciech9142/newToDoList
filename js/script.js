
const tasksList = [
    {
        content: "wstać",
        done: true,
    },
    {
        content: "zjeść",
        done: false,
    },
    {
        content: "zjeść",
        done: true,
    },
    {
        content: "zjeść",
        done: false,
    },
    {
        content: "zjeść",
        done: false,
    },
];

const reloadList = () => {
    const listElement = document.querySelector(".js-tasksList");

    listElement.innerHTML = "";

    for (const task of tasksList) {
        listElement.innerHTML += `
                <li class=" taskList__item ">
                    <div class="taskList__toggleButton js-toggleButton">
                        ${(task.done) ? "✔" : ""}
                    </div> 
                        <span ${task.done ? "class=\" taskList__item--done \" " : " "} > ${task.content} </span>
                    <div class="taskList__removeButton js-removeButton">
                        🗑
                    </div>
                </li> 
            `;
    }

    const toggleButtonElements = document.querySelectorAll(".js-toggleButton");

    toggleButtonElements.forEach((toggleButton, index) => {
        toggleButton.addEventListener("click", () => {
            tasksList[index].done = !tasksList[index].done;
            reloadList();
            console.log(tasksList[index].done)
        });
    });

    const removeButtonElements = document.querySelectorAll(".js-removeButton");

    removeButtonElements.forEach((removeButton, index) => {
        removeButton.addEventListener("click", () => {
            tasksList.splice(index, 1);
            reloadList();
            togglingOptions();
        });

    });


};

const togglingOptions = () => {
    const taskListOptionsButtons = document.querySelectorAll(".taskListOptions__button");

    for (const option of taskListOptionsButtons) {
        console.log(tasksList.length);
        (tasksList.length === 0) ? option.classList.remove("taskListOptions__button--visible") : option.classList.add("taskListOptions__button--visible");
    }
};

const onFormSubmit = (event) => {
    event.preventDefault();
};

const init = () => {
    const formElement = document.querySelector(".js-form");

    formElement.addEventListener("submit", onFormSubmit);
    reloadList();


    togglingOptions();
}

init();
