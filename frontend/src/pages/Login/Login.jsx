import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import styles from './Login.module.scss';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className={styles.container}>
        <div className={styles.background}>
            <div className={styles.shape}/>
            <div className={styles.shape}/>
        </div>

        <form onSubmit={handleSubmit}>
            <h3>Log In</h3>
            <label>Email address:</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
            />
            <label>Password:</label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
            />
            <button 
              className={styles.loginBtn}
              disabled={isLoading}
            >
              Log in
            </button>
            {error && <div className={styles.error}>{error}</div>}
        </form>
    
    </div>
  )
}

export default Login