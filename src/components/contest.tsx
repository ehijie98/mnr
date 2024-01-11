import { fetchContest } from "../api-client";
import { useState, useEffect } from "react";
import { addNewNameToContest } from "../api-client";
import Header from "./header";

const Contest = ({ initialContest, onContestListClick }) => {
  const [contest, setContest] = useState(initialContest);
  const [newProposedName, setNewProposedName] = useState("");

  useEffect(() => {
    if (!contest.names) {
      fetchContest(contest.id).then((contest) => {
        setContest(contest);
      });
    }
  }, [contest.id, contest.names]);

  const handleClickContestList = (event) => {
    event.preventDefault();

    onContestListClick();
  };

  const handleNewNameSubmit = async (event) => {
    event.preventDefault();
    const updatedContest = await addNewNameToContest({
      contestId: contest.id,
      newNameValue: newProposedName,
    });

    console.log(updatedContest);
  };

  const handleProposedNameChange = (event) => {
    event.preventDefault();

    setNewProposedName(event.target.value);
    // console.log(newProposedName);
  };

  return (
    <>
      <Header message={contest.contestName} />
      <div className="contest">
        <div className="title">Contest Description</div>
        <div className="description">{contest.description}</div>

        <div className="title">Proposed Names</div>
        <div className="body">
          {contest.names?.length > 0 ? (
            <div className="list">
              {contest.names.map((proposedName) => (
                <div key={proposedName.id} className="item">
                  {proposedName.name}
                </div>
              ))}
            </div>
          ) : (
            <div>No names proposed yet</div>
          )}
        </div>

        <div className="title">Propose a new name...</div>
        <div className="body">
          <form onSubmit={handleNewNameSubmit}>
            <input
              type="text"
              name="newName"
              placeholder="New Name Here.."
              value={newProposedName}
              onChange={handleProposedNameChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>

        <a
          href="/"
          className="link"
          onClick={handleClickContestList}
        >
          Contest List
        </a>
      </div>
    </>
  );
};

export default Contest;
