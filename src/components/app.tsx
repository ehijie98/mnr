import Header from "./header";

const App = ({ initialData }) => {
  console.log(initialData);
  return (
    <div className="container">
      <Header message="Naming Contests" />
    </div>
  );
};

export default App;
