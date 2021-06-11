import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false,
        }
    }

    onHandleCloseForm = () => {
        this.props.onCloseForm();
    }


    onChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        if(name === 'status'){
            value = e.target.value === 'true' ? true : false
        }
        this.setState({
            [name]: value
        })
    }

    onHandleSubmitForm = (e) => {
        e.preventDefault();
        this.props.onSubmitForm(this.state);
        this.onHandleReset();
        this.onHandleCloseForm();
    }

    onHandleReset = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    componentWillMount = () => {
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            })
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
            })
        }
        else if (!nextProps.task){
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    }

    render() {

        var {name, status, id} = this.state;

        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <span className="fa fa-times-circle text-right" onClick={this.onHandleCloseForm}></span>
                    <h3 className="panel-title">{id === '' ? "Thêm Công Việc" : "Cập nhật Công Việc"}</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onHandleSubmitForm}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" className="form-control" name="name" value={name} onChange={this.onChange}/>
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" required="required" name="status" value={status} onChange={this.onChange}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">{id === '' ? 'Thêm' : 'Cập nhật'}</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onHandleReset}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default TaskForm;