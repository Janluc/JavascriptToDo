import projectView from "./projectView";
import Project from "./projectClass";
import ToDoItem from "./toDoClass"


let defaultProject = new Project("Default!");
defaultProject.toDoList.push(new ToDoItem("Test", "Some desc", "date", 1)); 

projectView.createNav(defaultProject);
projectView.createContent(defaultProject);