import React, { useState } from 'react'

import styles from '../../styles/Home.module.css'
import Layout from 'components/Layout'

import {
  Input,
  Button,
  Container,
  Stack,
  VStack,
  HStack,
  Box,
  Flex,
  Center,
  Tag,
  Link,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spacer,
} from '@chakra-ui/react'

import { ExternalLinkIcon, ArrowForwardIcon } from '@chakra-ui/icons'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set } from 'firebase/database'

const links = [
  {
    id: 1,
    title: '從輸入網址列到渲染畫面，過程經歷了什麼事？',
    url: 'https://w3c.hexschool.com/blog/8d691e4f',
    tags: ['瀏覽器', '渲染'],
  },
  {
    id: 2,
    title: '怎麼網頁改完還是錯的？- 一次搞懂 HTTP Cache 機制',
    url: 'https://medium.com/starbugs/%E6%80%8E%E9%BA%BC%E7%B6%B2%E9%A0%81%E6%94%B9%E5%AE%8C%E9%82%84%E6%98%AF%E9%8C%AF%E7%9A%84-%E4%B8%80%E6%AC%A1%E6%90%9E%E6%87%82-http-cache-%E6%A9%9F%E5%88%B6-a39a421df6c9',
    tags: ['Cache'],
  },
]

export default function Edit({ firebaseConfig }) {
  initializeApp(firebaseConfig)
  const [submitData, setSubmitData] = useState({})
  const [timer, setTimer] = useState(null)

  const list = links.map(link => {
    const { id, title, url, tags } = link

    const tagList = tags.map(tag => {
      return (
        <Tag size={'sm'} key={tag} variant="solid" colorScheme="gray">
          {tag}
        </Tag>
      )
    })

    return (
      <Flex key={id} justify={'space-around'}>
        <Box>
          <Link href={url} isExternal>
            {title}
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Box>

        <Box>
          <HStack spacing={4}>{tagList}</HStack>
        </Box>
      </Flex>
    )
  })

  const handleClick = () => {
    const userId = '1'
    const name = 'Karen33'
    const email = 'karen33@mail.com'
    const db = getDatabase()
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
    })
  }

  const _debounce = (func, delay) => {
    return function () {
      const context = this
      const args = arguments
      clearTimeout(timer)
      setTimer(
        setTimeout(function () {
          func.apply(context, args)
        }, delay)
      )
    }
  }

  const handleChange = (e, type) => {
    _debounce(() => {
      const value = e.target.value
      console.log(value)
      const newSubmitData = { ...submitData }
      newSubmitData[type] = value
      setSubmitData(newSubmitData)
    }, 500)()
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Container maxW="container.md" padding={16}>
          <Stack spacing={4}>
            <Box>
              <Input
                variant="filled"
                placeholder="標題"
                size="lg"
                onChange={() => {
                  handleChange('title')
                }}
              />
            </Box>
            <Box>
              <Input
                variant="filled"
                placeholder="Url"
                size="lg"
                onChange={() => {
                  handleChange('url')
                }}
              />
            </Box>
            <Box>
              <Input
                variant="filled"
                placeholder="標籤(逗號分隔)"
                size="lg"
                onChange={() => {
                  handleChange('tags')
                }}
              />
            </Box>
            <Center>
              <Button colorScheme="teal" size="lg" onClick={() => handleClick()}>
                新增
              </Button>
            </Center>
          </Stack>
        </Container>

        <Container>
          <VStack spacing={4} align="stretch">
            {list}
          </VStack>
        </Container>
      </div>
    </Layout>
  )
}
