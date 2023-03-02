"use strict";
//+------------------------------------------------------------------------------+
//| - start -                          To Do List Project                        |
//+------------------------------------------------------------------------------+
(function() {
    const addText = document.querySelector(".add_text");
    const addButton = document.querySelector(".add_button");
    let inputId = [];

    // - add -
    let toDoList = (tasks) => {
        const task = document.querySelector(".task");
        
        const divTask = document.createElement("div");
        divTask.setAttribute("class", "task_add");
        
        const inputTask = document.createElement("input");
        inputTask.setAttribute("type", "checkbox");
 
        inputId.forEach((tar) => {
            inputTask.setAttribute("style", `box-shadow: ${tar} 2px 2px 4px, ${tar} -2px -2px 4px;`);
        });     
        if(tasks && tasks.taski !== "") {
            inputTask.setAttribute("style", `${tasks.taski}`);
        }
        divTask.append(inputTask);

        const pTask = document.createElement("p");
        //pTask.setAttribute("contenteditable", "true"); // можно редактировать текст
        pTask.setAttribute("contenteditable", "false"); // нельзя редактировать текст
        pTask.textContent = addText.value;
        divTask.append(pTask);

        // - start - set - localStorage -
        if(tasks) {
            pTask.textContent = tasks.name;
        }
        // - end - set - localStorage -
        
        const buttonTaskEditor = document.createElement("button");
        buttonTaskEditor.setAttribute("class", "task_editor");
        buttonTaskEditor.textContent = "Редактировать";
        divTask.append(buttonTaskEditor);

        // - start - set - localStorage -
        if(tasks && tasks.checked == "true") {
            divTask.setAttribute("checked", `${tasks.checked}`);
            inputTask.setAttribute("checked", `${tasks.checked}`);
            divTask.style.backgroundColor = "pink";
            divTask.children[1].style.color = "#777";
            divTask.children[1].style.textDecoration = "line-through";
            divTask.children[1].style.textDecorationColor = "red";
            divTask.prepend(inputTask);

            pTask.style.border = "1px solid pink";
            buttonTaskEditor.setAttribute("disabled", ""); // кнопка Редактировать не активна
        } else {
            divTask.setAttribute("checked", "false");
            pTask.style.border = "1px solid white";
            buttonTaskEditor.removeAttribute("disabled"); // кнопка Редактировать активна
        }
        // - end - set - localStorage -
        
        const buttonTaskRemove = document.createElement("button");
        buttonTaskRemove.setAttribute("class", "task_remove");
        buttonTaskRemove.textContent = "Удалить";
        divTask.append(buttonTaskRemove);

         
        task.prepend(divTask);  
        addText.value = "";
    };

    // - start - get - localStorage -
    let listArr = JSON.parse(localStorage.getItem("list"));
    // console.log("get listArr", listArr);
    if(listArr !== null) {
        listArr.forEach((task) => {
            toDoList(task);
            updateLocalStorage();
        });
    }
    // - end - get - localStorage -

    taskEditor();
    taskRemove();
    styleChecked(); 

    addButton.addEventListener("click", (event) => {
        // - add -
        if(addText.value !== "") {
            toDoList();
            tasInput(event, event.target.parentElement.parentElement.children[1].children[0].children[0]);
        }
        taskEditor();
        taskRemove();
        styleChecked(); 
        updateLocalStorage();
    });

    // - start - get - set - function localStorage -
    function updateLocalStorage() {
        const taskAll = document.querySelectorAll(".task_add");
        listArr = [];
        // console.log("set listArr", listArr);
        taskAll.forEach((target) => {
            let objList = {
                name: target.children[1].textContent,
                checked: target.getAttribute("checked"),
                taski: target.children[0].getAttribute("style"),
            };

            listArr.push(objList); 
        });
        localStorage.setItem("list", JSON.stringify(listArr.reverse()));
    }
    // - end - get - set - function localStorage -

    // - editor -
    function taskEditor() {
        let taskEditorAll = document.querySelectorAll(".task_editor");
        const taskAddpAll = document.querySelectorAll(".task_add p");
        taskEditorAll.forEach((target) => {
            target.addEventListener("click", (event) => {
                // console.dir(event.target.parentElement.children[1]); // <p></p>
                // - checked -
                if(event.target.parentElement.children[1].attributes.contenteditable.textContent == "false") {
                    event.target.parentElement.children[1].setAttribute("contenteditable", "true"); // можно редактировать текст
                    event.target.parentElement.children[1].focus();
                    event.target.parentElement.children[1].style.border = "1px solid teal";
                    event.target.parentElement.children[1].style.borderRadius = "5px";
                    event.target.parentElement.children[1].value = event.target.parentElement.children[1].textContent;
                    event.target.textContent = "Сохранить";
                    updateLocalStorage();
                } else if(event.target.parentElement.children[1].attributes.contenteditable.textContent == "true") {
                    event.target.parentElement.children[1].setAttribute("contenteditable", "false"); // нельзя редактировать текст
                    event.target.parentElement.children[1].style.border = "1px solid white";
                    event.target.parentElement.children[1].value = event.target.parentElement.children[1].textContent;
                    event.target.textContent = "Редактировать";
                    updateLocalStorage();
                }
            });
        });
    }

    // - remove -
    function taskRemove() {
        let taskRemoveAll = document.querySelectorAll(".task_remove");
        const checkAll = document.querySelectorAll("input[type = checkbox]");
        taskRemoveAll.forEach((target) => {
            target.addEventListener("click", (event) => {
                // - checked -
                checkAll.forEach((check) => {
                    if(check.checked === true && event.target.parentElement === check.parentElement) {
                        check.parentElement.remove();
                        updateLocalStorage();
                    }
                });
            });
        });
    }

    // - style checked -
    function styleChecked() {
        const checkAll = document.querySelectorAll("input[type = checkbox]");
        checkAll.forEach((check) => {
            check.addEventListener("input", (e) => {
                // console.dir(e.target.parentElement.children[1]); // <p></p>
                // console.dir(e.target.parentElement.children[2]); // <buton>Редактировать</button>
                if(e.target.checked === true) {
                    e.target.parentElement.setAttribute("checked", "true");
                    e.target.parentElement.style.backgroundColor = "pink";
                    e.target.parentElement.children[1].style.color = "#777";
                    e.target.parentElement.children[1].style.textDecoration = "line-through";
                    e.target.parentElement.children[1].style.textDecorationColor = "red";
                    e.target.parentElement.children[1].style.border = "1px solid pink";
                    e.target.parentElement.children[2].setAttribute("disabled", ""); // кнопка Редактировать не активна
                    updateLocalStorage();

                } else {
                    e.target.parentElement.setAttribute("checked", "false");
                    e.target.parentElement.style.backgroundColor = "white";
                    e.target.parentElement.children[1].style.color = "black";
                    e.target.parentElement.children[1].style.textDecoration = "none";
                    e.target.parentElement.children[1].style.border = "1px solid white";
                    e.target.parentElement.children[2].removeAttribute("disabled"); // кнопка Редактировать активна
                    updateLocalStorage();
                }
            });
        });
    }

    function tasInput(event, inputTask) {
        if(event) {
            for(let y = 0; y < event.target.parentElement.parentElement.parentElement.children[1].children.length; y++) {
                if(event.target.parentElement.parentElement.parentElement.children[1].children[y].children[0].checked === true) {
                    inputId.push(event.target.parentElement.parentElement.parentElement.children[1].children[y].children[0].id);
                    for(let w = 0; w < inputId.length; w++) {
                        inputTask.setAttribute("style", `box-shadow: ${inputId[w]} 2px 2px 4px, ${inputId[w]} -2px -2px 4px;`);
                    }
                } 
            }
        } else {
            inputId.forEach((target) => {
                inputTask.setAttribute("style", `box-shadow: ${target} 2px 2px 4px, ${target} -2px -2px 4px;`);
            });
        }  
    }

    //+-----------------------------------------------------------------------+
    //| - start -              Функция фильтрует по нажатию кнопки            |
    //+-----------------------------------------------------------------------+
    //|                 Корректно работает после обновления страницы,         |
    //|                    то есть после добавления в localStorage            |
    //+-----------------------------------------------------------------------+
    (function() {
        const filterBtn = document.querySelectorAll(".filter_btn");
        const filterTaskAdd = document.querySelectorAll(".task_add");

        filterBtn.forEach((target) => {
            target.addEventListener("click", (event) => {
                event.preventDefault();
                const filter = event.target.dataset.filter;

                filterTaskAdd.forEach((item) => {
                    if(filter === "all") {
                        // console.dir("item all ", item);
                        item.style.display = "flex";
                    } else {
                        // console.log("item else ", item.children[0].attributes[1].value.split(" ")[1]); // input type="checkbox" style box-shadow color
                        if(item.children[0].attributes[1].value.split(" ")[1] === filter) {
                            item.style.display = "flex";
                        } else {
                            item.style.display = "none";
                        };
                    };
                });
            });
        });
    })();
    //+-----------------------------------------------------------------------+
    //| - end -               Функция фильтрует по нажатию кнопки             |
    //+-----------------------------------------------------------------------+


})();
//+-----------------------------------------------------------------------------+
//| - end -            12.6.1 To Do List Project - edit all tasks -             |
//+-----------------------------------------------------------------------------+