import React from 'react';
import { motion } from 'framer-motion';
import './Users.css';
import User from './User';
import { useSelector } from 'react-redux';

const Userslist = () => {
  const users = useSelector((state) => state.usersreducer);
  // console.log(users);

  // Animation Variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, // Delay between the animations of each child element
        when: "beforeChildren" // Ensures the container starts animating before the children
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="user-list-container"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {users.map((user) => (
        <motion.div
          key={user?._id}
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <User user={user} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Userslist;
