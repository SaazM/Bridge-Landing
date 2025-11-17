import Home from './pages/Home';
import Employers from './pages/Employers';
import Contact from './pages/Contact';
import AIVisual from './pages/AIVisual';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Employers": Employers,
    "Contact": Contact,
    "AIVisual": AIVisual,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};