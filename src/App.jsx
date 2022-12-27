import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };

    console.log('constructor()');
  }

  componentDidMount() {
    console.log('componentDidMount()');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users =>
        this.setState(
          () => ({ monsters: users }),
          () => console.log(this.state)
        )
      );
  }

  onSearchChange = e => {
    const searchField = e.target.value.toLowerCase();
    this.setState(() => ({ searchField }));
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    console.log('render()');

    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className='App'>
        <input
          type='search'
          placeholder='Choose monsters'
          className='search-box'
          onChange={onSearchChange}
        />
        {filteredMonsters.map(monster => (
          <div key={monster.id}>
            <h1>{monster.name}</h1>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
