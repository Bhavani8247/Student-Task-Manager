import "./AuthModal.css";

export default function AuthModal({ onClose }) {
  return (
    <div className="overlay">
      <div className="modal">
        <button className="close" onClick={onClose}>×</button>

        <div className="tabs">
          <button className="active">Sign up</button>
          <button>Sign in</button>
        </div>

        <h2>Create an account</h2>

        <div className="row">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>

        <input type="email" placeholder="Enter your email" />
        <input type="password" placeholder="Password" />

        <button className="primary">Create an account</button>

        <p className="or">OR SIGN IN WITH</p>

        <div className="social">
          <button>Google</button>
          <button>Apple</button>
        </div>

        <p className="terms">
          By creating an account, you agree to our Terms & Service
        </p>
      </div>
    </div>
  );
}
