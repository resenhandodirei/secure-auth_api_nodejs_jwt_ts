import db from './db.json';

export function getUser(username: string, password: string) {
    return db.users.find((user) => user.login === username && user.password === password);
}
