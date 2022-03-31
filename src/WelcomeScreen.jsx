import React from "react";
import { Row, Container } from "react-bootstrap";
import "./WelcomeScreen.css";

function WelcomeScreen(props) {
return props.showWelcomeScreen ?
(<Container className="WelcomeScreen" fluid>
<h1 className="welcome-title">Welcome to the Meet app</h1>
<h4 className="subheaders">
Log in to see upcoming events around the world for
full-stack
developers
</h4>
<Row className="button_cont" align="center">
<div class="google-btn">
<div class="google-icon-wrapper">
<img
class="google-icon"
src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Log
o.svg"
alt="Google sign-in"
/>
</div>
<button onClick={() => { props.getAccessToken() }}
rel="nofollow noopener"
class="btn-text"
>
<b>Sign in with Google</b>
</button>
</div>
</Row>
<a className="privacy"
href="https://kevin-hello.github.io/meet-app/privacy.html"
rel="nofollow noopener"
>
Privacy policy
</a>
</Container>
)
: null
}
export default WelcomeScreen;