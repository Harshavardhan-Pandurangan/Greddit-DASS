import { json, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    let navigate = useNavigate();

    if (!localStorage.token) {
        return <Navigate to="/auth/signin" replace={true} />;
    }

    axios
        .get("/api/users/verify", {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        })
        .then((res) => {
            console.log(res.data.verify);
            if (res.data.verify == "valid") {
                localStorage.id = res.data._id;
                navigate("/subgreddiits", { replace: true });
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("id");
                navigate("/auth/signin", { replace: true });
            }
        })
        .catch((err) => {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            navigate("/auth/signin", { replace: true });
        });
}
