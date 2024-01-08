import App from "../components/app";
import { fetchContestList } from "../api-client";
import ReactDomServer from "react-dom/server";

const serverRender = async () => {
  const contests = await fetchContestList();
  const initialMarkup = ReactDomServer.renderToString(
    <App initialData={{ contests }} />,
  );

  return { initialMarkup, initialData: { contests } };
};

export default serverRender;
