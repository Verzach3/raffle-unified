import { ActionIcon, Affix } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import { motion } from 'framer-motion'

function Clients() {
  return (
    <div>
      <Affix position={{ bottom: 20, right: 20 }}>
        <motion.div
        whileHover={{ scale: 1.1, rotate: 360 }}
        >
        <ActionIcon radius={"xl"} variant={"filled"} size={"xl"}>
          <IconPlus />
        </ActionIcon>
        </motion.div>
      </Affix>
    </div>
  )
}

export default Clients
