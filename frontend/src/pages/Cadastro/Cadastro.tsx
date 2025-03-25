import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { useCadastro } from "../../hook/hook";
import "./Cadastro.css";

export default function Cadastro() {
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const { mutate: cadastrar } = useCadastro();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (senha !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        cadastrar(
            { email, senha },
            {
                onSuccess: () => {
                    alert('Cadastro realizado com sucesso!');
                    navigate('/login');
                },
                onError: () => {
                    setError('Erro ao cadastrar. Tente novamente.');
                },
            }
        );
    };

    return (
        <div className="cadastro-container">
            <Card className="cadastro-card">
                <h1 className="cadastro-title">Cadastro de Usuário</h1>
                <form onSubmit={handleSubmit} className="cadastro-form">
                    <label className="cadastro-label">Email:</label>
                    <input
                        className="cadastro-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="cadastro-label">Senha:</label>
                    <input
                        className="cadastro-input"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <label className="cadastro-label">Confirmar Senha:</label>
                    <input
                        className="cadastro-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {error && <p className="cadastro-error">{error}</p>}
                    <button className="cadastro-button" type="submit">Cadastrar</button>
                </form>
            </Card>
        </div>
    );
}
