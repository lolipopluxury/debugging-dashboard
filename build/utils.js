import os from 'node:os'
import net from 'node:net'

export const getLocalIP = () => {
    const interfaces = os.networkInterfaces()
    for (const devName in interfaces) {
        const iface = interfaces[devName]
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i]
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
}

export const onPortAvaliableCheck = async (port, callback) => {
    const onPortCheck = (port) => {
        return new Promise((resolve) => {
            let server4Check = net.createServer().listen(port)
            server4Check.on('listening', () => {
                server4Check.close()
                resolve(port)
            })
            server4Check.on('error', (error) => {
                if (error.code === 'EADDRINUSE') {
                    resolve(error)
                }
            })
        })
    }
    let result = await onPortCheck(port)
    if (result instanceof Error) {
        console.log(`端口：${port}被占用`)
        port++
        onPortAvaliableCheck(port, callback)
    } else {
        callback(port)
    }
}