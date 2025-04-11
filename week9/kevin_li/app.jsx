import { useState } from 'react';
import './App.css';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [budget] = useState(100);

  const addItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.purchased = false;
    data.cost = parseFloat(data.cost || 0);
    setShoppingList([...shoppingList, data]);
    event.target.reset();
  };

  const removeItem = (event) => {
    const name = event.target.value;
    setShoppingList(shoppingList.filter(item => item.name !== name));
  };

  // Calculate total spent and remaining budget
  const totalSpent = shoppingList.reduce((acc, item) => acc + Number(item.cost), 0);
  const remainingBudget = budget - totalSpent;

  return (
    <div className="App">
      <h1>Shopping List Manager</h1>
      <h2>Remaining Budget: ${remainingBudget.toFixed(2)}</h2>
      <div className="card">
        <form onSubmit={addItem} className="flex-apart">
          <input type="text" name="name" placeholder="Add item..." required />
          <input type="number" step="0.01" name="cost" placeholder="Cost" required />
          <button className="btn purple" type="submit">Add</button>
        </form>
      </div>
      {shoppingList.map((item, index) => (
        <div
          key={index}
          className={item.purchased ? 'card flex-apart green' : 'card flex-apart'}
        >
          <span>{item.name} - ${Number(item.cost).toFixed(2)}</span>
          <button className="btn" onClick={removeItem} value={item.name}>x</button>
        </div>
      ))}
    </div>
  );
}

export default App;
