import { format } from 'date-fns';
import projectView from './projectView';
import Project from './projectClass';
import ToDoItem from './toDoClass';
import './style.css';

let userProjects = [];
if (localStorage.getItem('userProjects')) {
  userProjects = JSON.parse(localStorage.getItem('userProjects'));
  const currentProject = JSON.parse(localStorage.getItem('currentProject'));
  projectView.initProjectView(userProjects);
  projectView.createNav(currentProject);
  projectView.createContent(currentProject);
} else {
  const defaultProject = new Project('Default!');
  defaultProject.toDoList.push(new ToDoItem('Test', 'Some desc', format(new Date(2021, 6, 24), 'M/d/yyyy'), 1));

  userProjects.push(defaultProject);
  localStorage.setItem('userProjects', JSON.stringify(userProjects));

  projectView.initProjectView(userProjects);
  projectView.createNav(userProjects[0]);
  projectView.createContent(userProjects[0]);
}
