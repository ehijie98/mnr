import { useState, useEffect } from "react";

import ContestList from "./contest-list";
import Contest from "./contest";
import AddNewContest from "./add-new-contest";

// page: contestList, contest

const App = ({ initialData }) => {
  const [page, setPage] = useState<"contestList" | "contest">(
    initialData.currentContest ? "contest" : "contestList",
  );

  const [currentContest, setCurrentContest] = useState<
    object | undefined
  >(initialData.currentContest);

  useEffect(() => {
    // working with history API
    window.onpopstate = (event) => {
      const newPage = event.state?.contestId
        ? "contest"
        : "contestList";
      setPage(newPage);
      // mimicking fake object having changed useState from currentContestId to currentContest
      setCurrentContest({ id: event.state?.contestId });
    };
  }, []);

  // param set as contest.id in contest-preview component
  const navigateToContest = (contestId) => {
    window.history.pushState(
      { contestId },
      "",
      `contest/${contestId}`,
    );
    setPage("contest");
    setCurrentContest({ id: contestId });
  };

  const navigateToContestList = () => {
    window.history.pushState({}, "", "/");
    setPage("contestList");
    setCurrentContest(undefined);
  };


  const onNewContest = (newContest) => {
    window.history.pushState(
      {contestId: newContest.id},
      "",
      `/contest/${newContest.id}` 
    );
    setPage("contest")
    setCurrentContest({ id: newContest.id});
  }

  const pageContent = () => {
    switch (page) {
      case "contestList":
        return (
          <>
          <ContestList
            initialContests={initialData.contests}
            // props drilling, rather use React context
            onContestClick={navigateToContest}
          />
          <AddNewContest onSuccess={onNewContest} />
          </>
        );
      case "contest":
        return (
          <Contest
            initialContest={currentContest}
            onContestListClick={navigateToContestList}
          />
        );
    }
  };

  return <div className="container">{pageContent()}</div>;
};

export default App;
