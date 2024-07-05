import React from 'react'
import './SearchLine.scss'
import { Input, Button } from 'antd'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'

import { useTsSelector, useTsDispatch } from '../../Hooks/storeHooks'
import {
  picturesLoading,
  inputValueChange,
  newPicturesFetched,
  currentPageChange,
  hasMorePictures,
  errorHandler,
  noSearchResults,
  newPicturesRequest,
} from '../../Redux/Pictures/actions'
import { getPictures } from '../../Services/apiRequests'
export default function SearchLine() {
  const dispatch = useTsDispatch()
  const { newPicturesRequested, inputValue } = useTsSelector((state) => state.picturesReducer)
  const picturesFetch = async () => {
    if (inputValue) {
      dispatch(newPicturesRequest())
      dispatch(picturesLoading())
      dispatch(hasMorePictures())
      dispatch(currentPageChange(1))
      try {
        const responce = await getPictures(inputValue, 1)
        if (responce.length === 0) {
          dispatch(noSearchResults())
        } else {
          dispatch(newPicturesFetched(responce))
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatch(errorHandler(error.message))
        } else {
          dispatch(errorHandler('Unknown error'))
        }
      }
    }
  }
  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      dispatch(inputValueChange(''))
    } else if (event.key === 'Enter') {
      if (inputValue) {
        picturesFetch()
      }
    }
  }
  return (
    <div className={`search ${newPicturesRequested ? 'search--resetPosition' : ''}`}>
      <Input
        className="searchInput"
        prefix={<SearchOutlined />}
        placeholder="Телефоны, яблоки, груши..."
        value={inputValue}
        onChange={(event) => {
          dispatch(inputValueChange(event.target.value))
        }}
        onKeyDown={keyDown}
        suffix={
          inputValue ? (
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={() => {
                dispatch(inputValueChange(''))
              }}
            />
          ) : null
        }
      />
      <button
        type="button"
        className="searchButton"
        onClick={() => {
          picturesFetch()
        }}
      >
        Искать
      </button>
    </div>
  )
}
