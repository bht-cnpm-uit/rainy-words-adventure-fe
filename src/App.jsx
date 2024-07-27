import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import AuthLayout from './layouts/AuthLayout';
import { Fragment } from 'react';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout === null ? Fragment : route.layout || Fragment;

                        const RouteElement = route.requiresAuth ? (
                            <AuthLayout>
                                {Layout === Fragment ? (
                                    <Page />
                                ) : (
                                    <Layout {...route.props}>
                                        <Page />
                                    </Layout>
                                )}
                            </AuthLayout>
                        ) : (
                            Layout === Fragment ? (
                                <Page />
                            ) : (
                                <Layout {...route.props}>
                                    <Page />
                                </Layout>
                            )
                        );

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={RouteElement}
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
