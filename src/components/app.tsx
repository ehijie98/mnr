import { useState } from "react";

import ContestList from "./contest-list";
import Contest from "./contest";

// page: contestList, contest

const App = ({ initialData }) => {
  const [page, setPage] = useState("contestList");
  const [currentContestId, setCurrentContestId] = useState();

  // param set as contest.id in contest-preview component
  const navigateToContest = (contestId) => {
    setPage("contest");
    setCurrentContestId(contestId);
  };

  const pageContent = () => {
    switch (page) {
      case "contestList":
        return (
          <ContestList
            initialContests={initialData.contests}
            // props drilling, rather use React context
            onContestClick={navigateToContest}
          />
        );
      case "contest":
        return <Contest id={currentContestId} />;
    }
  };

  return <div className="container">{pageContent()}</div>;
};

export default App;
