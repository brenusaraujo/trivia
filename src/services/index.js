const fetchTokenTrivia = async () => {
  const getToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const responseJson = await getToken.json();
  return responseJson.token;
};

export default fetchTokenTrivia;
