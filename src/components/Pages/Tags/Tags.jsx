import React from 'react';
import { motion } from 'framer-motion';
import Taglist from './Taglist';
import './Tags.css';
import { tagsList } from './tagslist';
import Leftsidebar from '../../Leftsidebar/Leftsidebar';

const Tags = ({ slidein }) => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

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
    <div className="home-container-1">
      <Leftsidebar slidein={slidein} />
      <motion.div
        className="home-container-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="tags-h1" variants={fadeInUp}>
          Tags
        </motion.h1>
        <motion.p className="tags-p" variants={fadeInUp}>
          A tag is a keyword or label that categorizes your question with other similar questions.
        </motion.p>
        <motion.p className="tags-p" variants={fadeInUp}>
          Using the right tags makes it easier for others to find and answer your question.
        </motion.p>
        <motion.div
          className="tags-list-container"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {tagsList.map((tag, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Taglist tag={tag} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Tags;
