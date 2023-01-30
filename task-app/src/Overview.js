import React, { Component } from "react";
import "./Overview.css";
import Task from "./Task";

class Overview extends Component {
    render() {
        const { tasks } = this.props;
        return (
            <div className="overview-container">
                {tasks.map((task) => {
                    return <Task key={task.id} task={task} />;
                })}
            </div>
        );
    }
}

export default Overview;
