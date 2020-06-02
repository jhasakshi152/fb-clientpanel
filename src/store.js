import { createStore, combineReducers, compose} from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import {reduxFirestore, firestoreReducer} from 'redux-firestore';
//Reducers
// @todo

const firebaseConfig = {
    apiKey: "AIzaSyCmCc8OmM3gWiGl0lqs7-wBPz0TpN7sH84",
    authDomain: "reactclientpanel-80b08.firebaseapp.com",
    databaseURL: "https://reactclientpanel-80b08.firebaseio.com",
    projectId: "reactclientpanel-80b08",
    storageBucket: "reactclientpanel-80b08.appspot.com",
    messagingSenderId: "310851204449",
    appId: "1:310851204449:web:63fe05c1bf6232be4f8120",
    measurementId: "G-E8N74CMBF4"
};

//react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

  // Init firebase instance
  firebase.initializeApp(firebaseConfig);
  //Init firestore
  //const firestore = firebase.firestore();

  //Add reactReduxFirebase enhancer when making store creator
  const createStoreWithFirebase = compose(
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase)

  )(createStore);

  const rootReducer = combineReducers({
      firebase: firebaseReducer,
      firestore: firestoreReducer
  });

  //create initial state
  const initialState= {};

  //create store
  const store = createStoreWithFirebase(
      rootReducer,
      initialState,
      compose(
          reactReduxFirebase(firebase),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

      )

  );

  export default store;
