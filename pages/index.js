import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

import Layout from 'components/Layout'

import { firebaseConfig, _debounce } from 'utils'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get, child } from 'firebase/database'

import { Input, Button, Container, VStack, HStack, Box, Flex, Tag, Link, Heading } from '@chakra-ui/react'

import { ExternalLinkIcon, ArrowForwardIcon } from '@chakra-ui/icons'

// const links = [
//   {
//     id: 1,
//     title: '從輸入網址列到渲染畫面，過程經歷了什麼事？',
//     url: 'https://w3c.hexschool.com/blog/8d691e4f',
//     tags: ['瀏覽器', '渲染'],
//   },
//   {
//     id: 2,
//     title: '怎麼網頁改完還是錯的？- 一次搞懂 HTTP Cache 機制',
//     url: 'https://medium.com/starbugs/%E6%80%8E%E9%BA%BC%E7%B6%B2%E9%A0%81%E6%94%B9%E5%AE%8C%E9%82%84%E6%98%AF%E9%8C%AF%E7%9A%84-%E4%B8%80%E6%AC%A1%E6%90%9E%E6%87%82-http-cache-%E6%A9%9F%E5%88%B6-a39a421df6c9',
//     tags: ['Cache'],
//   },
// ]
export default function Home({ bookmarks = [] }) {
  const [links, setLinks] = useState(bookmarks)
  const [keyword, setKeyword] = useState('')
  const [timer, setTimer] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  let list = []

  if (links.length) {
    list = links.map(link => {
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
  }

  const searchTag = async function () {
    setIsLoading(true)
    initializeApp(firebaseConfig)
    const dbRef = ref(getDatabase())
    const keywordCollection = await get(child(dbRef, `tags/${keyword}`))
      .then(res => {
        return res.val()
      })
      .catch(error => {
        console.error(error)
      })

    const loginUserId = 'user1'
    const bookmarksIdCollection = []

    if (keywordCollection && keywordCollection.length) {
      keywordCollection.filter(item => {
        const { userId: allUserId, bookmarksId } = item

        if (allUserId === loginUserId) {
          bookmarksIdCollection.push(bookmarksId)
        }
      })
    }

    const result = []
    await get(child(dbRef, `bookmarks/${loginUserId}`))
      .then(res => {
        res.forEach(data => {
          const id = data.val().bookmarksId
          if (bookmarksIdCollection.includes(id)) {
            result.push(data.val())
          }
        })
      })
      .catch(error => {
        console.error(error)
      })

    return result
  }

  const search = async () => {
    const results = await searchTag()
    setIsLoading(false)
    console.log('search results', results)
    setLinks(results)
  }

  const handleChange = e => {
    _debounce(
      () => {
        const value = e.target.value.trim()
        setKeyword(value)
      },
      500,
      timer,
      setTimer
    )()
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Container maxW="container.md" padding={16}>
          <Flex justify={'space-between'}>
            <Box maxW="md" w={'md'}>
              <Input variant="filled" placeholder="標籤" size="lg" onChange={handleChange} />
            </Box>
            <Box>
              <Button colorScheme="teal" size="lg" onClick={search} isLoading={isLoading}>
                搜尋
              </Button>
            </Box>
          </Flex>
        </Container>

        <Container>
          {list && list.length ? (
            <VStack spacing={4} align="stretch">
              {list}
            </VStack>
          ) : (
            <Heading as="h3" size="lg">
              沒有此標籤結果
            </Heading>
          )}
        </Container>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  initializeApp(firebaseConfig)
  const db = getDatabase()

  const loginUserId = 'user1'

  const dbRef = ref(db)

  const bookmarks = await get(child(dbRef, `bookmarks/${loginUserId}`))
    .then(res => {
      return res.val()
    })
    .catch(error => {
      console.error(error)
    })

  return { props: { bookmarks } }
}
