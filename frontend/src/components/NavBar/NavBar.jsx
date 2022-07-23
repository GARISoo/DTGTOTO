import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './NavBar.module.scss';

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const navigate = useNavigate();
  const isAdmin = user?.roles.includes(2000);

  const handleLogOut = () => {
    logout()
  };

  const handleAdmin = () => {
    navigate('/admin')
  };

  return (
    <header>
      <div className={styles.container}>
        <Link to="/">
          <h5>Datu Tehnoloģiju Grupa</h5>
        </Link>
        <nav>
          {user && (
            <div className={styles.actions}>
              <span>{user.email}</span>
              {isAdmin &&
                <button
                  className={styles.adminBtn}
                  onClick={handleAdmin}
                >
                  Admin Panel
                </button>
              }
              <button
                className={styles.logoutBtn}
                onClick={handleLogOut}
              >
                Log out
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar