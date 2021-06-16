import projectView from "./projectView";
import Project from "./projectClass";
import ToDoItem from "./toDoClass";
import './style.css';

let userProjects = []
let defaultProject = new Project("Default!");
defaultProject.toDoList.push(new ToDoItem("Test", "Some desc", "date", 1)); 

userProjects.push(defaultProject);

projectView.initProjectView(userProjects);
projectView.createNav(defaultProject);
projectView.createContent(defaultProject);