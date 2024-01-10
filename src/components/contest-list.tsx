import { useEffect, useState } from "react";
import { fetchContestList } from "../api-client";
import Header from "./header";

import ContestPreview from "./contest-preview";

const ContestList = ({ initialContests, onContestClick }) => {
  const [contests, setContests] = useState(
    initialContests ?? [],
  );

  useEffect(() => {
    if (!initialContests) {
      fetchContestList().then((contests) => {
        setContests(contests);
      });
    }
  }, [initialContests]);

  return (
    <>
      <Header message="Naming Contests" />
      <div className="contest-list">
        {contests.map((contest) => {
          return (
            <ContestPreview
              key={contest.id}
              contest={contest}
              onDiffClick={onContestClick}
            />
          );
        })}
      </div>
    </>
  );
};

export default ContestList;
