import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import UserService from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-lg border border-[#3e484f] bg-[#060e20] px-4 py-3 text-sm text-[#dae2fd] outline-none transition placeholder:text-[#87929a] focus:border-[#8ed5ff]";

const actionButtonClasses = "w-full py-3 text-sm";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    setLoading(true);
    try {
      const data = await UserService.login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("firstName", data.user.firstName);
      localStorage.setItem("userType", data.user.type);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#dae2fd]">
        Log In
      </h1>
      <p className="mt-3 text-base leading-[1.6] text-[#bdc8d1]">
        Access your account to manage your projects and articles.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {error && (
          <p className="rounded-lg border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-[#bdc8d1]">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="juandelacruz@gmail.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-[#bdc8d1]">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="1234abcd!@#$"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-[#87929a]">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-[#bdc8d1]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#3e484f] accent-[#8ed5ff]"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="font-medium text-[#8ed5ff] transition hover:text-[#7bd0ff]">
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClasses}
          disabled={loading}>
          {loading ? "Logging in…" : "Log In"}
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClasses}>
            Log In with Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClasses}>
            Log In with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-[#3e484f] pt-6 text-sm text-[#bdc8d1]">
        No account yet?{" "}
        <Link
          to="/auth/signup"
          className="font-semibold text-[#8ed5ff] transition hover:text-[#7bd0ff]">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
