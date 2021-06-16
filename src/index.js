import projectView from "./projectView";
import Project from "./projectClass";
import ToDoItem from "./toDoClass";
import './style.css';

let userProjects = []
if(localStorage.getItem('userProjects')){

  userProjects = JSON.parse(localStorage.getItem('userProjects'));
  let currentProject = JSON.parse(localStorage.getItem('currentProject'));
  projectView.initProjectView(userProjects);
  projectView.createNav(currentProject);
  projectView.createContent(currentProject);
} else {
  
  let defaultProject = new Project("Default!");
  defaultProject.toDoList.push(new ToDoItem("Test", "Some desc", "date", 1)); 
  
  userProjects.push(defaultProject);
  localStorage.setItem('userProjects', JSON.stringify(userProjects));

  projectView.initProjectView(userProjects);
  projectView.createNav(userProjects[0]);
  projectView.createContent(userProjects[0]);
}


