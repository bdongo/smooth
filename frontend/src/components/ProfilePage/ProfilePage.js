import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.css";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser)

    return (
        <div>
            <h1>{currentUser?.username}</h1>
            ProfilePage

        </div>
    )
}
export default ProfilePage;