require("dotenv").config();

const DBPage = (props) => {
  const onClickButton = (event) => {
    console.log(process.env.REACT_APP_MONGO_DB_KEY);
  };
  return <button onClick={onClickButton}>Test</button>;
};

export default DBPage;
