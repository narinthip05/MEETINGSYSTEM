import React, { useState } from "react";
import "../css/style.css";
const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  return (
    <div className="body-login">
    <div className="login-container">
      <img src="src/assets/SingleLogo.png" alt="Logo" className="logo" style={{width: "150px"}}/>
      <div className="login-box">
      <h2>ยินดีตอนรับเข้าสู่ระบบ</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">ชื่อผู้ใช้ (Username)</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ชื่อผู้ใช้"
            required
          />

          <label htmlFor="password">รหัสผ่าน (Password)</label>
          <div style={{ display: "flex", alignItems: "center" }}></div>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="รหัสผ่าน"
            required
          />
          <div className="remember-forgot">
  <div className="remember-me">
    <input
      type="checkbox"
      id="rememberMe"
      checked={rememberMe}
      onChange={() => setRememberMe(!rememberMe)}
    />
    <label htmlFor="rememberMe" className="remember-label">
    จำไว้
    </label>
  </div>
  <a href="/forgot-password" className="forgot-password">
    ลืมรหัสผ่าน?
  </a>
</div>


          <button type="submit">เข้าสู่ระบบ</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;