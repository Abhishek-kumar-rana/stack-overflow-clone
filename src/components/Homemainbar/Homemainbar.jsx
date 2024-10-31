import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Questionlist from './Questionlist';
import { fetchallquestion } from '../../action/question';
import Hero from './Hero';
import './Homemainbar.css';

function Homemainbar() {
    const user = useSelector((state) => state.currentuserreducer);
    const location = useLocation();
    const navigate = useNavigate();
    const questionlist = useSelector((state) => state.questionreducer);
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(fetchallquestion());
        
    }, [dispatch]);

    const checkauth = () => {
        if (user === null) {
            alert("Login or signup to ask a question.");
            navigate("/Auth");
        } else {
            navigate('/Askquestion');
        }
    };

    // Animation Variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } },
    };

    const slideUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    // Skeleton Loader for Questions
    const SkeletonLoader = () => (
        <div className="skeleton-container">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="display-question-container">
                    <div className="display-votes-ans">
                        <div className="skeleton skeleton-votes"></div>
                        <div className="skeleton skeleton-votes"></div>
                    </div>
                    <div className="display-question-details">
                        <div className="skeleton skeleton-title"></div>
                        <div className="display-tags-time">
                            <div className="skeleton skeleton-tag"></div>
                            <div className="skeleton skeleton-tag"></div>
                            <div className="skeleton skeleton-time"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="main-container-hero"
        >
            {location.pathname === '/Question' ? '' : <Hero />}
            <motion.div
                className="main-bar"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="main-bar-header" variants={slideUp}>
                    <h1>{location.pathname === '/' ? 'Top Questions' : 'All Questions'}</h1>
                    <motion.button
                        className="ask-btn"
                        onClick={checkauth}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        Ask Questions
                    </motion.button>
                </motion.div>
                <motion.div variants={staggerContainer}>
                    {/* If loading, show skeleton loader */}
                    {questionlist.data ? (
                        
                        <>
                            <motion.p variants={fadeIn}>
                                {questionlist.data?.length} Questions
                            </motion.p>
                            <Questionlist questionlist={questionlist.data} />
                        </>
                    ) : (
                        <>
                        <motion.p variants={fadeIn}>
                                {questionlist.data?.length} Questions
                            </motion.p>
                            <SkeletonLoader />
                        </>
                        
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Homemainbar;
