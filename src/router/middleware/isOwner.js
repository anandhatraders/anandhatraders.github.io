export default function isOwner({ next, store }) {
    if (!store.getters.is_owner) {
        return next({
            name: 'stocks'
        })
    }
    return next()
}