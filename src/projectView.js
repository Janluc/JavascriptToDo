import Project from './projectClass';
import {
  deleteItem, saveProjectColor, addNewProject, addNewItem,
} from './storedProjectManager';

let listOfProjects;
let currentProject;
let sortedSelect = 0;
let sideBarActive = false;

const refreshProject = (project, arr = []) => {
  const main = document.querySelector('#content');
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  const sideBar = document.querySelector('.sidebar');
  while (sideBar.firstChild) {
    sideBar.removeChild(sideBar.firstChild);
  }
  createNav(project); // eslint-disable-line
  if (arr.length === 0) {
    createContent(project); // eslint-disable-line
  } else {
    createContent(project, arr); // eslint-disable-line
  }
};

const createModal = (modalContent) => {
  const div = document.createElement('div');
  div.classList.add('modal');

  window.onclick = (event) => {
    if (event.target === div) {
      div.remove();
    }
  };
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      div.remove();
    }
  });
  modalContent.classList.add('modal-content');
  return div;
};

const ActivateSidebar = () => {
  const main = document.querySelector('#content');
  const sideBar = document.querySelector('.sidebar');

  if (sideBarActive) {
    sideBar.style.width = '0';
    main.style.marginRight = '0';
    sideBarActive = false;
    return;
  }

  sideBarActive = true;

  sideBar.style.width = '250px';
  main.style.marginRight = '250px';

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      sideBar.style.width = '0';
      main.style.marginRight = '0';
      sideBarActive = false;
    }
  });
};

const deleteProjectConfirmation = () => {
  for (const item in listOfProjects) { // eslint-disable-line
    if (listOfProjects[item] === currentProject) {
      listOfProjects.splice(item, 1);
    }
  }
  localStorage.setItem('userProjects', JSON.stringify(listOfProjects));
  [currentProject] = listOfProjects;

  refreshProject(currentProject);
};

const deleteProjectAlert = () => {
  if (sideBarActive) {
    ActivateSidebar();
  }
  const main = document.querySelector('#content');
  const contentDiv = document.createElement('div');
  const div = createModal(contentDiv);

  const warningTitle = document.createElement('h3');
  warningTitle.textContent = 'Are you sure you would like to delete this project?';

  const warningBtn = document.createElement('button');
  warningBtn.textContent = `Yes, delete ${currentProject.projectName}`;
  warningBtn.addEventListener('click', deleteProjectConfirmation);

  contentDiv.append(warningTitle, warningBtn);

  div.append(contentDiv);
  main.append(div);
};

const sortItems = (e) => {
  if (e.target.options[e.target.selectedIndex].value === 'None') {
    sortedSelect = 0;
    refreshProject(currentProject);
  } else if (e.target.options[e.target.selectedIndex].value === 'By Priority') {
    sortedSelect = 1;
    refreshProject(currentProject, currentProject.sortByPriority());
  } else if (e.target.options[e.target.selectedIndex].value === 'By Date') {
    sortedSelect = 2;
    refreshProject(currentProject, currentProject.sortByDate());
  } else {
    sortedSelect = 3;
    const project = new Project(currentProject.projectName);
    project.toDoList = currentProject.sortByDate();
    const newArr = project.sortByPriority();
    refreshProject(currentProject, newArr);
  }
};

const submitNewProject = (e) => {
  e.preventDefault();

  const projectName = document.querySelector('#projectName').value;
  if (!projectName) {
    if (!document.querySelector('.error')) {
      const err = document.createElement('p');
      err.classList.add('error');
      err.textContent = 'Project name cannot be blank!';
      document.querySelector('.sidebar').append(err);
    }
  } else {
    const newProject = new Project(projectName);
    currentProject = newProject;
    addNewProject(listOfProjects, currentProject);
    refreshProject(currentProject);
  }
};

const changeProjectColor = (color, currentColor, currentNavColor) => {
  const itemArea = document.querySelector('.to-do-area');
  const nav = document.querySelector('nav');

  saveProjectColor(currentProject, color, listOfProjects);

  itemArea.classList.remove(currentColor);
  nav.classList.remove(currentNavColor);

  itemArea.classList.add(currentProject.backgroundColor);
  nav.classList.add(currentProject.navColor);
  localStorage.setItem('currentProject', JSON.stringify(currentProject));

  localStorage.setItem('userProjects', JSON.stringify(listOfProjects));
};

const makeColorSection = () => {
  const colorDiv = document.createElement('div');
  const blueColor = document.createElement('div');
  const redColor = document.createElement('div');
  const greenColor = document.createElement('div');
  const orangeColor = document.createElement('div');

  colorDiv.classList.add('color-selection');
  blueColor.classList.add('blue-bg', 'color-square');
  redColor.classList.add('red-bg', 'color-square');
  greenColor.classList.add('green-bg', 'color-square');
  orangeColor.classList.add('orange-bg', 'color-square');

  blueColor.addEventListener('click', () => changeProjectColor('blue', currentProject.backgroundColor, currentProject.navColor));
  redColor.addEventListener('click', () => changeProjectColor('red', currentProject.backgroundColor, currentProject.navColor));
  greenColor.addEventListener('click', () => changeProjectColor('green', currentProject.backgroundColor, currentProject.navColor));
  orangeColor.addEventListener('click', () => changeProjectColor('orange', currentProject.backgroundColor, currentProject.navColor));

  colorDiv.append(blueColor, redColor, greenColor, orangeColor);

  return colorDiv;
};

