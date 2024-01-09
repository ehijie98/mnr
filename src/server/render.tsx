import App from "../components/app";
import { fetchContest, fetchContestList } from "../api-client";
import ReactDomServer from "react-dom/server";

const serverRender = async (req) => {
  const { contestId } = req.params;

  const initialData = contestId
    ? { currentContest: await fetchContest(contestId) }
    : { contests: await fetchContestList() };

  const initialMarkup = ReactDomServer.renderToString(
    <App initialData={initialData} />,
  );

  console.log(initialData);

  return { initialMarkup, initialData };
};

export default serverRender;
