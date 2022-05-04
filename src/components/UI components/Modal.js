import styled from "styled-components"
import { motion } from "framer-motion";

export default styled(motion.div)`
  display: flex;
  z-index: 300;
  gap: 1em;
  background-color: white;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 1px solid grey; 
  height: auto;
  border-radius: 5px;
  padding: 3%;
`;