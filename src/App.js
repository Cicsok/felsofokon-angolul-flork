import './App.css';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HeaderContextProvider from "./store/header-context";

import Header from "./components/Header/Header";
import MainContent from "./components/MainContent";
import ContactFormProvider from "./store/contact-form-context";

function App() {
  return (
      <Router>
        <HeaderContextProvider>
          <Header/>
          <ContactFormProvider>
            <Routes>
              <Route path="/home" element={<MainContent/>}/>
              <Route path="/" element={<MainContent/>}/>
              <Route path="/prices" element={<MainContent/>}/>
              <Route path="/about" element={<MainContent/>}/>
              <Route path="/services" element={<MainContent/>}/>
              <Route path="/contact" element={<MainContent/>}/>
              <Route path="/blog" element={<MainContent/>}/>
              <Route path="/general-english-lesson" element={<MainContent/>}/>
              <Route path="/matura-examination" element={<MainContent/>}/>
              <Route path="/translation" element={<MainContent/>}/>
              <Route path="*" element={<MainContent/>}/>
            </Routes>
          </ContactFormProvider>
        </HeaderContextProvider>
      </Router>
  );
}

export default App;