import "../../assets/styles/perfil/logout.css";
import { useAuth } from '../../context/AuthContext';
import { HiOutlineLogout } from "react-icons/hi";

export default function Logout() {
    const { user, isAuthenticated, logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate("landing");
    };

    return (
        <>{isAuthenticated ? (
                <button
                    type="button"
                    className='container-sair button-proceed'
                    onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                    }}>

                    <HiOutlineLogout className="icon-sair"/>
                    <h3>Log out</h3>

                </button>
            ) : (
                <>
                </>
            )}
        </>
    );
}