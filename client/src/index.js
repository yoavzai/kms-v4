import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Homepage,
  LoginPage,
  StudiesPage,
  ManualPage,
  ConfigPage,
  UsersPage,
} from "./pages";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { QuestionnaireDisplay, StudyDisplay } from "./pages/studies/components";
import redux from "./redux";

import {  createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from './components/AppBar'

import Grid from '@mui/material/Grid';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND}`,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

const store = createStore(redux);

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
  spacing: 8,
  direction: 'rtl',
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#689f38',
        color: '#fff',
      },
    },
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
          transform: 'translateX(16px)',
          color: '#fff',
          '& + $track': {
            opacity: 1,
            border: 'none',
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: '1px solid #bdbdbd',
        backgroundColor: '#fafafa',
        opacity: 1,
        transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      },
    },
    MuiButton: {
      root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      },
    },
  },
  props: {
    MuiAppBar: {
      color: 'inherit',
    },
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
    MuiTooltip: {
      arrow: true,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary'
      }
    }
  }
});

const routingMenu = [
  {
    path: "/",
    title: "Homepage"
  },
  {
    path: "/login",
    title: "Login"
  },
  {
    path: "/studies",
    title: "Studies"
  },
  {
    path: "/manual",
    title: "Manual"
  },
  {
    path: "/config",
    title: "Path"
  },
  {
    path: "/users",
    title: "Users"
  }
]

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppBar routes={routingMenu} />
          <Grid container spacing={0}>
            <Grid item xs={0} sm={1} md={2}></Grid>
            <Grid item xs={12} sm={10} md={8}>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="studies" element={<StudiesPage />} />
                <Route path="studies/:studyId" element={<StudyDisplay />} />
                <Route
                  path="studies/:studyId/questionnaires/:questionnaireId"
                  element={<QuestionnaireDisplay />}
                />
                <Route path="manual" element={<ManualPage />} />
                <Route path="config" element={<ConfigPage />} />
                <Route path="users" element={<UsersPage />} />
              </Routes>
            </Grid>
            <Grid item xs={0} sm={1} md={2}></Grid>
          </Grid>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
