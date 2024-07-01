import { useEffect, useState } from 'react';
import Web3 from 'web3';
import BlockTaskerContract from './contracts/BlockTasker.json';
import { ThemeProvider } from '@mui/material/styles';
import { Container, TextField, Button, Checkbox, List, ListItem, ListItemText, CssBaseline, Paper, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import theme from './theme';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        if (window.ethereum) {
          console.log('Ethereum provider detected. Requesting account access...');
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          console.log('Accounts:', accounts);
          setAccount(accounts[0]);

          const networkId = await web3.eth.net.getId();
          console.log('Network ID:', networkId);
          const deployedNetwork = BlockTaskerContract.networks[networkId];
          const instance = new web3.eth.Contract(
            BlockTaskerContract.abi,
            deployedNetwork && deployedNetwork.address,
          );

          setContract(instance);

          const taskCount = await instance.methods.getTaskCount().call({ from: accounts[0] });
          console.log('Task Count:', taskCount);
          let tasks = [];
          for (let i = 1; i <= taskCount; i++) {
            const task = await instance.methods.getTask(i).call({ from: accounts[0] });
            console.log(`Task ${i}:`, task);
            tasks.push(task);
          }
          tasks.reverse();
          console.log('Tasks:', tasks);
          setTasks(tasks);
        } else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    init();
  }, []);

  const createTask = async (content) => {
    try {
      console.log('Creating task with content:', content);
      await contract.methods.createTask(content).send({ from: account });
      const taskCount = await contract.methods.getTaskCount().call({ from: account });
      const task = await contract.methods.getTask(taskCount).call({ from: account });
      console.log('New task created:', task);
      setTasks([task, ...tasks]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const toggleCompleted = async (id) => {
    try {
      console.log('Toggling completion for task ID:', id);
      await contract.methods.toggleCompleted(id).send({ from: account });
      const updatedTasks = tasks.map(task => {
        if (task.id === id) {
          task.completed = !task.completed;
        }
        return task;
      });
      console.log('Task completion toggled:', updatedTasks.find(task => task.id === id));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log('Deleting task ID:', id);
      await contract.methods.deleteTask(id).send({ from: account });
      const updatedTasks = tasks.filter(task => task.id !== id);
      console.log('Task deleted:', id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with input value:', inputValue);
    createTask(inputValue);
    setInputValue('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Paper style={{ marginTop: '20px', padding: '20px' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="New Task"
              variant="outlined"
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            <Button type="submit" variant="contained" color="primary">
              Add Task
            </Button>
          </form>
        </Paper>
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index} dense button>
              <Checkbox
                checked={task.completed}
                tabIndex={-1}
                disableRipple
                onChange={() => toggleCompleted(task.id)}
                style={{ color: '#90caf9' }}
              />
              <ListItemText primary={task.content} />
              <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
};

export default App;