const changeProject = (event) => {
  event.preventDefault();
  listOfProjects = JSON.parse(localStorage.getItem('userProjects'));
  listOfProjects.forEach((item) => {
    if (item.projectName === event.target.options[event.target.selectedIndex].value) {
      sortedSelect = 0;
      refreshProject(listOfProjects[listOfProjects.indexOf(item)]);
    }
  });
};

const createSidebar = () => {
  const contentDiv = document.createElement('div');
  const form = document.createElement('form');

  const projectNameLabel = document.createElement('p');
  const projectName = document.createElement('input');
  projectNameLabel.textContent = 'Create a New Project!';
  projectName.setAttribute('id', 'projectName');
  projectName.setAttribute('type', 'text');
  projectName.setAttribute('placeholder', 'New Project Name');

  const submitProjectForm = document.createElement('button');
  submitProjectForm.textContent = 'Create New Project';
  submitProjectForm.addEventListener('click', submitNewProject);

  const colorLabel = document.createElement('p');
  const colorDiv = makeColorSection();
  colorLabel.textContent = 'Choose a Project color!';

  const sortDiv = document.createElement('div');
  const sortLabel = document.createElement('p');
  const sortSelection = document.createElement('select');
  const noneOption = document.createElement('option');
  const priorityOption = document.createElement('option');
  const dateOption = document.createElement('option');
  const prioDateOption = document.createElement('option');

  sortLabel.textContent = 'Sort Items';
  noneOption.textContent = 'None';
  priorityOption.textContent = 'By Priority';
  dateOption.textContent = 'By Date';
  prioDateOption.textContent = 'Both Priority and Date';

  sortSelection.addEventListener('change', sortItems);

  sortSelection.add(noneOption);
  sortSelection.add(priorityOption);
  sortSelection.add(dateOption);
  sortSelection.add(prioDateOption);

  sortDiv.append(sortLabel, sortSelection);

  sortSelection.options[sortedSelect].selected = 'selected';

  const selectionLabel = document.createElement('p');
  const selection = document.createElement('select');
  selectionLabel.textContent = 'Choose a Project!';
  listOfProjects.forEach((item) => {
    const option = document.createElement('option');
    option.textContent = item.projectName;
    selection.add(option);
  });
  selection.addEventListener('change', changeProject);

  for (const i in listOfProjects) { // eslint-disable-line
    if (selection.options[i].value === currentProject.projectName) {
      selection.options[i].selected = 'selected';
    }
  }

  form.append(projectName, submitProjectForm);
  contentDiv.append(selectionLabel,
    selection,
    sortDiv,
    colorLabel,
    colorDiv,
    projectNameLabel,
    form);

  document.querySelector('.sidebar').append(contentDiv);
};

const initProjectView = (userProjects) => {
  if (localStorage.getItem('userProjects')) {
    listOfProjects = JSON.parse(localStorage.getItem('userProjects'));
    currentProject = JSON.parse(localStorage.getItem('currentProject'));
  } else {
    listOfProjects = userProjects;
    [currentProject] = listOfProjects;
    localStorage.setItem('currentProject', JSON.stringify(currentProject));
  }
};
const deleteToDoItem = (event) => {
  const { index } = event.target.parentNode.dataset;
  deleteItem(currentProject, listOfProjects, index);
  refreshProject(currentProject);
};

const zoomItem = (e, item) => {
  if (sideBarActive) {
    ActivateSidebar();
  }

  if (e.target.classList.contains('item-delete')) {
    return;
  }
  const main = document.querySelector('#content');
  const contentDiv = document.createElement('div');
  const div = createModal(contentDiv);

  const title = document.createElement('h2');
  title.textContent = item.title;
  const description = document.createElement('p');
  description.textContent = item.description;
  const date = document.createElement('p');
  date.textContent = item.dueDate;

  contentDiv.append(title, description, date);
  div.append(contentDiv);
  main.append(div);
};

const submitNewItem = (e, project) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const dueDate = document.querySelector('#dueDate').value;
  const priority = document.querySelector('#priority').value;

  if (!title || !description || !dueDate || !priority) {
    if (!document.querySelector('.error')) {
      const err = document.createElement('p');
      err.classList.add('error');
      err.textContent = 'No field can be left blank!';
      document.querySelector('.modal-content').prepend(err);
    }
  } else {
    addNewItem(listOfProjects, project, title, description, dueDate, priority);
    refreshProject(project);
  }
};

