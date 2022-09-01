import { getUser } from "./users.js";
export const userFilter = (filter = {}) => {
    if (Object.keys(filter).length > 0) {
        if ("name" in filter) {
            const { name } = filter;
            const users = getUser()
            return users.filter(user => user.name === name)
        }
        return []
    }
    return getUser()
}