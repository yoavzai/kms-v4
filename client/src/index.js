import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import {
  Homepage,
  LoginPage,
  StudiesPage,
  QuestionnairesPage,
  ManualPage,
  ConfigPage,
  UsersPage,
} from './pages';


const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND}`,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
        <Link to='/'>Homepage</Link><span> | </span>
        <Link to='/login'>Login</Link><span> | </span>
        <Link to='/studies'>Studies</Link><span> | </span>
        <Link to='/questionnaires'>Questionnaires</Link><span> | </span>
        <Link to='/manual'>Manual</Link><span> | </span>
        <Link to='/config'>Config</Link><span> | </span>
        <Link to='/users'>Users</Link><span> | </span>
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="studies" element={<StudiesPage />} />
        <Route path="studies/:studyId" element={<StudiesPage />} />
        <Route path="questionnaires" element={<QuestionnairesPage />} />
        <Route path="questionnaires/:questionnaireId" element={<QuestionnairesPage />} />
        <Route path="manual" element={<ManualPage />} />
        <Route path="config" element={<ConfigPage />} />
        <Route path="users" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
