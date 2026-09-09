import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {

      setLoading(true);

      await login(email, password);

      navigate("/");

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };


  return (
  <div className="login-page">

    <div
      className="login-page__glow login-page__glow--a"
      aria-hidden="true"
    />

    <div
      className="login-page__glow login-page__glow--b"
      aria-hidden="true"
    />

    <div className="login-card">

      <div className="login-card__logo">
        <Logo
          size="md"
          showTagline
        />
      </div>

      <div className="login-card__header">
        <h1>Welcome back</h1>

        <p>
          Log in to continue growing with GrowIt.
        </p>
      </div>

      {error && (
        <p className="login-card__error">
          {error}
        </p>
      )}

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        <div className="login-field">
          <label htmlFor="login-email">
            Email
          </label>

          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            autoComplete="email"
          />
        </div>

        <div className="login-field">
          <label htmlFor="login-password">
            Password
          </label>

          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="login-submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </form>

      <div className="login-register">

        <span>
          Don't have an account?
        </span>

        <button
          type="button"
          className="login-register__link"
          onClick={() =>
            navigate("/register")
          }
        >
          Register
        </button>

      </div>

    </div>
  </div>
);
};
export default Login;