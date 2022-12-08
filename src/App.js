import logo from "./logo.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getRemoteConfig,
  getValue,
  fetchAndActivate,
} from "firebase/remote-config";
import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const firebaseConfig = {
  apiKey: "AIzaSyALZsAsYs6W1621bISbCZubsH6qP3sISoc",
  authDomain: "biglol-zzang.firebaseapp.com",
  projectId: "biglol-zzang",
  storageBucket: "biglol-zzang.appspot.com",
  messagingSenderId: "43383583396",
  appId: "1:43383583396:web:44dbaf1b05fc82fda9ec31",
  measurementId: "G-4HL9KZBDV1",
};

// const clientId =
//   "392235713411-a57uf910gu1brmlmr8e6omvgqnegltfb.apps.googleusercontent.com";

const clientId =
  "787313988627-bja29sdg6sn2fjgi8bvku6e2rihg541i.apps.googleusercontent.com";

function App() {
  const responseGoogle = (res) => {
    console.log(res);
  };

  const [successObj, setSuccessObj] = useState(null);

  useEffect(() => {
    const appf = initializeApp(firebaseConfig);

    const remoteConfig = getRemoteConfig(appf);

    remoteConfig.defaultConfig = {
      welcome_message: "Welcome",
    };

    const val = getValue(remoteConfig, "sample1");

    const val2 = getValue(remoteConfig, "welcome_message");

    console.log(remoteConfig);

    console.log(val);
    console.log(val2);

    fetchAndActivate(remoteConfig)
      .then((res, asdf) => {
        // ...
        console.log(res);
        console.log(asdf);
      })
      .catch((err) => {
        console.log(err);
        // ...
      });

    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope:
          "https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/firebase",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = (res) => {
    console.log("success:", res);
    setSuccessObj(res);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
    setSuccessObj(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
        <br />
        {/* <div style={{ backgroundColor: "white", color: "black" }}>
          {successObj?.tokenObj.access_token}
        </div> */}
        <input value={successObj?.tokenObj.access_token} />
        <button
          onClick={() =>
            navigator.clipboard.writeText(successObj?.tokenObj.access_token)
          }
        >
          copy
        </button>
      </header>

      {/* <GoogleLogin
        clientId="392235713411-a57uf910gu1brmlmr8e6omvgqnegltfb.apps.googleusercontent.com"
        buttonText="구글로 계속하기"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      /> */}
    </div>
  );
}

export default App;
