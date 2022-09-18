import {useState,useEffect} from 'react';
import {FaEye,FaEyeSlash} from 'react-icons/fa';

import './RegisterForm.css';

const RegisterForm=()=>{
    const [userData,setUserData]=useState({
		email: "",
		password: "",
		confirmPassword: ""
	});
	const {email,password,confirmPassword}=userData;

    const [emailMessage,setEmailMessage]=useState({
        emailError: "",
        emailSuccess: false
    });
    const {emailError,emailSuccess}=emailMessage;

	const [passwordMessage,setPasswordMessage]=useState({
        passwordError: "",
        passwordSuccess: false
    });
    const {passwordError,passwordSuccess}=passwordMessage;

    const [confirmPasswordMessage,setConfirmPasswordMessage]=useState({
        confirmPasswordError: "",
        confirmPasswordSuccess: false
    });
    const {confirmPasswordError,confirmPasswordSuccess}=confirmPasswordMessage;
	
	const [passwordIsShow,setPasswordIsShow]=useState(false);
	const [confirmPasswordIsShow,setConfirmPasswordIsShow]=useState(false);

	useEffect(()=>{
        setEmailMessage({
            emailError: "",
            emailSuccess: false
        });
        setPasswordMessage({
            passwordError: "",
            passwordSuccess: false
        });
        setConfirmPasswordMessage({
            confirmPasswordError: "",
            confirmPasswordSuccess: false
        });
	},[]);
	
	const passwordToggleHandler=()=>{
		setPasswordIsShow(!passwordIsShow);
	};
	const confirmPasswordToggleHandler=()=>{
		setConfirmPasswordIsShow(!confirmPasswordIsShow);
	};

    const emailChangeHandler=(e)=>{
        setEmailMessage({
            emailError: "",
            emailSuccess: false
        });

		setUserData({
			...userData,
			[e.target.name]: e.target.value
		});
	};
    const emailBlurHandler=()=>{
        const emailPattern=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        
        if(!email){
			return setEmailMessage({
                emailError: "請填寫Email",
                emailSuccess: false
            });
        }
        else if(!email.match(emailPattern)){
            return setEmailMessage({
                emailError: "Email格式錯誤",
                emailSuccess: false
            });
        }
        else{
            return setEmailMessage({
                emailError: "",
                emailSuccess: true
            });
        }
    };

    const passwordChangeHandler=(e)=>{
        setPasswordMessage({
            passwordError: "",
            passwordSuccess: false
        });

		setUserData({
			...userData,
			[e.target.name]: e.target.value
		});
	};
    const passwordBlurHandler=()=>{
        const passwordPattern=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        
        if(!password){
            return setPasswordMessage({
                passwordError: "請填寫密碼",
                passwordSuccess: false
            });
        }
        else if(password.length<8){
            return setPasswordMessage({
                passwordError: "請填寫至少8個字元",
                passwordSuccess: false
            });
        }
        else if(!password.match(passwordPattern)){
            return setPasswordMessage({
                passwordError: "請填寫至少包括1個大寫字元、1個小寫字元、1個數字、1個特殊字元",
                passwordSuccess: false
            });
        }
        else{
            return setPasswordMessage({
                passwordError: "",
                passwordSuccess: true
            });
        }
    };

    const confirmPasswordChangeHandler=(e)=>{
        setConfirmPasswordMessage({
            confirmPasswordError: "",
            confirmPasswordSuccess: ""
        });

		setUserData({
			...userData,
			[e.target.name]: e.target.value
		});
	};
    const confirmPasswordBlurHandler=()=>{
        const passwordPattern=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

        if(!confirmPassword){
			return setConfirmPasswordMessage({
                confirmPasswordError: "請填寫確認密碼",
                confirmPasswordSuccess: false
            });
        }
        else if(confirmPassword.length<8){
            return setConfirmPasswordMessage({
                confirmPasswordError: "請填寫至少8個字元",
                confirmPasswordSuccess: false
            });
        }
        else if(!confirmPassword.match(passwordPattern)){
            return setConfirmPasswordMessage({
                confirmPasswordError: "請填寫至少包括1個大寫字元、1個小寫字元、1個數字、1個特殊字元",
                confirmPasswordSuccess: false
            });
        }
        else if(password !== confirmPassword){
            return setConfirmPasswordMessage({
                confirmPasswordError: "密碼不一致",
                confirmPasswordSuccess: false
            });
		}
        else{
            return setConfirmPasswordMessage({
                confirmPasswordError: "",
                confirmPasswordSuccess: true
            });
        }
    };

	const submitHandler=(e)=>{
		e.preventDefault();
        
        if(password !== confirmPassword){
            return setConfirmPasswordMessage({
                confirmPasswordError: "密碼不一致",
                confirmPasswordSuccess: false
            });
        }
        
        alert(email);
	};

    return (
        <form className="register-form" onSubmit={submitHandler} noValidate>
            <h2 className="register-form-title">註冊</h2>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className={emailSuccess?"input success-email-input":emailError?"input error-email-input":"input email-input"} id="email" name="email" placeholder="請輸入Email" autoComplete="off" value={email} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
                {emailError && <p className="error-text">{emailError}</p>}
            </div>
            <div className="input-group">
                <label htmlFor="password">密碼:</label>
                <div className="input-group-flex">
                    <input type={passwordIsShow?"text":"password"} className={passwordSuccess?"input success-password-input":passwordError?"input error-password-input":"input password-input"} id="password" name="password" placeholder="請輸入密碼" value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
                    <div className={passwordSuccess?"eye-icon success-eye-icon":passwordError?"eye-icon error-eye-icon":"eye-icon"}>{passwordIsShow?<FaEye className="icon-cursor" onClick={passwordToggleHandler} />:<FaEyeSlash className="icon-cursor" onClick={passwordToggleHandler} />}</div>
                </div>
                {passwordError && <p className="error-text">{passwordError}</p>}
            </div>
            <div className="input-group">
                <label htmlFor="confirmPassword">確認密碼:</label>
                <div className="input-group-flex">
                    <input type={confirmPasswordIsShow?"text":"password"} className={confirmPasswordSuccess?"input success-password-input":confirmPasswordError?"input error-password-input":"input password-input"} id="confirmPassword" name="confirmPassword" placeholder="請再次輸入密碼" value={confirmPassword} onChange={confirmPasswordChangeHandler} onBlur={confirmPasswordBlurHandler} />
                    <div className={confirmPasswordSuccess?"eye-icon success-eye-icon":confirmPasswordError?"eye-icon error-eye-icon":"eye-icon"}>{confirmPasswordIsShow?<FaEye className="icon-cursor" onClick={confirmPasswordToggleHandler} />:<FaEyeSlash className="icon-cursor" onClick={confirmPasswordToggleHandler} />}</div>
                </div>
                {confirmPasswordError && <p className="error-text">{confirmPasswordError}</p>}
            </div>
            {(emailSuccess && passwordSuccess && confirmPasswordSuccess)?<button type="submit" className="btn-register">註冊</button>:<button type="submit" className="btn-register" disabled>註冊</button>}
        </form>
    );
}

export default RegisterForm;