import Searchbar from './components/Searchbar';
import { useState } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RenderImages from './components/RenderImages';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchbarSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchbarSubmit} />
      <RenderImages searchQuery={searchQuery} />
      <ToastContainer transition={Slide} />
    </div>
  );
}

// export default class App extends Component {
//   state = {
//     searchQuery: '',
//   };

// handleSearchbarSubmit = searchQuery => {
//   this.setState({ searchQuery });
// };

//   render() {
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSearchbarSubmit} />
//         <RenderImages searchQuery={this.state.searchQuery} />
//         <ToastContainer transition={Slide} />
//       </div>
//     );
//   }
// }
