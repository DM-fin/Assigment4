const authUsers = [
    { username: 'dm', password: 'pass' },
    { username: 'user', password: 'pass' }
]
export const getAuthUser = (username) => {
    return authUsers.find(u => u.username === username)
}