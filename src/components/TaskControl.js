import React, { Component } from 'react';
import TaskSearch from './TaskSearch';
import TaskSort from './TaskSort';

class TaskControl extends Component {

    render() {

        var {onSearch, onSort, sortBy, sortValue} = this.props;

        return (
            <div className="row mt-15">
                <TaskSearch onSearch={onSearch}/>
                <TaskSort onSort={onSort} sortBy={sortBy} sortValue={sortValue}/>
            </div>

        )
    }
}

export default TaskControl;