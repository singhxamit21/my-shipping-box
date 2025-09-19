const STORAGE_KEY = 'shipping_boxes_v1'

export async function saveBox(box) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      current.unshift({ ...box, createdAt: new Date().toISOString() })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
      resolve({ ok: true })
    }, 300)
  })
}

export async function getBoxes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      resolve(current)
    }, 200)
  })
}
