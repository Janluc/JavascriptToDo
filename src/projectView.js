import Project from './projectClass';
import toDoItem from './toDoClass';

let createProject = () => {
  let mainContent = document.querySelector("#content")
  let content = document.createElement('h1');
  content.textContent = "Test";
  
  mainContent.append(content);
}

export default createProject;