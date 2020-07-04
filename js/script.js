{
    let tasksList = [];
    let isHideDone = false;

    const reloadList = () => {
        const listElement = document.querySelector(".js-tasksList");

        listElement.innerHTML = "";

        for (const task of tasksList) {
            listElement.innerHTML += `
                    <li class=" taskList__item ${task.done && isHideDone ? " taskList__item--hidden" : ""}">
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
            });
        });

        const removeButtonElements = document.querySelectorAll(".js-removeButton");

        removeButtonElements.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                tasksList.splice(index, 1);
                reloadList();
                renderButtons();
            });

        });

        doneAll();
    };

    const renderButtons = () => {
        const taskListOptionsButtons = document.querySelectorAll(".taskListOptions__button");

        for (const option of taskListOptionsButtons) {
            (tasksList.length === 0) ? option.classList.remove("taskListOptions__button--visible") : option.classList.add("taskListOptions__button--visible");
        }
    };

    const changeHideDone = () => {
        isHideDone = !isHideDone;
        reloadList();
    }

    const showNotFinished = () => {
        const hideDoneButtonElement = document.querySelector(".js-hidingDone");

        hideDoneButtonElement.addEventListener("click", changeHideDone);
    };

    const isNotFinished = (task) => {
        return task.done === false;
    };

    const doneAllTasks = () => {
        for (const task of tasksList) {
            task.done ? task.done : task.done = !task.done;
        };

        reloadList();
    };

    const doneAll = () => {
        const doneAllButton = document.querySelector(".js-doneAll");
        doneAllButton.addEventListener("click", doneAllTasks);

        const notFinishedTasks = tasksList.filter(isNotFinished);
        notFinishedTasks.length === 0 ? doneAllButton.classList.add("taskListOptions__button--disabled") : doneAllButton.classList.remove("taskListOptions__button--disabled");

    };


    const addNewTask = (newTask) => {
        tasksList = [
            ...tasksList,
            {
                content: newTask,
                done: false,
            },
        ];
        reloadList();
        renderButtons();
    };

    const resetForm = (newTaskElement) => {
        newTaskElement.value = "";
        newTaskElement.focus();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-taskName");

        (newTaskElement.value !== "") ? addNewTask(newTaskElement.value) : reloadList() ;

        resetForm(newTaskElement);
    };

    const init = () => {
        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormSubmit);
        reloadList();

        showNotFinished();
    }

    init();
}
