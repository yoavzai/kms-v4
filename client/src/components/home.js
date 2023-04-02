import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_ALL_USERS } from "./queries/user_queries";


export default function HomeComp() {

    const { loading, error, data } = useQuery(GET_ALL_USERS)
    const navigate = useNavigate()

    function userSelected(user) {
        navigate('/users/' + user.first_name, {state: {user: user}})
    }

  return (
    <div>
        {
        !loading &&
        <div>
            {
                data.userMany.map((user,index) => {
                    return (
                        <button key={index} onClick={() => userSelected(user)}>{user.first_name}</button>
                    )
                })
            }
        </div>
    }
    </div>
  );
}