import axios from 'axios'
export const loginUserService = (request) => {
  const LOGIN_API_ENDPOINT = 'http://localhost:3000/personnel/login';

/*create async function to fetch user credentials*/
  async function getCredentials(body){
        const data =  JSON.stringify(request.user)
        const resp = await axios.post(LOGIN_API_ENDPOINT, JSON.parse(data))
        return resp.data

};

return getCredentials(request.user)

}

