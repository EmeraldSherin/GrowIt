import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";
import "./Register.css";

const Register = () => {

  const navigate = useNavigate();

  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError(
        "Please fill in all fields"
      );
      return;
    }

    try {

      setLoading(true);

      await register(
        name,
        email,
        password
      );

      navigate("/login");

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };


  return (
  <div className="register-page">

    <div
      className="register-page__glow register-page__glow--a"
      aria-hidden="true"
    />

    <div
      className="register-page__glow register-page__glow--b"
      aria-hidden="true"
    />

    <div className="register-card">

      <div className="register-card__logo">
        <Logo
          size="md"
          showTagline
        />
      </div>

      <div className="register-card__header">
        <h1>Create your account</h1>

        <p>
          Start tracking your productivity with GrowIt.
        </p>
      </div>

      {error && (
        <p className="register-card__error">
          {error}
        </p>
      )}

      <form
        className="register-form"
        onSubmit={handleSubmit}
      >

        <div className="register-field">
          <label htmlFor="register-name">
            Name
          </label>

          <input
            id="register-name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            autoComplete="name"
          />
        </div>

        <div className="register-field">
          <label htmlFor="register-email">
            Email
          </label>

          <input
            id="register-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            autoComplete="email"
          />
        </div>

        <div className="register-field">
          <label htmlFor="register-password">
            Password
          </label>

          <input
            id="register-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className="register-submit"
          disabled={loading}
        >
          {loading
            ? "Creating account..."
            : "Register"}
        </button>

      </form>

      <div className="register-login">

        <span>
          Already have an account?
        </span>

        <button
          type="button"
          className="register-login__link"
          onClick={() =>
            navigate("/login")
          }
        >
          Login
        </button>

      </div>

    </div>
  </div>
);
};

export default Register;