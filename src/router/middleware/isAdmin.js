export default function isAdmin({ next, store }) {
    if (!store.getters.auth.isAdmin) {
        return next({
            name: 'stocks'
        })
    }
    return next()
}