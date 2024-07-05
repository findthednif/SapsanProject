import { Image, Card } from 'antd'
import { useEffect, useRef } from 'react'

import { useTsDispatch, useTsSelector } from '../../Hooks/storeHooks'
import './PicturesList.scss'
import { getPictures } from '../../Services/apiRequests'
import {
  currentPageChange,
  errorHandler,
  noMorePictures,
  picturesFetchUpdate,
  picturesLoading,
} from '../../Redux/Pictures/actions'
import type { Result } from '../../Types/apiTypes'
export default function PicturesList() {
  const { data, loading, newPicturesRequested, currentPage, inputValue, hasMore, error, noResults } = useTsSelector(
    (state) => state.picturesReducer
  )
  const dispatch = useTsDispatch()
  const containerRef = useRef(null)
  const inputValueRef = useRef(inputValue)
  useEffect(() => {
    inputValueRef.current = inputValue
  }, [newPicturesRequested])
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore && !error) {
        dispatch(picturesLoading())
        const nextPage = currentPage + 1
        dispatch(currentPageChange(nextPage))
        getPictures(inputValueRef.current, nextPage)
          .then((response) => {
            if (response.length === 0) {
              dispatch(picturesFetchUpdate(response))
              dispatch(noMorePictures())
            }
            dispatch(picturesFetchUpdate(response))
          })
          .catch((error) => {
            dispatch(errorHandler(error.message))
          })
      }
    })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [currentPage, dispatch, inputValue, loading, hasMore, error])
  const picturesList = () => {
    return data.map((picture: Result) => {
      return (
        <Image
          key={picture.id}
          style={{
            width: '200px',
            height: '200px',
          }}
          src={picture.urls.regular}
        />
      )
    })
  }

  const loadingCards = () => {
    return Array.from({ length: 10 }).map((_, index) => (
      <Card key={index} style={{ width: '200px', height: '200px' }} loading />
    ))
  }

  return (
    <>
      <div className="picturesList">
        {loading && currentPage === 1 ? loadingCards() : picturesList()}
        {loading && currentPage !== 1 && loadingCards()}
        {newPicturesRequested !== 0 && !noResults && !error && <span ref={containerRef}></span>}
      </div>
      {error && <div className="errorMessage">An error had occurated. Errors message: {error}</div>}
      {noResults && <div className="noResultsMessage">К сожалению, поиск не дал результатов</div>}
    </>
  )
}
