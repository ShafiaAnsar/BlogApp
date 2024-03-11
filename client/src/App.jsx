import Router from "./router"
import { Header } from "./components"
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer />
    <Header/>
    <Router/>
    </>
  )
}

export default App
