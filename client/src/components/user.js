import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from "react-router-dom";
import { GET_STUDIES_BY_USER_ID } from './queries/studies_query';

export default function UserComp() {

    const location = useLocation()
    const user = location.state.user
    const studies = useQuery(GET_STUDIES_BY_USER_ID, {variables: {id: user._id}})
    const navigate = useNavigate()


  return (
    <div>
        <div>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
        {!studies.loading &&
            <div>
                <div>
                    <h3>User Details</h3>
                    First Name: <span>{user.first_name}</span><br/>
                    Last Name: <span>{user.last_name}</span><br/>
                    ID: <span>{user._id}</span><br/>
                    Date Created: <span>{Date(user.date_created)}</span><br/>
                </div>
                <div>
                    <h3>Studies</h3>
                    {
                        studies.data.studyMany.map((study, idx) => {
                            return (
                                <div key={idx}>
                                    <h3>Study {idx}</h3>
                                    {
                                        study.study_details.map((d, i) => {
                                            return (
                                                <div key={i}>
                                                    <span>{d.key} - {d.value}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>   
        }
    </div>
  );
}