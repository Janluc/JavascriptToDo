import Project from './projectClass';
import ToDoItem from './toDoClass';

let listOfProjects;
let currentProject;

let initProjectView = (userProjects) => {
  listOfProjects = userProjects;
  currentProject = listOfProjects[0];
}

let createNav = (project) => {
  currentProject = project;
  let main = document.querySelector("#content");
  let test = document.createElement('h1')
  test.textContent = project.projectName;

  let toDoBtn = document.createElement('button');
  toDoBtn.textContent = "New Task!"
  toDoBtn.addEventListener('click', () => newItemWindow(project));

  let projectBtn = document.createElement('button');
  projectBtn.textContent = '+';
  projectBtn.addEventListener('click', newProjectWindow);

  main.append(test, toDoBtn, projectBtn)

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

let createModal = (modalContent) => {
  let div = document.createElement('div');
  div.classList.add('modal');

  window.onclick = (event) => {
    if(event.target === div) {
      div.style.display = 'none';
    }
  }
  modalContent.classList.add('modal-content')
  return div;
}

let newProjectWindow = () => {
  let main = document.querySelector('#content');
  let contentDiv = document.createElement('div');
  let div = createModal(contentDiv);  
  let form = document.createElement('form');

  let projectName = document.createElement('input');
  projectName.setAttribute('id', 'projectName');
  projectName.setAttribute('type', 'text');
  projectName.setAttribute('placeholder', 'New Project Name');

  let submitProjectForm = document.createElement('button')
  submitProjectForm.textContent = 'Create New Project';
  submitProjectForm.addEventListener('click', submitNewProject);
  
  let selection = document.createElement('select');
  listOfProjects.forEach(item => {
    let option = document.createElement('option');
    option.textContent = item.projectName;
    selection.add(option);
  })
  selection.addEventListener('change', changeProject)

  selection.options[listOfProjects.indexOf(currentProject)].selected = 'selected'
  form.append(projectName, submitProjectForm);
  contentDiv.append(selection, form);
  div.append(contentDiv);
  main.append(div);
}

let submitNewProject = () => {
  let projectName = document.querySelector('#projectName').value;
  let newProject = new Project(projectName);
  currentProject = newProject;
  listOfProjects.push(newProject);
  refreshProject(newProject);
}

let changeProject = (event) => {
  
  listOfProjects.forEach(item => {
    if(item.projectName === event.target.options[event.target.selectedIndex].value) {
      refreshProject(listOfProjects[listOfProjects.indexOf(item)])
    }
  })
}

let newItemWindow = (project) => {
  let main = document.querySelector("#content");
  let contentDiv = document.createElement('div');
  let div = createModal(contentDiv);

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

export default {initProjectView, createNav, createContent};
