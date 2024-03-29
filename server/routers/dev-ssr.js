const Router = require('koa-router');
const axios = require('axios');
const fs = require('fs')
// 跟node中的fs类似 区别在于不会把文件写入到磁盘 只写到内存里
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const VueServerRenderer = require('vue-server-renderer');
const path = require('path')

const serverRender = require('./server-render');
const serverConfig = require('../../build/webpack.config.server');

const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs;

let bundle;

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle ')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = 'wait please'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8001/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })
  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)
module.exports = router
