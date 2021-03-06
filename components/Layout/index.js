import React from 'react'
import styles from './index.module.scss'

import { Button, HStack, Box, Flex, Heading } from '@chakra-ui/react'

import { ArrowForwardIcon } from '@chakra-ui/icons'

const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <Flex justify={'space-between'} padding={5}>
          <Box>
            <Heading as="h3" size="lg">
              TAG BOOKMARK
            </Heading>
          </Box>
          <Box>
            <HStack spacing={10}>
              <Box>
                <Heading as="h5" size="sm">
                  查詢
                </Heading>
              </Box>
              <Box>
                <Heading as="h5" size="sm">
                  新增
                </Heading>
              </Box>
              <Box>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => (window.location.href = '/login')}
                >
                  Login
                </Button>
              </Box>
              <Box>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => (window.location.href = '/register')}
                >
                  Register
                </Button>
              </Box>
            </HStack>
          </Box>
        </Flex>
      </nav>
      <main className={styles.wrapper}>{children}</main>
    </>
  )
}

export default Layout
