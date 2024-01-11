import * as React from "react";

const ContestPreview: React.FC<{
  contest: object;
  onDiffClick: any;
}> = ({ contest, onDiffClick }) => {
  const handleClick = (event) => {
    event.preventDefault();

    // State element to render new view
    // Alias to navigateToFunction()
    onDiffClick(contest.id);
  };

  return (
    <div className="contest-preview link" onClick={handleClick}>
      <div className="category">{contest.categoryName}</div>
      <div className="contest">{contest.contestName}</div>
    </div>
  );
};

export default ContestPreview;
