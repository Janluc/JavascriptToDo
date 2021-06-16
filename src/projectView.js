import Project from './projectClass';
import ToDoItem from './toDoClass';

let createNav = (project) => {
  let main = document.querySelector("#content");
  let test = document.createElement('h1')
  test.textContent = project.projectName;

  let btn = document.createElement('button');
  btn.textContent = "+"
  btn.addEventListener('click', () => newItemWindow(project));
  
  main.append(test, btn)

}
let createContent = (project) => {
  let main = document.querySelector("#content");
  project.toDoList.forEach(item => {
    let div = document.createElement('div');
    let title = document.createElement('h3');
    let description = document.createElement('p');
    let dueDate = document.createElement('p');
    let priority = document.createElement('p');

    title.textContent = item.title;
    description.textContent = item.description;
    dueDate.textContent = item.dueDate;
    priority.textContent = item.priority;

    div.append(title, description, dueDate, priority);
    main.append(div);
  });
}

let newItemWindow = (project) => {
  let main = document.querySelector("#content");
  let div = document.createElement('div');
  div.classList.add('modal')

  let contentDiv = document.createElement('div');
  let form = document.createElement('form');
  let title = document.createElement('input');
  title.setAttribute('id', 'title');
  title.setAttribute('type', 'text');
  title.setAttribute('placeholder', 'Title');

  let description = document.createElement('input');
  description.setAttribute('id', 'description');
  description.setAttribute('type', 'text');
  description.setAttribute('placeholder', 'Description');

  let dueDate = document.createElement('input');
  dueDate.setAttribute('id', 'dueDate');
  dueDate.setAttribute('type', 'date');

  let priority = document.createElement('input');
  priority.setAttribute('id', 'priority');
  priority.setAttribute('type', 'text');
  priority.setAttribute('placeholder', 'Priority')

  let submitForm = document.createElement('button')
  submitForm.textContent = "Create To Do";
  submitForm.addEventListener('click', () => submitNewItem(project))

  form.append(title, description, dueDate, priority, submitForm)
  contentDiv.append(form);
  div.append(contentDiv);

  contentDiv.classList.add('modal-content')
  main.append(div);
}

let submitNewItem = (project) => {
  let title = document.querySelector('#title').value;
  let description = document.querySelector('#description').value;
  let dueDate = document.querySelector('#dueDate').value;
  let priority = document.querySelector('#priority').value;

  project.toDoList.push(new ToDoItem(title, description, dueDate, priority));
  refreshProject(project);
}

let refreshProject = (project) => {
  let main = document.querySelector("#content");
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  createNav(project);
  createContent(project);
}

export default {createNav, createContent};
