import { HashRouter, Route, Routes } from "react-router-dom";
import Main from "./page/Main";
import Search from "./page/Search/Search";
import Filter from "./page/Filter";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
        <Route path="/filter" element={<Filter />} />
        {/* <Route path="/checklist"/>
      <Route path="/savedlist"/> */}
      </Routes>
    </HashRouter>
  );
};

export default Router;
