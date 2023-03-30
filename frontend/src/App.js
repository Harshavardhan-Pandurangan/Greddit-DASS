import Auth from "./Auth/auth";
import SignIn from "./Auth/signin";
import SignUp from "./Auth/signup";
import Profile from "./Profile/profile";
import Edit from "./Profile/edit-profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Subgreddiits from "./Subgreddiits/subgreddiits";
import MySubgreddiits from "./Subgreddiits/my_subgreddiits";
import Subgreddiit from "./Subgreddiits/subgreddiit";
import SubgreddiitUsers from "./Users/subgreddiitusers";
import SubgreddiitRequests from "./Requests/subgreddiitrequests";
import SubgreddiitStats from "./Stats/subgreddiitstats";
import SubgreddiitReports from "./Reports/subgreddiitreports";
import SavedPosts from "./Posts/posts";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Auth />} />
                    <Route path="auth/">
                        <Route index element={<Auth />} />
                        <Route path="signin" element={<SignIn />} />
                        <Route path="signup" element={<SignUp />} />
                    </Route>
                    <Route path="profile" element={<Profile />} />
                    <Route path="edit-profile" element={<Edit />} />
                    <Route path="subgreddiits/">
                        <Route index element={<Subgreddiits />} />
                        <Route path="my/:id" element={<MySubgreddiits />} />
                        <Route
                            path=":subgreddiitId"
                            element={<Subgreddiit />}
                        />
                        <Route path="myg/:id/:subgreddiitId/">
                            <Route
                                path="users"
                                element={<SubgreddiitUsers />}
                            />
                            <Route
                                path="requests"
                                element={<SubgreddiitRequests />}
                            />
                            <Route
                                path="stats"
                                element={<SubgreddiitStats />}
                            />
                            <Route
                                path="reports"
                                element={<SubgreddiitReports />}
                            />
                        </Route>
                    </Route>
                    <Route path="saved/:id" element={<SavedPosts />} />
                    <Route path="*" element={<Auth />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
