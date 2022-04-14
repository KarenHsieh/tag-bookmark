import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

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
import { ExternalLinkIcon } from '@chakra-ui/icons'

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
export default function Home() {
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Tag Url</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="container.md" padding={16}>
        <Tabs defaultIndex={1}>
          <TabPanels>
            <TabPanel>
              <Flex justify={'space-around'}>
                <Box>
                  <Input variant="filled" placeholder="標籤" size="lg" />
                </Box>
                <Box>
                  <Button colorScheme="teal" size="lg">
                    搜尋
                  </Button>
                </Box>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Stack spacing={4}>
                <Box>
                  <Input variant="filled" placeholder="標題" size="lg" />
                </Box>
                <Box>
                  <Input variant="filled" placeholder="Url" size="lg" />
                </Box>
                <Box>
                  <Input variant="filled" placeholder="標籤(逗號分隔)" size="lg" />
                </Box>
                <Center>
                  <Button colorScheme="teal" size="lg">
                    新增
                  </Button>
                </Center>
              </Stack>
            </TabPanel>
          </TabPanels>
          <TabList>
            <Tab>搜尋</Tab>
            <Tab>新增</Tab>
          </TabList>
        </Tabs>
      </Container>

      <Container>
        <VStack spacing={4} align="stretch">
          {list}
        </VStack>
      </Container>
    </div>
  )
}