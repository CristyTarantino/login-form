import {useState} from 'react';
import LoginForm from "./components/LoginForm/LoginForm";
import './App.css';

function App() {
    const [hasLoggedIn, setLoggedIn] = useState(false);

  return (
    <main className="App">
        <div className="login-page-overlay">
            {hasLoggedIn ?
                <header className="login-header">
                    <h1>You are now logged In</h1>
                </header>:
                <>
                    <header className="login-header">
                        <h1>Login</h1>
                    </header>
                    <section>
                        <LoginForm onLogIn={() => setLoggedIn(true)}/>
                    </section>
                </>
            }
        </div>
    </main>
  );
}

export default App;
