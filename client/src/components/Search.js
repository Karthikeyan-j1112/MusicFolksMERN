import React, { useEffect } from 'react'

export const Search = () => {
  useEffect(() => {
    document.title = "Search - MusicFolks"    
  }, [])

  return (
    <div>Search</div>
  )
}
