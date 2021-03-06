import React, { Component } from 'react';

class TaskItem extends Component {

    onHandleUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onHandleDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    onHandleUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

    render() {

        var {task, index} = this.props;

        return (
            <tr>
                <td>{index}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span className={task.status ? "label label-success" : "label label-danger"} onClick={this.onHandleUpdateStatus}>
                       {task.status ? "Xong" : "Chưa xong"}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onHandleUpdate}>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onHandleDelete}>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        )
    }
}

export default TaskItem;