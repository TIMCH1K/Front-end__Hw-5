type Todo = {
    text: string;
    completed: boolean;
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.todo__form') as HTMLFormElement;
    const input = document.querySelector('.todo__input') as HTMLInputElement;
    const list = document.querySelector('.todo__list') as HTMLUListElement;

    let todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');

    const saveTodos = (): void => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const removeTodo = (index: number): void => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    const toggleComplete = (index: number): void => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    };

    const renderTodos = (): void => {
        list.innerHTML = '';
        todos.forEach((todo, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'todo__item';

            const textSpan = document.createElement('span');
            textSpan.className = `todo__item-text ${todo.completed ? 'todo__item--completed' : ''}`;
            textSpan.textContent = todo.text;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'todo__controls todo__delete';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => removeTodo(index));

            const completeButton = document.createElement('button');
            completeButton.className = 'todo__controls todo__complete';
            completeButton.textContent = todo.completed ? 'Undo' : 'Complete';
            completeButton.addEventListener('click', () => toggleComplete(index));

            listItem.appendChild(textSpan);
            listItem.appendChild(deleteButton);
            listItem.appendChild(completeButton);

            list.appendChild(listItem);
        });
    };

    form.addEventListener('submit', (e) => {
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


    (window as any).removeTodo = removeTodo;
    (window as any).toggleComplete = toggleComplete;

    renderTodos();
});
