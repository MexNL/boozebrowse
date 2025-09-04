import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function ProfilePage() {
    const {  isAuth ,name ,status, email } = useContext(AuthContext);

    return (
        <div>
            {isAuth? (
                <main>
                    <p>Email: {email}</p>
                    <p>{status}</p>
                    <p>{name}</p>
                </main>

            ): (
                <p>Something went wrong</p>
            )}
        </div>
    )}

export default ProfilePage;
