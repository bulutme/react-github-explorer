import MainLayout from "./layouts/mainLayout/MainLayout";
import RepositoryList from "./pages/repositoryList";
import "./App.css";

const App: React.FC = () => {
  return (
    <MainLayout>
      <RepositoryList />
    </MainLayout>
  );
};

export default App;
