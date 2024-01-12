import { useState } from "react";
import { addNewContest } from "../api-client";

const AddNewContest = ({onSuccess}) => {
    const [showForm, setShowForm] = useState<true | false>(
        false,
      );
    const [newContestName, setNewContestName] = useState("")
    const [newCategoryName, setNewCategoryName] = useState("")
    const [newDescription, setNewDescription] = useState("")


    const handleNewContestSubmit = async (event) => {
        event.preventDefault();
        const newContestData = {
          contestName: newContestName,
          categoryName: newCategoryName,
          description: newDescription,
        };
        const newContest = await addNewContest(newContestData);
        
        if (newContest?.id) {
          onSuccess(newContest);
          setNewContestName("");
          setNewCategoryName("");
          setNewDescription("");
        }
        console.log(newContest);
      };

    const handleContestNameChange = async (event) => {
      event.preventDefault();
        
      setNewContestName(event.target.value);
    }
  
    const handleCategoryNameChange = async (event) => {
      event.preventDefault();
  
      setNewCategoryName(event.target.value);
    }
  
    const handleDescriptionChange = async (event) => {
      event.preventDefault();
  
      setNewDescription(event.target.value);
    }
  
  return (
    <div className="add-new-contest">
        {showForm == false ? (
        <div
          className="link"
          onClick={() => setShowForm(true)}
        >
          Add New Contest
        </div>
      ) : (
        <form onSubmit={handleNewContestSubmit}>
          <input
           type="text"
           name="contestName"
           placeholder="Contest Name"
           value={newContestName}
           onChange={handleContestNameChange}
          />
          <input
           type="text"
           name="contestCategory"
           placeholder="Contest Category"
           value={newCategoryName}
           onChange={handleCategoryNameChange}
          />
          <input
           type="text"
           name="contestDescription"
           placeholder="Contest Description"
           value={newDescription}
           onChange={handleDescriptionChange}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  )
}

export default AddNewContest
  
