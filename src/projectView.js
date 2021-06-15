import Project from './projectClass';
import ToDoItem from './toDoClass';


let createNav = (project) => {
  let main = document.querySelector("#content");
  let test = document.createElement('h1')
  test.textContent = project.projectName;
  
  main.append(test)

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

export default {createNav, createContent};