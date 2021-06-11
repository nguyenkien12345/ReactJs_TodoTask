import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskControl from './components/TaskControl';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      isEdit: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sortBy: 'name',
      sortValue: 1
    }
  }

  componentWillMount = () => {
    if(localStorage.getItem("tasks")){
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks : tasks
      });
    }
  }

  randomString = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  
  generateID = () => {
    return (
      this.randomString() +
      "-" +
      this.randomString() +
      "-" +
      this.randomString() +
      "-" +
      this.randomString() +
      "-" +
      this.randomString()
    );
  }

  onHandleToggleForm = () => {
    if(this.state.isDisplayForm && this.state.isEdit !== null){
      this.setState({
        isDisplayForm: true,
        isEdit: null
      })
    }
    else{
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        isEdit: null
      })
    }
  }

  onHandleCloseForm = () => {
    this.setState({
      isDisplayForm: false
    })
  }

  onHandleShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }

  onSubmitForm = (data) => {
    var {tasks} = this.state;
    if(data.id === ''){
      data.id = this.generateID();
      tasks.push(data);
    }
    else{
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      isEdit: null
    })
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }

  findIndex = (id) => {
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task,index) => {
      if(task.id === id){
        result = index;
      }
    });
    return result;
  }

  onUpdateStatus = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks[index].status = !tasks[index].status
    };
    this.setState({
      tasks: tasks
    });
    localStorage.setItem("tasks",JSON.stringify(tasks))
  }

  onDelete = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks.splice(index,1)
    };
    this.setState({
      tasks: tasks
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }

  onUpdate = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    var isEdit = tasks[index];
    this.setState({
      isEdit: isEdit
    });
    this.onHandleShowForm();
  }

  onFilter = (filterName,filterStatus) => {
    filterStatus = parseInt(filterStatus);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      }
    })
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    })
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    });
  }

  render() {

    var {tasks, isDisplayForm, isEdit, filter, keyword, sortBy, sortValue} = this.state;

    var elmTaskForm = isDisplayForm ? <TaskForm onCloseForm={this.onHandleCloseForm} onSubmitForm={this.onSubmitForm} task={isEdit}/> : ""

    // Filter 
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1; 
        });
      }
      tasks = tasks.filter((task) => { 
        if (filter.status === -1) {
          return task; 
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }

    // Search
    if(keyword){
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1
      })
    } 

    // Sort
    if(sortBy === 'name'){
      tasks.sort((a,b) =>{
        if(a.name > b.name) return sortValue; 
        else if(a.name < b.name) return -sortValue; 
        else return 0;
      });
    }
    else{
      tasks.sort((a,b) =>{
        if(a.status > b.status) return -sortValue; 
        else if(a.status < b.status) return sortValue; 
        else return 0;
      });
    }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
            {/* TaskForm */}
            {elmTaskForm}
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.onHandleToggleForm}>
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            {/* Control */}
            <TaskControl onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>
            {/* TaskList */}
            <TaskList tasks={tasks} onUpdateStatus={this.onUpdateStatus} onDelete={this.onDelete} onUpdate={this.onUpdate} onFilter={this.onFilter}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
