// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockTasker {
    struct Task {
        uint id;
        string content;
        bool completed;
        bool exists;
    }

    mapping(address => mapping(uint => Task)) private tasks;
    mapping(address => uint) private taskCount;

    event TaskCreated(uint id, string content, bool completed);

    event TaskCompleted(uint id, bool completed);

    event TaskDeleted(uint id);

    function createTask(string memory _content) public {
        taskCount[msg.sender]++;
        uint taskId = taskCount[msg.sender];
        tasks[msg.sender][taskId] = Task(taskId, _content, false, true);
        emit TaskCreated(taskId, _content, false);
    }

    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[msg.sender][_id];
        _task.completed = !_task.completed;
        tasks[msg.sender][_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }

    function deleteTask(uint _id) public {
        require(tasks[msg.sender][_id].exists, "Task does not exist");
        tasks[msg.sender][_id].exists = false;
        emit TaskDeleted(_id);
    }

    function getTask(uint _taskId) public view returns (Task memory) {
        require(tasks[msg.sender][_taskId].exists, "Task does not exist");
        return tasks[msg.sender][_taskId];
    }

    function getTaskCount() public view returns (uint) {
        return taskCount[msg.sender];
    }
}
