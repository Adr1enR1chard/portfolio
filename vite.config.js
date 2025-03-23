import { fileURLToPath } from 'node:url';

export default {
    base: "/portfolio/",
    rollupOptions: {
        external: [
            fileURLToPath(
                new URL(
                    '/portfolio/src/main.js',
                    import.meta.url
                )
            )
        ]
    }
}
