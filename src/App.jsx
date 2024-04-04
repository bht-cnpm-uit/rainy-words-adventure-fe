import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { useState } from 'react';
import AuthLayout from './layouts/AuthLayout';
import { Fragment } from 'react';

export default function App() {
    const [user, setUser] = useState('user 1');
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = Fragment;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <AuthLayout>
                                        <Layout {...route.props}>
                                            <Page />
                                        </Layout>
                                    </AuthLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>

    );
}
