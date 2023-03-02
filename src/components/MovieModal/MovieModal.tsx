import { Dialog } from '@reach/dialog'
import '@reach/dialog/styles.css'
import { motion } from 'framer-motion'

import './MovieModal.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Movie from '../Movie/Movie'

export default function MovieModal() {
  let location = useLocation()
  const navigate = useNavigate()

  return (
    <Dialog
      className='modal'
      aria-labelledby='label'
      onDismiss={() => navigate(-1)}
    >
      <motion.div
        initial={{ x: '1vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Movie typeB={location?.state?.type} />
      </motion.div>
    </Dialog>
  )
}
