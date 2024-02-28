export const onFetch = (route,params)=>{
  let {UKEY} = getConfig()
  UKEY = '8rR/lr0ugwqzUvBWGABJYRhTZnW+bDiS/1ha+mbat19zGuSX2hW8nHPkVxgaE1BguqDNiiCuSiVCvSk6bI21pqcOCJ50Mqd/9nOv9K4tNrjXx5J0HisriHHmv+2o25WQ'
  return new Promise((resolve,reject)=>{
    fetch(`https://api.youloge.com/${route}`,{method:'POST',headers:{'Ukey':UKEY,"Content-Type": "application/json"},body:JSON.stringify(params)}).then(r=>r.json()).then(r=>{
      resolve(r)
    }).catch(e=>{
      reject(e)
    })
  })
}

export const getConfig = (key)=>JSON.parse(sessionStorage.getItem(key) || '[]');
export const setConfig = (key,val=[])=>localStorage.setItem(key,JSON.stringify(val));
export const getStorage = (key)=>JSON.parse(localStorage.getItem(key) || '[]');
export const setStorage = (key,val=[])=>localStorage.setItem(key,JSON.stringify(val));