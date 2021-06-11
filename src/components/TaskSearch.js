import React, { Component } from 'react';

class TaskSearch extends Component {

    constructor(props){
        super(props);
        this.state = {
            keyword: ''
        };
    }

    onChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    onReset = () => {
        this.setState({
            keyword: ''
        })
    }

    onHandleSearch = () => {
        this.props.onSearch(this.state.keyword.toLowerCase());
        this.onReset();
    }

    render() {

        var {keyword} = this.state;

        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Nhập từ khóa..." name="keyword" value={keyword} onChange={this.onChange}/>
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="submit" onClick={this.onHandleSearch}>
                            <span className="fa fa-search mr-5"></span>Tìm kiếm
                        </button>
                    </span>
                </div>
            </div>
        )
    }
}

export default TaskSearch;