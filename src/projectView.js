import Project from './projectClass';
import {deleteItem, saveProjectColor, addNewProject, addNewItem} from './storedProjectManager'


let listOfProjects;
let currentProject;
let sortedSelect = 0;
let sideBarActive = false;

let initProjectView = (userProjects) => {
  if(localStorage.getItem('userProjects')){
    listOfProjects = JSON.parse(localStorage.getItem('userProjects'));
    currentProject = JSON.parse(localStorage.getItem('currentProject'));
  } else {
    listOfProjects = userProjects;
    currentProject = listOfProjects[0];
    localStorage.setItem('currentProject', JSON.stringify(currentProject));
  }
}

let createNav = (project) => {
  currentProject = new Project(project.projectName, project.toDoList, project.backgroundColor, project.navColor);

  localStorage.setItem('currentProject', JSON.stringify(currentProject));

  let main = document.querySelector("#content");
  let nav = document.createElement('nav');
  let projectHeader = document.createElement('h1');
  projectHeader.textContent = project.projectName;
  projectHeader.classList.add('project-title');
  nav.classList.add(project.navColor)

  let toDoBtn = document.createElement('button');
  toDoBtn.textContent = "◘";
  toDoBtn.addEventListener('click', () => newItemWindow(project));
  let toDoTimerHandle;
  toDoBtn.addEventListener('mouseover', () => { toDoTimerHandle = setTimeout(() => {toDoBtn.textContent = 'New Task! ◘'}, 200)})
  toDoBtn.addEventListener('mouseleave', () => { clearTimeout(toDoTimerHandle);toDoBtn.textContent = '◘'})


  let projectBtn = document.createElement('button');
  projectBtn.textContent = '+';
  projectBtn.addEventListener('click', () => ActivateSidebar(project));

  let projectHoverHandle;
  projectBtn.addEventListener('mouseover', () => { projectHoverHandle = setTimeout(() => projectBtn.textContent = 'Add/Change Projects +', 200)})
  projectBtn.addEventListener('mouseleave', () => { clearTimeout(projectHoverHandle); projectBtn.textContent = '+'})

  let deleteProjectBtn = document.createElement('button');
  deleteProjectBtn.textContent = 'X';
  deleteProjectBtn.addEventListener('click', deleteProjectAlert);

  let deleteBtnTimerHandle;
  deleteProjectBtn.addEventListener('mouseover', ()=> {deleteBtnTimerHandle = setTimeout(() => { deleteProjectBtn.textContent = "X Delete Project"}, 200)})
  deleteProjectBtn.addEventListener('mouseleave', () => {clearTimeout(deleteBtnTimerHandle);deleteProjectBtn.textContent = 'X'})

  createSidebar();
  nav.append(deleteProjectBtn, projectHeader, toDoBtn, projectBtn);
  main.append(nav);
}

let sortItems = (e) => {
  if (e.target.options[e.target.selectedIndex].value === 'None') {
    sortedSelect = 0;
    refreshProject(currentProject)
  }
  else if (e.target.options[e.target.selectedIndex].value === 'By Priority'){
    sortedSelect = 1;
    refreshProject(currentProject, currentProject.sortByPriority());
  } 
  else if (e.target.options[e.target.selectedIndex].value === 'By Date') {
    sortedSelect = 2;
    refreshProject(currentProject, currentProject.sortByDate());
  } else {
    sortedSelect = 3;
    let project = new Project(currentProject.projectName);
    project.toDoList = currentProject.sortByDate();
    let newArr = project.sortByPriority();
    console.log(newArr);
    refreshProject(currentProject, newArr);
  }
} 

let createSidebar = () => {
  let contentDiv = document.createElement('div');
  let form = document.createElement('form');

  let projectNameLabel = document.createElement('p');
  let projectName = document.createElement('input');
  projectNameLabel.textContent = 'Create a New Project!';
  projectName.setAttribute('id', 'projectName');
  projectName.setAttribute('type', 'text');
  projectName.setAttribute('placeholder', 'New Project Name');

  let submitProjectForm = document.createElement('button')
  submitProjectForm.textContent = 'Create New Project';
  submitProjectForm.addEventListener('click', submitNewProject);

  let colorLabel = document.createElement('p');
  let colorDiv = makeColorSection();
  colorLabel.textContent = 'Choose a Project color!';

  let sortDiv = document.createElement('div');
  let sortLabel = document.createElement('p');
  let sortSelection = document.createElement('select');
  let noneOption = document.createElement('option');
  let priorityOption = document.createElement('option');
  let dateOption = document.createElement('option');
  let prioDateOption = document.createElement('option');

  sortLabel.textContent = 'Sort Items'
  noneOption.textContent = 'None';
  priorityOption.textContent = 'By Priority';
  dateOption.textContent = 'By Date';
  prioDateOption.textContent = 'Both Priority and Date'
  
  sortSelection.addEventListener('change', sortItems)

  sortSelection.add(noneOption);
  sortSelection.add(priorityOption);
  sortSelection.add(dateOption);
  sortSelection.add(prioDateOption);
  
  sortDiv.append(sortLabel, sortSelection);

  sortSelection.options[sortedSelect].selected = 'selected';
  
  let selectionLabel = document.createElement('p');
  let selection = document.createElement('select');
  selectionLabel.textContent = 'Choose a Project!'
  listOfProjects.forEach(item => {
    let option = document.createElement('option');
    option.textContent = item.projectName;
    selection.add(option);
  })
  selection.addEventListener('change', changeProject)

  for (let i in listOfProjects) {
    if(selection.options[i].value === currentProject.projectName){
      selection.options[i].selected = 'selected';
    }
  }

  form.append(projectName, submitProjectForm);
  contentDiv.append(selectionLabel, selection, sortDiv, colorLabel, colorDiv, projectNameLabel, form);
  
  document.querySelector('.sidebar').append(contentDiv);
}

