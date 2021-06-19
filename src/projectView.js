import Project from './projectClass';
import ToDoItem from './toDoClass';
import {format} from 'date-fns';

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
  currentProject = project;
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
  toDoBtn.addEventListener('mouseover', () => {
    toDoTimerHandle = setTimeout(() => {toDoBtn.textContent = 'New Task! ◘'}, 200)
  })
  toDoBtn.addEventListener('mouseleave', () => {
    clearTimeout(toDoTimerHandle);
    toDoBtn.textContent = '◘'
  })


  let projectBtn = document.createElement('button');
  projectBtn.textContent = '+';
  projectBtn.addEventListener('click', () => ActivateSidebar(project));

  let projectHoverHandle;
  projectBtn.addEventListener('mouseover', () => {
    projectHoverHandle = setTimeout(() => projectBtn.textContent = 'Add/Change Projects +', 200)
  })
  projectBtn.addEventListener('mouseleave', () => {
    clearTimeout(projectHoverHandle); 
    projectBtn.textContent = '+'
  })

  let deleteProjectBtn = document.createElement('button');
  deleteProjectBtn.textContent = 'X';
  deleteProjectBtn.addEventListener('click', deleteProjectAlert);

  let deleteBtnTimerHandle;
  deleteProjectBtn.addEventListener('mouseover', ()=> {
   deleteBtnTimerHandle = setTimeout(() => { deleteProjectBtn.textContent = "X Delete Project"}, 200) 
  })
  deleteProjectBtn.addEventListener('mouseleave', () => {
    clearTimeout(deleteBtnTimerHandle);
    deleteProjectBtn.textContent = 'X'
  })

  createSidebar();
  nav.append(deleteProjectBtn, projectHeader, toDoBtn, projectBtn);
  main.append(nav);
}

let createSidebar = () => {
  let contentDiv = document.createElement('div');
  let form = document.createElement('form');

  let projectName = document.createElement('input');
  projectName.setAttribute('id', 'projectName');
  projectName.setAttribute('type', 'text');
  projectName.setAttribute('placeholder', 'New Project Name');

  let submitProjectForm = document.createElement('button')
  submitProjectForm.textContent = 'Create New Project';
  submitProjectForm.addEventListener('click', submitNewProject);

  let colorDiv = makeColorSection();

  let sortDiv = document.createElement('div');
  let sortSelection = document.createElement('select');
  let noneOption = document.createElement('option');
  let priorityOption = document.createElement('option');
  let dateOption = document.createElement('option');
  let prioDateOption = document.createElement('option');
  noneOption.textContent = 'None';
  priorityOption.textContent = 'By Priority';
  dateOption.textContent = 'By Date';
  prioDateOption.textContent = 'Both Priority and Date'
  
  sortSelection.addEventListener('change', (e) => {
    if (e.target.options[e.target.selectedIndex].value === 'None') {
      sortedSelect = 0;
      refreshProject(currentProject)
    }
    else if (e.target.options[e.target.selectedIndex].value === 'By Priority'){
      sortedSelect = 1;
      refreshProject(currentProject, sortByPriority(currentProject));
    } 
    else if (e.target.options[e.target.selectedIndex].value === 'By Date') {
      sortedSelect = 2;
      refreshProject(currentProject, sortByDate(currentProject));
    } else {
      sortedSelect = 3;
      let project = new Project(currentProject.projectName);
      project.toDoList = sortByDate(currentProject)
      let newArr = sortByPriority(project);
      console.log(newArr);
      refreshProject(currentProject, newArr);
    }
  })
  

  sortSelection.add(noneOption);
  sortSelection.add(priorityOption);
  sortSelection.add(dateOption);
  sortSelection.add(prioDateOption);
  
  sortDiv.append(sortSelection);

  sortSelection.options[sortedSelect].selected = 'selected';
  
  let selection = document.createElement('select');
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
  contentDiv.append(selection, sortDiv, colorDiv, form);
  
  document.querySelector('.sidebar').append(contentDiv);
}

let deleteProjectAlert = () => {
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

let sortByDate = (project) => {
  let newArr = new Project(project.projectName);
  newArr.toDoList = [...project.toDoList]
  newArr.toDoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  return newArr.toDoList;
}

let sortByPriority = (project) => {
  let newArr = new Project(project.projectName);
  newArr.toDoList = [...project.toDoList]
  newArr.toDoList.sort((a, b) => b.priority - a.priority)
  return newArr.toDoList;
}

let deleteToDoItem = (event) => {
  const index = event.target.parentNode.dataset.index
  currentProject.toDoList.splice(index, 1);
  listOfProjects.forEach(item => {
    if (item.projectName === currentProject.projectName) {
        item = currentProject
        return;
    }
  })

  localStorage.setItem('userProjects', JSON.stringify(listOfProjects));
  refreshProject(currentProject);
}

let zoomItem = (e ,item) => {
  console.log(e.target);
  if (e.target.classList.contains('item-delete')){
    return;
  }
  let main = document.querySelector('#content')
  let contentDiv = document.createElement('div')
  let div = createModal(contentDiv);

  let title = document.createElement('input')
  title.setAttribute('id', 'title');
  title.setAttribute('type', 'input')
  title.value = item.title;
  title.addEventListener('change', () => {item.title = title.value;})
  let description = document.createElement('textarea');
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

      document.removeEventListener('keydown', false);
    }
  })
  modalContent.classList.add('modal-content')
  return div;
}

let ActivateSidebar = () => {
  sideBarActive = true;
  
  let main = document.querySelector('#content');

  let sideBar = document.querySelector('.sidebar');


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
  if(color === 'blue') {
    currentProject.backgroundColor = 'blue-bg';
    currentProject.navColor = 'blue-nav-bg';
  }
  if(color === 'red') {
    currentProject.backgroundColor = 'red-bg';
    currentProject.navColor = 'red-nav-bg';
  }
  if(color === 'green') {
    currentProject.backgroundColor = 'green-bg';
    currentProject.navColor = 'green-nav-bg';
  }
  if(color === 'orange') {
    currentProject.backgroundColor = 'orange-bg';
    currentProject.navColor = 'orange-nav-bg';
  }
  const itemArea = document.querySelector('.to-do-area')
  const nav = document.querySelector('nav')
  listOfProjects.forEach(item => {
    if (item.projectName === currentProject.projectName) {
      item = currentProject
      console.log(currentProject)
    }
  })

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
  let newProject = new Project(projectName);
  currentProject = newProject;
  listOfProjects.push(currentProject);
  
  localStorage.setItem('userProjects', JSON.stringify(listOfProjects));
  localStorage.setItem('currentProject', JSON.stringify(currentProject));
  refreshProject(currentProject);
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

  form.addEventListener('submit', (e) => submitNewItem(e, project));

  form.append(title, description, dueDate, priority, submitForm)
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
      let err = document.createElement('p')
      err.classList.add('error');
      err.textContent = 'No field can be left blank!';
      document.querySelector('form').prepend(err);
    }
    
  } else {
    let date = new Date(dueDate);
    project.toDoList.push(new ToDoItem(title, description, format(new Date(date.getTime() + date.getTimezoneOffset() * 60000), 'M/d/yyyy'), priority));
    listOfProjects.forEach(item => {
      if (item.projectName === project.projectName) {
          item.toDoList = project.toDoList;
          console.log('added new item');
      }
    })
    localStorage.setItem('userProjects', JSON.stringify(listOfProjects));
    console.log(listOfProjects);
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
