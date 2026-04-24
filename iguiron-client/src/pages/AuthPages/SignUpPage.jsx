import { Link } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-lg border border-[#3e484f] bg-[#060e20] px-4 py-3 text-sm text-[#dae2fd] outline-none transition placeholder:text-[#87929a] focus:border-[#8ed5ff]";

const actionButtonClasses = "w-full py-3 text-sm";

const SignUpPage = () => {
  return (
    <>
      <h1 className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#dae2fd]">
        Sign Up
      </h1>
      <p className="mt-3 text-base leading-[1.6] text-[#bdc8d1]">
        Create your account to get started.
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="text-sm font-medium text-[#bdc8d1]">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Juan"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="text-sm font-medium text-[#bdc8d1]">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Dela Cruz"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-[#bdc8d1]">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="juandelacruz@gmail.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-[#bdc8d1]">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="1234abcd!@#$"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-[#87929a]">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClasses}>
          Create Account
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClasses}>
            Sign Up with Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClasses}>
            Sign Up with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-[#3e484f] pt-6 text-sm text-[#bdc8d1]">
        Already have an account?{" "}
        <Link
          to="/auth/signin"
          className="font-semibold text-[#8ed5ff] transition hover:text-[#7bd0ff]">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