let deleteProjectAlert = () => {
  if(sideBarActive) {
    ActivateSidebar();
  }
  let main = document.querySelector('#content');
  let contentDiv = document.createElement('div');
  let div = createModal(contentDiv);

  let warningTitle = document.createElement('h3');
  warningTitle.textContent = "Are you sure you would like to delete this project?"
  
  let warningBtn = document.createElement('button');
  warningBtn.textContent = `Yes, delete ${currentProject.projectName}`;
  warningBtn.addEventListener('click', deleteProjectConfirmation)

  contentDiv.append(warningTitle, warningBtn);

  div.append(contentDiv);
  main.append(div);

}

let deleteProjectConfirmation = () => {
  for (let item in listOfProjects){
    if(listOfProjects[item] === currentProject) {
      listOfProjects.splice(item, 1);
    }
  }
  localStorage.setItem('userProjects', JSON.stringify(listOfProjects));
  currentProject = listOfProjects[0];

  refreshProject(currentProject);
}

let createContent = (project, list = []) => {
  let main = document.querySelector("#content");
  let counter = 0;
  let itemArea = document.createElement('div')
  let arr;
  itemArea.classList.add('to-do-area')
  itemArea.classList.add(project.backgroundColor)
  if(sideBarActive) {
    main.style.marginRight = '250px'
  }

  if(list.length === 0) {
    arr = project.toDoList;
  } else {
    arr = list;
  }
  
  arr.forEach(item => {
    let div = document.createElement('div');
    div.setAttribute('data-index', counter);
    div.classList.add('to-do-item');

    div.addEventListener('click', (e) => zoomItem(e, item))

    let title = document.createElement('h3');
    let description = document.createElement('p');
    let dueDate = document.createElement('p');
    dueDate.classList.add('item-date')
    let priority = document.createElement('span');
    let deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', deleteToDoItem)
    deleteBtn.classList.add('item-delete')

    title.textContent = item.title;
    description.textContent = item.description;
    dueDate.textContent = item.dueDate;
    console.log(item.priority);

    priority.classList.add('priority-set')
    priority.classList.add(JSON.parse(item.priority) === 1 ? 'low-priority' : JSON.parse(item.priority) === 2 ? 'mid-priority' : 'high-priority');
    div.append(title, description, dueDate, deleteBtn, priority);
    itemArea.append(div);
    counter++;
  });
  main.append(itemArea);
}

let deleteToDoItem = (event) => {
  const index = event.target.parentNode.dataset.index
  deleteItem(currentProject, listOfProjects, index);
  refreshProject(currentProject);
}

let zoomItem = (e ,item) => {
  if (sideBarActive) {
    ActivateSidebar();
  }
  
  console.log(e.target);
  if (e.target.classList.contains('item-delete')){
    return;
  }
  let main = document.querySelector('#content')
  let contentDiv = document.createElement('div')
  let div = createModal(contentDiv);

  let title = document.createElement('h2')
  title.textContent = item.title;
  let description = document.createElement('p');
  description.textContent = item.description;
  let date = document.createElement('p');
  date.textContent = item.dueDate;


  contentDiv.append(title, description, date);
  div.append(contentDiv)
  main.append(div)
}

let createModal = (modalContent) => {
  let div = document.createElement('div');
  div.classList.add('modal');

  window.onclick = (event) => {
    if(event.target === div) {
      div.remove();
    }
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
      console.log('test')
      div.remove();
    }
  })
  modalContent.classList.add('modal-content')
  return div;
}

let ActivateSidebar = () => {
  console.log('test')
  let main = document.querySelector('#content');
  let sideBar = document.querySelector('.sidebar');

  if (sideBarActive) {
    sideBar.style.width = '0';
    main.style.marginRight = '0';
    sideBarActive = false;
    return;
  }
  
  sideBarActive = true;

  sideBar.style.width = '250px';
  main.style.marginRight = '250px'

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape')
    {
      sideBar.style.width = '0';
      main.style.marginRight = '0';
      sideBarActive = false
    }

  });



}

