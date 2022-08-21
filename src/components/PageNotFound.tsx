import Header from "./Header";

interface Props {
  logOut: (params: any) => void;
  currentFavoriteList: any;
}

const PageNotFound: React.FC<Props> = (logOut, currentFavoriteList) => {
  return (
    <div>
      <Header logOut={logOut} currentFavoriteList={currentFavoriteList} />
      <h1>PageNotFound!</h1>
    </div>
  );
};

export default PageNotFound;
