const getTriviaApi = async (token) => {
  // const getToken = 'https://opentdb.com/api_token.php?command=request';
  // const responseToken = await fetch(getToken);
  // const dataToken = await responseToken.json();
  // // console.log(dataToken);
  // const { token } = dataToken;
  const getQuestions = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const responseQuestions = await fetch(getQuestions);
  const dataQUestions = await responseQuestions.json();
  // console.log(dataQUestions);
  return dataQUestions;
};

export default getTriviaApi;
