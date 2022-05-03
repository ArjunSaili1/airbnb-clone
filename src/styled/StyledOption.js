import { motion } from "framer-motion"
import styled from "styled-components"

export default styled(motion.article)`
  height: fit-content;
  width: 35vmax;
  background-color: white;
  position: absolute;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1em;
  align-items: center;
`