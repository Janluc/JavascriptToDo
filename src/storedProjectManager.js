import { format } from 'date-fns';
import ToDoItem from './toDoClass';

const deleteItem = (currentProject, listOfProjects, index) => {
  currentProject.toDoList.splice(index, 1);
  listOfProjects.forEach((item) => {
    if (item.projectName === currentProject.projectName) {
      item = currentProject;
    }
  });

  localStorage.setItem('userProjects', JSON.stringify(listOfProjects));
};

const saveProjectColor = (currentProject, color, listOfProjects) => {
  if (color === 'blue') {
    currentProject.backgroundColor = 'blue-bg';
    currentProject.navColor = 'blue-nav-bg';
  }
  if (color === 'red') {
    currentProject.backgroundColor = 'red-bg';
    currentProject.navColor = 'red-nav-bg';
  }
  if (color === 'green') {
    currentProject.backgroundColor = 'green-bg';
    currentProject.navColor = 'green-nav-bg';
  }
  if (color === 'orange') {
    currentProject.backgroundColor = 'orange-bg';
    currentProject.navColor = 'orange-nav-bg';
  }

  listOfProjects.forEach((item) => {
    if (item.projectName === currentProject.projectName) {
      item = currentProject;
    }
  });

  localStorage.setItem('currentProject', JSON.stringify(currentProject));
  localStorage.setItem('userProjects', JSON.stringify(listOfProjects));
};

const addNewProject = (listOfProjects, currentProject) => {
  listOfProjects.push(currentProject);

  localStorage.setItem('userProjects', JSON.stringify(listOfProjects));
  localStorage.setItem('currentProject', JSON.stringify(currentProject));
};

const addNewItem = (listOfProjects, project, title, description, dueDate, priority) => {
  const date = new Date(dueDate);
  project.toDoList.push(new ToDoItem(title, description, format(new Date(date.getTime() + date.getTimezoneOffset() * 60000), 'M/d/yyyy'), priority));
  listOfProjects.forEach((item) => {
    if (item.projectName === project.projectName) {
      item.toDoList = project.toDoList;
    }
  });
  localStorage.setItem('userProjects', JSON.stringify(listOfProjects));
};

export {
  deleteItem, saveProjectColor, addNewProject, addNewItem,
};