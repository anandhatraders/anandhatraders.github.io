export default function guest({ next, store }) {
    if (store.getters.auth.loggedIn) {
        return next({
            name: 'stocks'
        })
    }
    return next()
}