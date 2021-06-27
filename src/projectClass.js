export default class Project {
  constructor(projectName, toDoList, backgroundColor, navColor) {
    this.projectName = projectName;
    this.toDoList = toDoList || [];
    this.backgroundColor = backgroundColor || 'blue-bg';
    this.navColor = navColor || 'blue-nav-bg';
  }

  sortByDate = () => {
    const arr = [...this.toDoList];
    return arr.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  sortByPriority = () => {
    const arr = [...this.toDoList];
    return arr.sort((a, b) => b.priority - a.priority);
  }
}