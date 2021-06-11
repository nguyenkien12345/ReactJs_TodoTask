import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {

    constructor(props){
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    onChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus,
        );
        this.setState({
            [name]: value
        });
    }

    render() {
        
        var {tasks, onUpdateStatus, onDelete, onUpdate} = this.props;

        var elmTasks = tasks.map((task,index) => {
            return (
                <TaskItem
                    key={task.id}
                    index={index}
                    task={task}
                    onUpdateStatus={onUpdateStatus}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            )
        })

        var {filterName, filterStatus} = this.state;

        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="text" className="form-control" name="filterName" value={filterName} onChange={this.onChange}/>
                                </td>
                                <td>
                                    <select className="form-control" name="filterStatus" value={filterStatus} onChange={this.onChange}>
                                        <option  value={-1}>Tất Cả</option>
                                        <option  value={1}>Xong</option>
                                        <option  value={0}>Chưa xong</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {/* TaskItem */}
                            {elmTasks}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TaskList;