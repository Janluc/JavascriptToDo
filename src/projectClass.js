export default class Project {
  constructor(projectName, toDoList, backgroundColor, navColor) {
    this.projectName = projectName;
    this.toDoList = toDoList ? toDoList : [];
    this.backgroundColor = backgroundColor ? backgroundColor :'blue-bg';
    this.navColor = navColor ? navColor : 'blue-nav-bg'
  }

  sortByDate = () => {
    let arr = [...this.toDoList];
    return arr.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  }

  sortByPriority = () => {
    let arr = [...this.toDoList];
    return arr.sort((a, b) => b.priority - a.priority)
  }
}