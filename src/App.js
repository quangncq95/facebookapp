import logo from './logo.svg';
import { FacebookAuthProvider } from './context/FacebookAuthContext';
import './App.css';
import AuthGuard from './guard/AuthGuard';
import HeaderOnlyLayout from './layout/HeaderOnlyLayou';

function App() {
  return (
    <FacebookAuthProvider>
      <AuthGuard>
      <HeaderOnlyLayout>
        <div>
            <h1> Welcome !</h1>
        </div>
      </HeaderOnlyLayout>
      </AuthGuard>
    </FacebookAuthProvider>
  );
}

export default App;