const newItemWindow = (project) => {
  if (sideBarActive) {
    ActivateSidebar();
  }
  const main = document.querySelector('#content');
  const contentDiv = document.createElement('div');
  const div = createModal(contentDiv);

  const form = document.createElement('form');
  const title = document.createElement('input');
  const titleLabel = document.createElement('p');
  titleLabel.textContent = 'Task Name';
  title.setAttribute('id', 'title');
  title.setAttribute('type', 'text');
  title.setAttribute('placeholder', 'Taskname');

  const description = document.createElement('input');
  const descriptionLabel = document.createElement('p');
  descriptionLabel.textContent = 'Description';
  description.setAttribute('id', 'description');
  description.setAttribute('type', 'text');
  description.setAttribute('placeholder', 'Description');

  const dueDate = document.createElement('input');
  const dueDateLabel = document.createElement('p');
  dueDateLabel.textContent = 'Due Date';
  dueDate.setAttribute('id', 'dueDate');
  dueDate.setAttribute('type', 'date');

  const priority = document.createElement('input');
  const priorityLabel = document.createElement('p');
  priorityLabel.textContent = 'Priorty Level';
  priority.setAttribute('id', 'priority');
  priority.setAttribute('type', 'number');
  priority.setAttribute('min', '1');
  priority.setAttribute('max', '3');
  priority.setAttribute('placeholder', 'Priority');

  const submitForm = document.createElement('button');
  submitForm.textContent = 'Create To Do';

  form.addEventListener('submit', (e) => submitNewItem(e, project));

  form.append(titleLabel, title,
    descriptionLabel, description,
    dueDateLabel, dueDate,
    priorityLabel, priority,
    submitForm);
  contentDiv.append(form);
  div.append(contentDiv);

  main.append(div);
};

const createNav = (project) => {
  currentProject = new Project(
    project.projectName,
    project.toDoList,
    project.backgroundColor,
    project.navColor,
  );

  localStorage.setItem('currentProject', JSON.stringify(currentProject));

  const main = document.querySelector('#content');
  const nav = document.createElement('nav');
  const projectHeader = document.createElement('h1');
  projectHeader.textContent = project.projectName;
  projectHeader.classList.add('project-title');
  nav.classList.add(project.navColor);

  const toDoBtn = document.createElement('button');
  toDoBtn.textContent = '◘';
  toDoBtn.addEventListener('click', () => newItemWindow(project));
  let toDoTimerHandle;
  toDoBtn.addEventListener('mouseover', () => { toDoTimerHandle = setTimeout(() => { toDoBtn.textContent = 'New Task! ◘'; }, 200); });
  toDoBtn.addEventListener('mouseleave', () => { clearTimeout(toDoTimerHandle); toDoBtn.textContent = '◘'; });

  const projectBtn = document.createElement('button');
  projectBtn.textContent = '+';
  projectBtn.addEventListener('click', () => ActivateSidebar(project));

  let projectHoverHandle;
  projectBtn.addEventListener('mouseover', () => { projectHoverHandle = setTimeout(() => { projectBtn.textContent = 'Add/Change Projects +'; }, 200); });
  projectBtn.addEventListener('mouseleave', () => { clearTimeout(projectHoverHandle); projectBtn.textContent = '+'; });

  const deleteProjectBtn = document.createElement('button');
  deleteProjectBtn.textContent = 'X';
  deleteProjectBtn.addEventListener('click', deleteProjectAlert);

  let deleteBtnTimerHandle;
  deleteProjectBtn.addEventListener('mouseover', () => { deleteBtnTimerHandle = setTimeout(() => { deleteProjectBtn.textContent = 'X Delete Project'; }, 200); });
  deleteProjectBtn.addEventListener('mouseleave', () => { clearTimeout(deleteBtnTimerHandle); deleteProjectBtn.textContent = 'X'; });

  createSidebar();
  nav.append(deleteProjectBtn, projectHeader, toDoBtn, projectBtn);
  main.append(nav);
};

const createContent = (project, list = []) => {
  const main = document.querySelector('#content');
  let counter = 0;
  const itemArea = document.createElement('div');
  let arr;
  itemArea.classList.add('to-do-area');
  itemArea.classList.add(project.backgroundColor);
  if (sideBarActive) {
    main.style.marginRight = '250px';
  }

  if (list.length === 0) {
    arr = project.toDoList;
  } else {
    arr = list;
  }

  arr.forEach((item) => {
    const div = document.createElement('div');
    div.setAttribute('data-index', counter);
    div.classList.add('to-do-item');

    div.addEventListener('click', (e) => zoomItem(e, item));

    const title = document.createElement('h3');
    const description = document.createElement('p');
    const dueDate = document.createElement('p');
    dueDate.classList.add('item-date');
    const priority = document.createElement('span');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', deleteToDoItem);
    deleteBtn.classList.add('item-delete');

    title.textContent = item.title;
    description.textContent = item.description;
    dueDate.textContent = item.dueDate;

    priority.classList.add('priority-set');
    priority.classList.add(JSON.parse(item.priority) === 1 ? 'low-priority' : JSON.parse(item.priority) === 2 ? 'mid-priority' : 'high-priority'); // eslint-disable-line
    div.append(title, description, dueDate, deleteBtn, priority);
    itemArea.append(div);
    counter += 1;
  });
  main.append(itemArea);
};

export default { initProjectView, createNav, createContent };
