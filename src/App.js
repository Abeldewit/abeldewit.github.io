import { Navbar } from './components'
import { Header, Experience } from './containers'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='
        bg-gray-100
        '>
        <div>
          <Navbar />
          <Header />
          <Experience />
        </div>
      </div>
    </div>
  );
}

export default App;