let makeColorSection = () => {
  let colorDiv = document.createElement('div');
  let blueColor = document.createElement('div');
  let redColor = document.createElement('div');
  let greenColor = document.createElement('div');
  let orangeColor = document.createElement('div');

  colorDiv.classList.add('color-selection')
  blueColor.classList.add('blue-bg', 'color-square');
  redColor.classList.add('red-bg', 'color-square');
  greenColor.classList.add('green-bg', 'color-square');
  orangeColor.classList.add('orange-bg', 'color-square');

  blueColor.addEventListener('click', () => changeProjectColor('blue', currentProject.backgroundColor, currentProject.navColor))
  redColor.addEventListener('click', () => changeProjectColor('red', currentProject.backgroundColor, currentProject.navColor))
  greenColor.addEventListener('click', () => changeProjectColor('green', currentProject.backgroundColor, currentProject.navColor))
  orangeColor.addEventListener('click', () => changeProjectColor('orange', currentProject.backgroundColor, currentProject.navColor))

  colorDiv.append(blueColor, redColor, greenColor, orangeColor)

  return colorDiv;
}

let changeProjectColor = (color, currentColor, currentNavColor) => {

  const itemArea = document.querySelector('.to-do-area')
  const nav = document.querySelector('nav')

  saveProjectColor(currentProject, color, listOfProjects);

  itemArea.classList.remove(currentColor);
  nav.classList.remove(currentNavColor);

  itemArea.classList.add(currentProject.backgroundColor);
  nav.classList.add(currentProject.navColor);
  localStorage.setItem('currentProject', JSON.stringify(currentProject));

  localStorage.setItem('userProjects', JSON.stringify(listOfProjects));
}

let submitNewProject = (e) => {
  console.log(listOfProjects) 
  e.preventDefault();
  
  let projectName = document.querySelector('#projectName').value;
  if (!projectName) {
    if(!document.querySelector('.error')) {
      let err = document.createElement('p');
      err.classList.add('error');
      err.textContent = 'Project name cannot be blank!';
      document.querySelector('.sidebar').append(err);
    }
  } 
  else {
    let newProject = new Project(projectName);
    currentProject = newProject;
    addNewProject(listOfProjects, currentProject);
    refreshProject(currentProject);
  }
}

let changeProject = (event) => {

  event.preventDefault();
  listOfProjects = JSON.parse(localStorage.getItem('userProjects'));
  listOfProjects.forEach(item => {
    if(item.projectName === event.target.options[event.target.selectedIndex].value) {
      sortedSelect = 0;
      refreshProject(listOfProjects[listOfProjects.indexOf(item)])
    }
  })
}

let newItemWindow = (project) => {
  if(sideBarActive) {
    ActivateSidebar();
  }
  let main = document.querySelector("#content");
  let contentDiv = document.createElement('div');
  let div = createModal(contentDiv);

  let form = document.createElement('form');
  let title = document.createElement('input');
  let titleLabel = document.createElement('p');
  titleLabel.textContent = 'Task Name';
  title.setAttribute('id', 'title');
  title.setAttribute('type', 'text');
  title.setAttribute('placeholder', 'Taskname');

  let description = document.createElement('input');
  let descriptionLabel = document.createElement('p');
  descriptionLabel.textContent = 'Description'
  description.setAttribute('id', 'description');
  description.setAttribute('type', 'text');
  description.setAttribute('placeholder', 'Description');

  let dueDate = document.createElement('input');
  let dueDateLabel = document.createElement('p')
  dueDateLabel.textContent = 'Due Date'
  dueDate.setAttribute('id', 'dueDate');
  dueDate.setAttribute('type', 'date');

  let priority = document.createElement('input');
  let priorityLabel = document.createElement('p')
  priorityLabel.textContent = 'Priorty Level'
  priority.setAttribute('id', 'priority');
  priority.setAttribute('type', 'number');
  priority.setAttribute('min', '1')
  priority.setAttribute('max', '3')
  priority.setAttribute('placeholder', 'Priority')

  let submitForm = document.createElement('button')
  submitForm.textContent = "Create To Do";

  form.addEventListener('submit', (e) => submitNewItem(e, project));

  form.append(titleLabel, title, descriptionLabel, description, dueDateLabel, dueDate, priorityLabel, priority, submitForm)
  contentDiv.append(form);
  div.append(contentDiv);
 
  main.append(div);
}

let submitNewItem = (e, project) => {
  e.preventDefault();
  let title = document.querySelector('#title').value;
  let description = document.querySelector('#description').value;
  let dueDate = document.querySelector('#dueDate').value;
  let priority = document.querySelector('#priority').value;
 
  
  if(!title || !description || !dueDate || !priority) {
    if(!document.querySelector('.error')) {
      let err = document.createElement('p');
      err.classList.add('error');
      err.textContent = 'No field can be left blank!';
      document.querySelector('.modal-content').prepend(err);
    }
  } 
  else {
    addNewItem(listOfProjects, project, title, description, dueDate, priority)
    refreshProject(project);
  }
 
} 

let refreshProject = (project, arr = []) => {
  let main = document.querySelector("#content");
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  let sideBar = document.querySelector('.sidebar');
  while (sideBar.firstChild) {
    sideBar.removeChild(sideBar.firstChild);
  }
  createNav(project);
  if(arr.length === 0) {
    createContent(project)
  } else {
    createContent(project, arr)
  }
}

export default {initProjectView, createNav, createContent};
