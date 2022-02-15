require("dotenv").config();

const DBPage = (props) => {
  const onClickButton = (event) => {
    console.log(process.env.MONGO_DB_KEY);
  };
  return <button onClick={onClickButton}>Test</button>;
};

export default DBPage;
