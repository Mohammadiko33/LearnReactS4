import { useReducer } from "react";

// تعریف reducer برای مدیریت state فرم
function formReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: validateField(action.field, action.value),
        },
      };
    case "VALIDATE":
      return {
        ...state,
        errors: {
          email: validateField("email", state.email),
          password: validateField("password", state.password),
          confirmPassword: validateField(
            "confirmPassword",
            state.confirmPassword,
            state.password
          ),
        },
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// تابع اعتبارسنجی فیلدها
function validateField(field, value, password) {
  if (!value) return "این فیلد الزامی است";

  switch (field) {
    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "ایمیل معتبر نیست";
      return "";
    case "password":
      if (value.length < 6) return "رمز عبور باید حداقل ۶ کاراکتر باشد";
      return "";
    case "confirmPassword":
      if (value !== password) return "رمز عبورها مطابقت ندارند";
      return "";
    default:
      return "";
  }
}

// state اولیه
const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  errors: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  isSubmitting: false,
  successMessage: "",
};

export default function RegistrationForm({ showReducer3 }) {
  
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE", field: name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // اعتبارسنجی تمام فیلدها
    dispatch({ type: "VALIDATE" });

    // بررسی وجود خطا
    const hasErrors = Object.values(state.errors).some((error) => error);
    const isEmpty = !state.email || !state.password || !state.confirmPassword;

    if (hasErrors || isEmpty) return;

    // شبیه‌سازی ارسال فرم
    dispatch({ type: "CHANGE", field: "isSubmitting", value: true });

    setTimeout(() => {
      dispatch({ type: "CHANGE", field: "isSubmitting", value: false });
      dispatch({
        type: "CHANGE",
        field: "successMessage",
        value: "ثبت‌نام با موفقیت انجام شد!",
      });
    }, 1500);
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  // استایل‌ها
  const styles = {
    container: {
      maxWidth: "450px",
      margin: "40px auto",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
      textAlign: "center",
      color: "#2c3e50",
      marginBottom: "25px",
      fontSize: "24px",
    },
    formGroup: {
      marginBottom: "20px",
      position: "relative",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#34495e",
      fontSize: "14px",
      fontWeight: "600",
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      fontSize: "16px",
      transition: "all 0.3s",
      boxSizing: "border-box",
      "&:focus": {
        borderColor: "#3498db",
        boxShadow: "0 0 0 3px rgba(52,152,219,0.2)",
        outline: "none",
      },
    },
    error: {
      color: "#e74c3c",
      fontSize: "13px",
      marginTop: "5px",
      display: "block",
      height: "18px",
    },
    button: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s",
      marginBottom: "10px",
    },
    submitButton: {
      backgroundColor: "#3498db",
      color: "white",
      "&:hover": {
        backgroundColor: "#2980b9",
      },
      "&:disabled": {
        backgroundColor: "#bdc3c7",
        cursor: "not-allowed",
      },
    },
    resetButton: {
      backgroundColor: "#f1f2f6",
      color: "#34495e",
      "&:hover": {
        backgroundColor: "#dfe4ea",
      },
    },
    successMessage: {
      textAlign: "center",
      color: "#27ae60",
      marginTop: "15px",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>فرم ثبت‌نام</h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>ایمیل:</label>
          <input
            style={{
              ...styles.input,
              borderColor: state.errors.email ? "#e74c3c" : "#ddd",
            }}
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="example@domain.com"
          />
          <span style={styles.error}>{state.errors.email}</span>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>رمز عبور:</label>
          <input
            style={{
              ...styles.input,
              borderColor: state.errors.password ? "#e74c3c" : "#ddd",
            }}
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="حداقل ۶ کاراکتر"
          />
          <span style={styles.error}>{state.errors.password}</span>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>تکرار رمز عبور:</label>
          <input
            style={{
              ...styles.input,
              borderColor: state.errors.confirmPassword ? "#e74c3c" : "#ddd",
            }}
            type="password"
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={handleChange}
            placeholder="رمز عبور را تکرار کنید"
          />
          <span style={styles.error}>{state.errors.confirmPassword}</span>
        </div>

        <button
          style={{ ...styles.button, ...styles.submitButton }}
          type="submit"
          disabled={state.isSubmitting}
        >
          {state.isSubmitting ? "در حال ثبت..." : "ثبت‌نام"}
        </button>

        <button
          style={{ ...styles.button, ...styles.resetButton }}
          type="button"
          onClick={handleReset}
        >
          بازنشانی فرم
        </button>
      </form>

      {state.successMessage && (
        <p style={styles.successMessage}>{state.successMessage}</p>
      )}

      <button className="re" onClick={showReducer3}>
        Next TesT
      </button>
    </div>
  );
}
