import path from 'path'
import fs  from 'fs'
        // {
        //   'ad':'ad.html',
        //   'sso':'sso.html',
        //   'pay':'pay.html',
        //   'link':'link.html',
        //   'index':'index.html',
        //   'login':'login.html',
        //   'video':'video.html',
        //   'captcha':'captcha.html',
        //   'payment':'payment.html',
        //   'shopcart':'shopcart.html',
        // },
/**
 * 导出Pages下全部目录
 * 一个目录一个输入
 */
export const pages = (list={})=>{
  const distPath = path.resolve(process.cwd(), 'pages');
  const files = fs.readdirSync(distPath, { withFileTypes: false });
  files.forEach(is=>{
    list[is] = `./pages/${is}/index.html`
  })
  return list
}
/**
 * 多页应用编译
 */
export const renameHTML = ()=>{
  return {
    name: 'vite-plugin-rename-html', 
    apply: 'build',
    closeBundle: () => {
      const distPath = path.resolve(process.cwd(), 'dist');
      const pagePath = path.resolve(process.cwd(), 'dist/pages');
      // // 读取输出目录中的所有文件和文件夹
      try {
        const files = fs.readdirSync(pagePath, { withFileTypes: false });
        files.forEach((name) =>{
          const oldPath = path.join(pagePath, `${name}/index.html`);
          const newPath = path.join(distPath, name);
          fs.renameSync(oldPath, newPath);
          console.log(`${name}/index.html => ${name}`);
        });
        // console.log('distPath',distPath,pagePath,files)
        // 移除page
        fs.rmSync(pagePath, { recursive: true,force: true });
        console.log(`================ rmdir pages ================`);
      } catch (error) {
        console.log('pages not found')
      }
    }
  }
}