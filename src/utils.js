import { useLayoutEffect } from "react"

export const useScrollTo = id => {
  useLayoutEffect(() => {
    if (id) {
      const el = document.getElementById(id)
      const top = window.scrollY + el.getBoundingClientRect().top - 130 // add offset as props
      window.setTimeout(() => {
        window.scrollTo({ top, behavior: "smooth" })
      }, 100) // time too... as props
    }
  }, [id])
}

export const activeStyle = {
  textDecoration: 'line-through',

}

export function randomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
