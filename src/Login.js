//Login.js
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import app from "./firebaseConfig"; //슬라이드 10쪽
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { loginAtom } from "./loginAtom";
import { useRecoilState } from "recoil";

const Login = () => {
  //로그인아톰 파일에서 로그인아톰을 리코일 상태 인자로 전달
  const [isLogined, setIsLogined] = useRecoilState(loginAtom);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let pwRef = useRef(); //필요시 포커스를 패스워드에 위치시키기 위한 용도
  const navigate = useNavigate(); //로그인 성공시 메인 홈으로 이동시 사용
  const auth = getAuth(app);
  const emailChangeHandle = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandle = (e) => {
    setPassword(e.target.value);
  };
  // User 회원가입 처리함수
  const signUpHandle = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      //패스워드는 6자리 이상
      alert("비밀번호의 길이는 6자리 이상 사용해야 합니다.");
      pwRef.current.focus(); //커서를 패스워드에 포커싱하게 함
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert("회원가입이 완료되었습니다.");
        setEmail("");
        setPassword("");
        // ...
      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
        console.log(error);
        // ..
      });
  };
  //로그인 처리 함수(기존 사용자 로그인)
  const signInHandle = (e) => {
    //e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        setIsLogined(true); // 로그인 성공시 값으로 설정
        alert("로그인하였습니다.");
        setEmail("");
        setPassword("");
        //navigate("/"); //웹페이지 홈
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log("에러 발생 :", error);
      });
  };

  const logOutHandle = () => {
    signOut(auth)
      .then(() => {
        setIsLogined(false);
        alert("로그아웃이 완료되었습니다.");
        navigate("/login");
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <div className="loginPage">
      <h2>Email/Password 로그인</h2>
      <form className="loginForm">
        <label>
          &nbsp;&nbsp; e-mail &nbsp;:{" "}
          <input
            type="text"
            value={email}
            onChange={emailChangeHandle}
            id="email"
          />
        </label>
        <label>
          password :{" "}
          <input
            type="password"
            ref={pwRef}
            value={password}
            onChange={passwordChangeHandle}
            id="password"
          />
        </label>
        <p>
          {isLogined ? (
            <button type="button" onClick={logOutHandle}>
              로그아웃
            </button>
          ) : (
            <button type="button" onClick={signInHandle}>
              로그인
            </button>
          )}{" "}
          | &nbsp;
          <button type="button" id="register" onClick={signUpHandle}>
            회원가입
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
