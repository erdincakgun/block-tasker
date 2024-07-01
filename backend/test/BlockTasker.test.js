const BlockTasker = artifacts.require('./BlockTasker.sol');

contract('BlockTasker', (accounts) => {
  before(async () => {
    this.blockTasker = await BlockTasker.deployed();
  });

  it('deploys successfully', async () => {
    const address = await this.blockTasker.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it('creates the first task', async () => {
    const result = await this.blockTasker.createTask('A new task', { from: accounts[0] });
    const taskCount = await this.blockTasker.getTaskCount({ from: accounts[0] });
    assert.equal(taskCount.toNumber(), 1);

    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.content, 'A new task');
    assert.equal(event.completed, false);
  });

  it('lists tasks', async () => {
    const taskCount = await this.blockTasker.getTaskCount({ from: accounts[0] });
    const task = await this.blockTasker.getTask(taskCount, { from: accounts[0] });
    assert.equal(task.id.toString(), taskCount.toString());
    assert.equal(task.content, 'A new task');
    assert.equal(task.completed, false);
  });

  it('creates tasks', async () => {
    const result = await this.blockTasker.createTask('Another new task', { from: accounts[0] });
    const taskCount = await this.blockTasker.getTaskCount({ from: accounts[0] });
    assert.equal(taskCount.toNumber(), 2);

    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 2);
    assert.equal(event.content, 'Another new task');
    assert.equal(event.completed, false);
  });

  it('toggles task completion', async () => {
    const taskId = 1;
    const result = await this.blockTasker.toggleCompleted(taskId, { from: accounts[0] });
    const task = await this.blockTasker.getTask(taskId, { from: accounts[0] });
    assert.equal(task.completed, true);

    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), taskId);
    assert.equal(event.completed, true);
  });

  it('deletes tasks', async () => {
    const taskId = 1;
    const result = await this.blockTasker.deleteTask(taskId, { from: accounts[0] });
    const taskCount = await this.blockTasker.getTaskCount({ from: accounts[0] });
    assert.equal(taskCount.toNumber(), 2);

    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), taskId);

    try {
      await this.blockTasker.getTask(taskId, { from: accounts[0] });
      assert.fail("The task should not exist");
    } catch (error) {
      assert(error.message.includes("Task does not exist"), "Expected 'Task does not exist' error");
    }
  });
});
