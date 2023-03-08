import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Loading180Ring } from './assets/loading';
import './App.scss';
import './global.scss';
import { Layout } from './components/layout';
import GlobalState from './context/global/GlobalState';

const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import('./components/pages/About'));
const Companies = lazy(() => import('./components/pages/Companies'));
const Careers = lazy(() => import('./components/pages/Careers'));
const CareerDetail = lazy(() => import('./components/pages/CareerDetail'));
const Contact = lazy(() => import('./components/pages/Contact'));
// const Insights = lazy(() => import('./components/pages/Insights'));
// const InsightDetail = lazy(() => import('./components/pages/InsightDetail'));
const Calendar = lazy(() => import('./components/pages/Calendar'));
const PrivacyPolicy = lazy(() => import('./components/pages/PrivacyPolicy'));

function App() {
    return (
        <Router>
            <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_SITE_KEY} className="z-50">
                <GlobalState>
                    <Suspense
                        fallback={
                            <div className="v-screen h-screen flex justify-center items-center">
                                <Loading180Ring width={48} height={48} />
                            </div>
                        }
                    >
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/company" element={<Companies />} />
                                <Route path="/career" element={<Careers />} />
                                <Route path="/career/:id" element={<CareerDetail />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/contact/:id" element={<Contact />} />
                                {/* <Route path="/insight" element={<Insights />} />
                                <Route path="/insight/:id" element={<InsightDetail />} /> */}
                                <Route path="/:id" element={<Calendar />} />
                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            </Routes>
                        </Layout>
                    </Suspense>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        toastOptions={{
                            duration: 5000,
                            style: {
                                position: 'relative',
                                top: '5rem',
                                right: '.5rem',
                                margin: '5px 0',
                                padding: '.7rem 1.5rem',
                                color: '#333333',
                                fontSize: '16px',
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
                            },
                        }}
                    />
                </GlobalState>
            </GoogleReCaptchaProvider>
        </Router>
    );
}

export default App;
