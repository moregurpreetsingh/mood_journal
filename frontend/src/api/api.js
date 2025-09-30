const API_BASE = "http://localhost:8080"

export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export const registerUser = async (data) => {
  const res = await fetch(`${API_BASE}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export const logMood = async (userId, data) => {
  const res = await fetch(`${API_BASE}/moods/log/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export const getMoodHistory = async (userId) => {
  const res = await fetch(`${API_BASE}/moods/history/${userId}`)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
