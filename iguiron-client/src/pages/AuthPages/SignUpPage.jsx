import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import UserService from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-lg border border-[#3e484f] bg-[#060e20] px-4 py-3 text-sm text-[#dae2fd] outline-none transition placeholder:text-[#87929a] focus:border-[#8ed5ff]";

const inputErrorClasses =
  "mt-2 w-full rounded-lg border border-red-500 bg-[#060e20] px-4 py-3 text-sm text-[#dae2fd] outline-none transition placeholder:text-[#87929a] focus:border-red-400";

const actionButtonClasses = "w-full py-3 text-sm";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    age: "",
    contactNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (form.username.includes(" ")) {
      newErrors.username = "Username must not contain spaces.";
    }
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (!form.age.trim()) {
      newErrors.age = "Age is required.";
    } else if (!/^\d+$/.test(form.age) || parseInt(form.age) <= 0) {
      newErrors.age = "Age must be a positive number.";
    }
    if (!/^\d{11}$/.test(form.contactNumber))
      newErrors.contactNumber = "Contact number must be exactly 11 digits.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setApiError("");
    setLoading(true);
    try {
      await UserService.createUser({
        ...form,
        age: Number(form.age),
      });
      navigate("/auth/signin");
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#dae2fd]">
        Sign Up
      </h1>
      <p className="mt-3 text-base leading-[1.6] text-[#bdc8d1]">
        Create your account to get started.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {apiError && (
          <p className="rounded-lg border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {apiError}
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="text-sm font-medium text-[#bdc8d1]">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Juan"
              autoComplete="given-name"
              value={form.firstName}
              onChange={handleChange}
              className={errors.firstName ? inputErrorClasses : inputClasses}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm font-medium text-[#bdc8d1]">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Dela Cruz"
              autoComplete="family-name"
              value={form.lastName}
              onChange={handleChange}
              className={errors.lastName ? inputErrorClasses : inputClasses}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="username" className="text-sm font-medium text-[#bdc8d1]">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="juandelacruz"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            className={errors.username ? inputErrorClasses : inputClasses}
          />
          {errors.username && (
            <p className="mt-1 text-xs text-red-400">{errors.username}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-[#bdc8d1]">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="juandelacruz@gmail.com"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? inputErrorClasses : inputClasses}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-[#bdc8d1]">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="1234abcd!@#$"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? inputErrorClasses : inputClasses}
          />
          {errors.password ? (
            <p className="mt-1 text-xs text-red-400">{errors.password}</p>
          ) : (
            <p className="mt-2 text-xs leading-5 text-[#87929a]">
              Use a secure password with letters, numbers, and symbols.
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="text-sm font-medium text-[#bdc8d1]">
              Age
            </label>
            <input
              id="age"
              type="text"
              placeholder="25"
              inputMode="numeric"
              value={form.age}
              onChange={handleChange}
              className={errors.age ? inputErrorClasses : inputClasses}
            />
            {errors.age && (
              <p className="mt-1 text-xs text-red-400">{errors.age}</p>
            )}
          </div>
          <div>
            <label htmlFor="contactNumber" className="text-sm font-medium text-[#bdc8d1]">
              Contact Number
            </label>
            <input
              id="contactNumber"
              type="text"
              placeholder="09171234567"
              inputMode="numeric"
              maxLength={11}
              value={form.contactNumber}
              onChange={handleChange}
              className={errors.contactNumber ? inputErrorClasses : inputClasses}
            />
            {errors.contactNumber && (
              <p className="mt-1 text-xs text-red-400">{errors.contactNumber}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClasses}
          disabled={loading}>
          {loading ? "Creating account…" : "Create Account"}
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClasses}>
            Sign Up with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClasses}>
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
