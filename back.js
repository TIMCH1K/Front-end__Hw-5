document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.todo__form');
    var input = document.querySelector('.todo__input');
    var list = document.querySelector('.todo__list');
    var todos = JSON.parse(localStorage.getItem('todos') || '[]');
    var saveTodos = function () {
        localStorage.setItem('todos', JSON.stringify(todos));
    };
    var removeTodo = function (index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };
    var toggleComplete = function (index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    };
    var renderTodos = function () {
        list.innerHTML = '';
        todos.forEach(function (todo, index) {
            var listItem = document.createElement('li');
            listItem.className = 'todo__item';
            var textSpan = document.createElement('span');
            textSpan.className = "todo__item-text ".concat(todo.completed ? 'todo__item--completed' : '');
            textSpan.textContent = todo.text;
            var deleteButton = document.createElement('button');
            deleteButton.className = 'todo__controls todo__delete';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () { return removeTodo(index); });
            var completeButton = document.createElement('button');
            completeButton.className = 'todo__controls todo__complete';
            completeButton.textContent = todo.completed ? 'Undo' : 'Complete';
            completeButton.addEventListener('click', function () { return toggleComplete(index); });
            listItem.appendChild(textSpan);
            listItem.appendChild(deleteButton);
            listItem.appendChild(completeButton);
            list.appendChild(listItem);
        });
    };
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (input.value.trim() === '') {
            alert('Добавь текста чтоль.');
            return;
        }
        todos.push({ text: input.value, completed: false });
        saveTodos();
        renderTodos();
        input.value = '';
    });
    window.removeTodo = removeTodo;
    window.toggleComplete = toggleComplete;
    renderTodos();
});
