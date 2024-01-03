import ContestList from "./contest-list";
import Header from "./header";

const App = ({ initialData }) => {
  console.log(initialData);
  return (
    <div className="container">
      <Header message="Naming Contests" />

      <ContestList initialContests={initialData.contests} />
    </div>
  );
};

export default App;
