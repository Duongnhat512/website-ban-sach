import { useEffect, useState } from "react";
import { Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { callLoginApi, callGetUserToken } from "../../service/UserService";
import { setUser } from "../../redux/UserSlice";
import { setAuthToken } from "../../until/customize-axios";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import "./Login.scss";

const LoginPage = () => {
    const user = useSelector((state) => state.user.user); // Lấy user từ redux
    useEffect(() => {
        console.log('====================================');
        console.log(user);
        console.log('====================================');
        if (user && user.email !== "") {
            window.location.href = "/"; // Nếu đã đăng nhập thì về trang chủ
        }
    }, [user]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await callLoginApi(email, password);
            if (response && response.code === 200) {
                localStorage.setItem("token", response.result.token);
                setAuthToken(response.result.token);
                message.success("Đăng nhập thành công!");
                const userResponse = await callGetUserToken();
                if (userResponse && userResponse.code === 200) {
                    dispatch(setUser(userResponse.result));
                }
                window.location.href = "/"; // hoặc navigate tới trang chủ
            }
        } catch (error) {
            message.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        } finally {
            setLoading(false);
        }
    };

    const handleGithubLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/github";
    };
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };
    const handleFacebookLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/facebook";
    };

    return (
        <div className="login-page-container flex items-center justify-center min-h-screen bg-gray-100">
            <div className="login-form bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
                <Input
                    size="large"
                    placeholder="Nhập email"
                    prefix={<MailOutlined />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4"
                />
                <Input.Password
                    size="large"
                    placeholder="Nhập mật khẩu"
                    prefix={<LockOutlined />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4"
                />
                <div className="forgot-password mb-4 text-right text-blue-500 cursor-pointer">
                    Quên mật khẩu?
                </div>
                <Button
                    type="primary"
                    block
                    size="large"
                    onClick={handleLogin}
                    loading={loading}
                    disabled={!email || !password}
                >
                    Đăng nhập
                </Button>
                <div className="flex flex-col gap-2 mt-4">
                    <Button id="google-login" onClick={handleGoogleLogin}>
                        <FaGoogle size={17} style={{ color: "red" }} />
                        <span className="ms-2 fs-6 flex-grow-1">Continue with Google</span>
                    </Button>
                    <Button onClick={handleFacebookLogin}>
                        <FaFacebook size={17} style={{ color: "blue" }} />
                        <span className="ms-2 fs-6 flex-grow-1">Continue with Facebook</span>
                    </Button>
                    <Button onClick={handleGithubLogin}>
                        <FaGithub size={17} />
                        <span className="ms-2 fs-6 flex-grow-1">Continue with Github</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;