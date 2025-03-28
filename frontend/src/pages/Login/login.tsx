import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { useLogin } from "../../hook/hook";
import "./Login.css";

interface LoginProps {
    onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { mutate: login } = useLogin();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        login(
            { email, senha },
            {
                onSuccess: () => {
                    setLoading(false);
                    onLogin();
                    navigate("/home");
                },
                onError: () => {
                    setLoading(false);
                    alert("Credenciais inválidas");
                },
            }
        );
    };

    const handleRegisterClick = () => {
        navigate("/cadastro");
    };

    return (
        <div className="login-container no-bg">
            <Card className="login-card">
                <h1 className="login-title">Solution TI</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <label className="login-label">Email:</label>
                    <input className="login-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label className="login-label">Senha:</label>
                    <input className="login-input" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                    <div className="login-buttons">
                        <button className="login-button black" type="submit" disabled={loading}>
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                        <button
                            className="register-button red"
                            type="button"
                            onClick={handleRegisterClick}
                            disabled={loading}
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
