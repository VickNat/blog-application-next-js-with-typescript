const dev = process.env.NODE_ENV !== 'production'

export const server: string = dev ? 'https://localhost:3000' : 'https://yourwebsite.com'