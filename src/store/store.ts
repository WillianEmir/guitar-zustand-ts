import { create } from "zustand";
import { Guitar, GuitarCar } from "../types";
import { persist } from "zustand/middleware";
import { db } from '../data/data'

type GuitarState = {
  cart: GuitarCar[]
  db: Guitar[]
  addGuitar: (guitar: Guitar) => void
  increaseQuantity: (id: Guitar['id']) => void
  decreaseQuantity: (id: Guitar['id']) => void
  deleteGuitar: (id: Guitar['id']) => void
  vaciarCarrito: () => void
}

export const useGuitarCart = create<GuitarState>()(persist((set, get) => ({
  db,
  cart: [],
  addGuitar: (guitar) => {
    const guitarExist = get().cart.some(item => item.id === guitar.id)

    if(guitarExist) {
      set((state) => ({
        cart: state.cart.map(
          item => item.id === guitar.id ?
            { ...item, quantity: item.quantity + 1 } :
            item
        )
      }))
    } else {
      const newGuitarCar: GuitarCar = { ...guitar, quantity: 1 }
      set((state) => ({
        cart: [...state.cart, newGuitarCar]
      }))
    }
  },
  increaseQuantity: (id) => {
    const newCarrito = get().cart.map(
      item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    set(() => ({
      cart: newCarrito
    }))
  },
  decreaseQuantity: (id) => {
    const newCarrito = get().cart.map(
      item => item.id === id ?
        item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item :
        item
    )
    set(() => ({
      cart: newCarrito
    }))
  },
  deleteGuitar: (id) => {
    const newCart = get().cart.filter(item => item.id !== id)
    set(() => ({
      cart: newCart
    }))
  },
  vaciarCarrito: () => {
    set(() => ({
      cart: []
    }))
  }
}), {
  name: 'cart-storage'
}
))